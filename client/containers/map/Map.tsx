import React from 'react';
import { useParams } from 'react-router-dom';
import { Map } from '../../components/map/Map';

export const MapContainer: React.FC = () => {
  const { agency, mode, route, stop } = useParams();
  return (
    <div style={agency && mode && route && stop ? { display: 'block' } : { display: 'none' }}>
      <Map />
    </div>
  );
};
