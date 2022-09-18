import { AspectRatio } from '@chakra-ui/react';
import {
  GoogleMap,
  Marker,
  MarkerF,
  useLoadScript,
} from '@react-google-maps/api';
import React, { useCallback, useRef, useState } from 'react';

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [markers, setMarkers] = useState([]);

  const onMapClick = useCallback(e => {
    console.log(e);
    // setMarkers([]);
    setMarkers(current => [
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    ]);
  }, []);
  console.log(markers);
  if (!isLoaded) return <div>Lood...</div>;
  return (
    <AspectRatio maxW="400px" ratio={4 / 3}>
      <GoogleMap
        id="map"
        zoom={10}
        center={{ lat: 44, lng: -80 }}
        onClick={onMapClick}
      >
        {markers.map(marker => (
          <Marker position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
      </GoogleMap>
    </AspectRatio>
  );
};

export default Map;