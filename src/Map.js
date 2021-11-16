import { useState } from 'react'
import styled from 'styled-components'
import GoogleMapReact from 'google-map-react'
import { API_KEY } from './key'
import { ICONS } from './assets/Icons'

const Mark = styled(ICONS.Mark)`
  & path {
    fill: red;
  }
`
const MyPosition = styled.div`
  color: gold;
  width: 200px;
`

const defaultProps = {
  center: {
    lat: 25.131181704329002,
    lng: 121.52931178349792
  },
  zoom: 15
}

export default function SimpleMap() {
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
        // center.lat() 與 center.lng() 會回傳正中心的經緯度
        lat: mapInstance.center.lat(),
        lng: mapInstance.center.lng()
      })
      findCafeLocation()
    }
  }
  const findCafeLocation = () => {
    if (mapApiLoaded) {
      const service = new mapApi.places.PlacesService(mapInstance)

      const request = {
        location: myPosition,
        radius: 1600,
        type: ['cafe']
      }

      service.nearbySearch(request, (results, status) => {
        if (status === mapApi.places.PlacesServiceStatus.OK) {
          setCafes(results)
          console.log(results)
        }
      })
    }
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY, libraries: ['places'] }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
        onChange={handleCenterChange}
        options={{ mapId: '3c31b113563ccb8c' }}
      >
        <MyPosition lat={myPosition.lat} lng={myPosition.lng}>
          我在這
        </MyPosition>
        {cafes.map((cafe) => (
          <Mark
            key={cafe.place_id}
            lat={cafe.geometry.location.lat()}
            lng={cafe.geometry.location.lng()}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}
