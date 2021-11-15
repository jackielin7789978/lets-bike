import React from 'react'
import GoogleMapReact from 'google-map-react'
import { API_KEY } from './key'

const AnyReactComponent = ({ text }) => <div>{text}</div>

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 25.131181704329002,
      lng: 121.52931178349792
    },
    zoom: 15
  }
  const handleApiLoaded = (map, maps) => {
    console.log('yeah')
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '50vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <AnyReactComponent
          lat={25.131181704329002}
          lng={121.52931178349792}
          text='My Home'
        />
      </GoogleMapReact>
    </div>
  )
}
