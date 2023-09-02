import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useParams } from 'react-router-dom';
import { CoordsState } from './mapTypes';
import './Map.scss';

interface IProps {
  coordsState: CoordsState;
}

export const Map: React.FC<IProps> = ({ coordsState }) => {
  const { agency, mode, route, stop, direction, predictions, map } = useParams();

  const loader = new Loader({
    apiKey: 'AIzaSyBBKNTYBf4MgGzWdede9in77hxtRtHG45c',
    version: 'weekly',
    libraries: ['places'],
  });

  const mapOptions = {
    center: {
      lat: coordsState.value.centerCoords.lat,
      lng: coordsState.value.centerCoords.lon,
    },
    zoom: 4,
  };

  console.log('loader: ', loader);

  useEffect(() => {
    if (map) {
      loader.importLibrary('maps').then(({ Map }) => {
        new Map(document.getElementById('map') as HTMLElement, mapOptions);
      });
    }
  }, [map]);

  return <div id="map" />;
};
