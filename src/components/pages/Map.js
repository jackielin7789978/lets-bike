import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import GoogleMapReact from 'google-map-react'
import { API_KEY } from '../../key'
import { ICONS } from '../../assets/Icons'
import mapStyles from '../../constants/mapStyles'
import { RefreshBTN, SettingBTN, PositionBTN } from '../Buttons'

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
  center: { lat: 23.5612, lng: 121.12312 },
  zoom: 15
}

export default function Map() {
  const navigate = useNavigate()
  useEffect(() => navigate('/map'), [navigate])

  const [myPosition, setMyPosition] = useState(null)
  const [mapInstance, setMapInstance] = useState(null)
  const [mapApi, setMapApi] = useState(null)
  const [cafes, setCafes] = useState([])

  const apiHasLoaded = (map, maps) => {
    setMapInstance(map)
    setMapApi(maps)
  }

  const getUserLocation = useCallback(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000
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

  const findCafeLocation = useCallback(() => {
    if (mapApi && myPosition) {
      const service = new mapApi.places.PlacesService(mapInstance)
      const coords = {
        lat: mapInstance.center.lat(),
        lng: mapInstance.center.lng()
      }

      const request = {
        location: coords,
        radius: 1000,
        type: ['cafe']
      }

      service.nearbySearch(request, (results, status) => {
        if (status === mapApi.places.PlacesServiceStatus.OK) {
          setCafes(results)
        }
      })
    }
  }, [mapApi, mapInstance, myPosition])

  useEffect(() => {
    findCafeLocation()
    getUserLocation()
  }, [findCafeLocation, getUserLocation])

  const handleRefresh = () => {
    findCafeLocation()
  }

  const handleCenterChange = () => {
    findCafeLocation()
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
        bootstrapURLKeys={{ key: API_KEY, libraries: ['places'] }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
        onChange={handleCenterChange}
        options={{ styles: mapStyles, disableDefaultUI: true }}
      >
        {mapApi && <MyPosition lat={myPosition?.lat} lng={myPosition?.lng} />}
        {cafes.map((cafe) => (
          <Mark
            key={cafe.place_id}
            lat={cafe.geometry.location.lat()}
            lng={cafe.geometry.location.lng()}
          >
            <span>10</span>
            <MarkIcon />
          </Mark>
        ))}
      </GoogleMapReact>
    </div>
  )
}
