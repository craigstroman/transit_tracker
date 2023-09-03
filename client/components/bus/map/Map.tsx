import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { GoogleMap, useLoadScript, useJsApiLoader } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';
import { CoordsState } from './mapTypes';
import './Map.scss';

interface IProps {
  coordsState: CoordsState;
}

export const BusMap: React.FC<IProps> = ({ coordsState }) => {
  const { agency, mode, route, stop, direction, predictions, map } = useParams();
  const zoom = 10;

  console.log('process.env: ', process.env);
  console.log('process.env.GOOGLE_MAPS_KEY: ', process.env.GOOGLE_MAPS_KEY);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.GOOGLE_MAPS_KEY}`,
  });

  const onMapLoad = useCallback(
    (map: any) => {
      if (
        coordsState.status === 'success' &&
        agency &&
        mode &&
        route &&
        stop &&
        direction &&
        predictions &&
        map
      ) {
        const bounds = new google.maps.LatLngBounds();

        coordsState.value.shape.forEach(({ lat, lon }) => {
          bounds.extend({
            lat,
            lng: lon,
          });
        });

        map.fitBounds(bounds);
      }
    },
    [coordsState, agency, mode, route, stop, direction, predictions, map],
  );

  if (isLoaded) {
    return (
      <div className="map">
        <GoogleMap mapContainerClassName="map-container" zoom={zoom} onLoad={onMapLoad}></GoogleMap>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};
