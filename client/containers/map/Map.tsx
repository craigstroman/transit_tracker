import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { BusMap } from '../../components/bus/map/Map';

export const MapContainer: React.FC = () => {
  const { agency, mode, route, stop, direction, map } = useParams();

  if (
    agency !== undefined &&
    mode === 'bus' &&
    route !== undefined &&
    direction !== undefined &&
    stop !== undefined &&
    map !== undefined
  ) {
    return (
      <div>
        <BusMap />
      </div>
    );
  } else {
    return <div>&nbsp;</div>;
  }
};
