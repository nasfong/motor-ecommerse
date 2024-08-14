'use client'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Constant } from '@/lib/constant'
import { LoadingSpinner } from './custom/LoadingSpinner';

const Map = ({ options }: { options?: google.maps.MapOptions }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API!
  });

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  const handleMarkerClick = () => {
    // Redirect to Google Maps or a different URL
    window.open(`https://www.google.com/maps?q=${Constant.location.lat},${Constant.location.lng}`, '_blank');
  };

  return (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        minHeight: '100%'
      }}
      center={Constant.location}
      zoom={15}
      options={options}
      onClick={handleMarkerClick} // Handle marker click
    >
      <Marker
        position={Constant.location}
        label={{
          text: "🏡",
        }}
      />
    </GoogleMap>
  );
};

export default Map;
