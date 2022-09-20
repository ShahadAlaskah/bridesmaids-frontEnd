//displayMap
import { AspectRatio } from '@chakra-ui/react';
import {
  GoogleMap,
  Marker,
  MarkerF,
  useLoadScript,
} from '@react-google-maps/api';
import React, { useCallback, useRef, useState } from 'react';

const displayMap = ({ lat, lng }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  console.log('lat:', lat, 'lng:', lng);
  if (!isLoaded) return <div>Lood...</div>;
  return (
    <AspectRatio maxW="400px" ratio={4 / 3}>
      <GoogleMap
        id="map"
        zoom={10}
        //center={{ lat: 44, lng: -80 }}
        //onClick={onMapClick}
      >
        <Marker position={{ lat: lat, lng: lng }} />
      </GoogleMap>
    </AspectRatio>
  );
};

export default displayMap;
