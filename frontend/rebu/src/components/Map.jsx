import React from 'react'
import { GoogleMap,  Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '800px'
};

const center = {
  lat: 37.772,
  lng: -122.214
};

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ""
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const position = {
    lat: 37.772,
    lng: -122.214
  }
  
  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Marker
          position={position}
        />
      </GoogleMap>
  ) : <></>
}
