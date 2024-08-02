
'use client'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Constant } from '@/lib/constant'

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBVR6OkfLXHW82kWhxyeqOFnuyWlNzHwLM"
  })

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        minHeight: '100%'
      }}
      center={Constant.location}
      zoom={15}
    // onLoad={onLoad}
    >

      <Marker
        position={Constant.location}
        label={{
          text: "🏡",
        }}
      ></Marker>
    </GoogleMap>
  ) : <></>
}

export default Map
