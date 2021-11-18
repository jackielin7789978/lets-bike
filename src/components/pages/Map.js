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

const defaultProps = {
  center: {
    lat: 25.131181704329002,
    lng: 121.52931178349792
  },
  zoom: 15
}

const mapContainerStyles = {
  height: '100vh',
  width: '100%',
  position: 'relative'
}

export default function Map() {
  const navigate = useNavigate()
  useEffect(() => navigate('/map'), [navigate])

  const [myPosition, setMyPosition] = useState({
    lat: 25.131181704329002,
    lng: 121.52931178349792
  })
  const [mapApiLoaded, setMapApiLoaded] = useState(false)
  const [mapInstance, setMapInstance] = useState(null)
  const [mapApi, setMapApi] = useState(null)
  const [cafes, setCafes] = useState([])

  const apiHasLoaded = (map, maps) => {
    setMapInstance(map)
    setMapApi(maps)
    setMapApiLoaded(true)
  }

  const handleCenterChange = () => {
    if (mapApiLoaded) {
      setMyPosition({
        lat: mapInstance.center.lat(),
        lng: mapInstance.center.lng()
      })
    }
  }

  const findCafeLocation = useCallback(() => {
    if (mapApiLoaded) {
      const service = new mapApi.places.PlacesService(mapInstance)

      const request = {
        location: myPosition,
        radius: 1000,
        type: ['cafe']
      }

      service.nearbySearch(request, (results, status) => {
        if (status === mapApi.places.PlacesServiceStatus.OK) {
          setCafes(results)
        }
      })
    }
  }, [
    mapApi?.places.PlacesService,
    mapApi?.places.PlacesServiceStatus.OK,
    mapApiLoaded,
    mapInstance,
    myPosition
  ])

  useEffect(() => {
    findCafeLocation()
  }, [findCafeLocation])

  return (
    <div style={mapContainerStyles}>
      <RefreshBTN />
      <SettingBTN />
      <PositionBTN />
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY, libraries: ['places'] }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
        onChange={handleCenterChange}
        options={{ styles: mapStyles, disableDefaultUI: true }}
      >
        <MyPosition lat={myPosition.lat} lng={myPosition.lng} />
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
