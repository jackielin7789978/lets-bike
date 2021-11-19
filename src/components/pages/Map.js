import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import GoogleMapReact from 'google-map-react'
import { GOOGLE_API_KEY } from '../../key'
import { ICONS } from '../../assets/Icons'
import mapStyles from '../../constants/mapStyles'
import { RefreshBTN, SettingBTN, PositionBTN } from '../Buttons'
import BikeApi from '../../webAPIs'

const Mark = styled.div`
  width: 30px;
  height: 30px;
  position: relative;
  span {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
`
const MarkIcon = styled(ICONS.Ubike)`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  & path {
    fill: ${({ theme }) => theme.primary};
  }
`
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
      enableHighAccuracy: true
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

  const findNearbyStations = useCallback(() => {
    if (!mapApi && !myPosition) return
    const [lat, lng] = getCenterCoords()
    const nearby = `nearby(${lat}, ${lng}, 1000)`
    ;(async () => {
      let res
      try {
        res = await BikeApi.get('/Station/NearBy', {
          params: {
            $top: 30,
            $spatialFilter: nearby
          }
        })
        setStations(res.data)
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [getCenterCoords, mapApi, myPosition])

  useEffect(() => {
    getUserLocation()
    findNearbyStations()
  }, [findNearbyStations, getUserLocation])

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
        {stations.map((station) => (
          <Mark
            key={station.StationID}
            lat={station.StationPosition.PositionLat}
            lng={station.StationPosition.PositionLon}
          >
            <span>10</span>
            <MarkIcon />
          </Mark>
        ))}
      </GoogleMapReact>
    </div>
  )
}
