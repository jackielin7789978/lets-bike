import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import GoogleMapReact from 'google-map-react'
import { GOOGLE_API_KEY } from '../../key'
import mapStyles from '../../constants/mapStyles'
import { RefreshBTN, SettingBTN, PositionBTN } from '../Buttons'
import BikeApi from '../../webAPIs'
import Mark from '../Mark'
import Navbar from '../Navbar'

const MyPosition = styled.div`
  background: ${({ theme }) => theme.secondary};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.light};
  outline: 68px solid ${({ theme }) => theme.grey_transparent};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`

const mapContainerStyles = {
  height: '100vh',
  width: '100%',
  position: 'relative'
}
const defaultProps = {
  center: { lat: 25.055475246316725, lng: 121.52058284437013 },
  zoom: 16
}

export default function Map() {
  const navigate = useNavigate()
  useEffect(() => navigate('/map'), [navigate])

  const [myPosition, setMyPosition] = useState(null)
  const [mapInstance, setMapInstance] = useState(null)
  const [mapApi, setMapApi] = useState(null)
  const [stations, setStations] = useState([])

  const apiHasLoaded = (map, maps) => {
    setMapInstance(map)
    setMapApi(maps)
  }

  const getUserLocation = useCallback(() => {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 5000
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        var crd = pos.coords

        if (mapApi) {
          setMyPosition({
            lat: crd.latitude,
            lng: crd.longitude
          })
          mapInstance.setCenter({
            lat: crd.latitude,
            lng: crd.longitude
          })
        }
      },
      (err) => {
        console.warn('ERROR(' + err.code + '): ' + err.message)
      },
      options
    )
  }, [mapApi, mapInstance])

  const getCenterCoords = useCallback(() => {
    const lat = mapInstance.center.lat()
    const lng = mapInstance.center.lng()
    return [lat, lng]
  }, [mapInstance?.center])

  const stationWithStatus = (stationArr, statusArr) => {
    return stationArr.map((station) => {
      const status = statusArr.filter(
        (status) => status.StationUID === station.StationUID
      )
      return {
        ...station,
        status: status[0]
      }
    })
  }

  const findNearbyStations = useCallback(() => {
    if (!mapApi && !myPosition) return
    const [lat, lng] = getCenterCoords()
    const nearby = `nearby(${lat}, ${lng}, 700)`

    const axiosOptions = {
      params: {
        $top: 10,
        $spatialFilter: nearby
      }
    }

    ;(async () => {
      let resStation
      let resStatus
      try {
        resStation = await BikeApi.get('/Station/NearBy', axiosOptions)
        resStatus = await BikeApi.get('/Availability/NearBy', axiosOptions)
        console.log(stationWithStatus(resStation.data, resStatus.data))
        setStations(() => stationWithStatus(resStation.data, resStatus.data))
      } catch (err) {
        console.log(err)
      }
    })()
  }, [getCenterCoords, mapApi, myPosition])

  useEffect(() => {
    if (!myPosition) return
    findNearbyStations()
  }, [findNearbyStations, myPosition])

  useEffect(() => {
    getUserLocation()
  }, [getUserLocation])

  const handleRefresh = () => {
    findNearbyStations()
  }

  const handleCenterChange = () => {
    findNearbyStations()
  }

  const handleReposition = () => {
    mapInstance.setCenter(myPosition)
  }

  return (
    <div style={mapContainerStyles}>
      <RefreshBTN onClick={handleRefresh} />
      <SettingBTN />
      <PositionBTN onClick={handleReposition} />
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API_KEY, libraries: ['places'] }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
        onChange={handleCenterChange}
        options={{ styles: mapStyles, disableDefaultUI: true }}
      >
        {mapApi && <MyPosition lat={myPosition?.lat} lng={myPosition?.lng} />}
        {stations &&
          stations?.map((station) => (
            <Mark
              key={station.StationID}
              lat={station.StationPosition.PositionLat}
              lng={station.StationPosition.PositionLon}
              station={station}
            />
          ))}
      </GoogleMapReact>
      <Navbar />
    </div>
  )
}
