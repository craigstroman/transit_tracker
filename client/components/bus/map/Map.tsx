import React, { useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store/store';
import { getCoordsAsync, selectCoordsState } from './mapSlice';
import { BusMarkers } from './markers/BusMarkers';
import './Map.scss';

export const BusMap: React.FC = () => {
  const dispatch = useAppDispatch();
  const { agency, mode, route, stop, direction, predictions, map } = useParams();
  const coordsState = useAppSelector(selectCoordsState);

  const getCoords = useCallback(async () => {
    if (agency && mode && route && direction && map) {
      await dispatch(getCoordsAsync({ agency, mode, route, direction }));
    }
  }, [agency, mode, route, direction, map]);

  console.log('coordsState: ', coordsState);

  const zoom = 10;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.GOOGLE_MAPS_KEY}`,
  });
  const onMapLoad = useCallback(
    (map: any) => {
      if (
        coordsState.value.length >= 1 &&
        agency &&
        mode &&
        route &&
        stop &&
        direction &&
        predictions &&
        map
      ) {
        const bounds = new google.maps.LatLngBounds();

        coordsState.value.forEach(({ lat, lon }) => {
          bounds.extend({
            lat,
            lng: lon,
          });
        });

        map.fitBounds(bounds);
      }
    },
    [coordsState.value, agency, mode, route, stop, direction, predictions, map],
  );

  useEffect(() => {
    if (agency && mode && route && direction && map) {
      getCoords();
    }
  }, [agency, mode, route, direction, map]);

  if (isLoaded) {
    return (
      <div className="map">
        <GoogleMap mapContainerClassName="map-container" zoom={zoom} onLoad={onMapLoad}>
          <BusMarkers />
        </GoogleMap>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};
