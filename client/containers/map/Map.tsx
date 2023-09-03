import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { BusMap } from '../../components/bus/map/Map';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { getCoordsAsync, selectCoordsState } from '../../components/bus/map/mapSlice';

export const MapContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const coordsState = useAppSelector(selectCoordsState);
  const { agency, mode, route, stop, direction } = useParams();

  const getCoords = useCallback(async () => {
    if (agency && mode && route && direction) {
      await dispatch(getCoordsAsync({ agency, mode, route, direction }));
    }
  }, [agency, mode, route, direction]);

  useEffect(() => {
    if (agency && mode && route && direction) {
      getCoords();
    }
  }, [agency, mode, route, direction]);

  if (
    agency !== undefined &&
    mode === 'bus' &&
    route !== undefined &&
    direction !== undefined &&
    stop !== undefined &&
    coordsState.status === 'success'
  ) {
    return (
      <div>
        <BusMap coordsState={coordsState} />
      </div>
    );
  } else {
    return <div>&nbsp;</div>;
  }
};
