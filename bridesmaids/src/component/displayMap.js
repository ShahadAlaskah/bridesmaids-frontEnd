//displayMap
import { AspectRatio } from '@chakra-ui/react';
import {
  GoogleMap,
  Marker,
  MarkerF,
  useLoadScript,
} from '@react-google-maps/api';
import React, { useCallback, useRef, useState } from 'react';

const DisplayMap = ({ lat, lng }) => {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAW6sOrKTFfNNoffD-8zHKzAitI1VnsdoA"
  });
  console.log('lat:', lat, 'lng:', lng);
  if (!isLoaded) return <div>Lood...</div>;
  return (
    <AspectRatio maxW="400px" ratio={4 / 3}>
      <GoogleMap
        id="map"
        zoom={10}
        center={{ lat: Number(lat), lng: Number(lng)  }}
        //onClick={onMapClick}
      >
        <Marker position={{ lat: Number(lat), lng: Number(lng) }} />
      </GoogleMap>
    </AspectRatio>
  );
};

export default DisplayMap;
