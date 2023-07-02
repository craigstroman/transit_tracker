import React from 'react';
import { useParams } from 'react-router-dom';

export const Predictions: React.FC = () => {
  const { agency, mode, route, direction, stop } = useParams();
  return (
    <div style={agency && mode && route && direction && stop ? { display: 'block' } : { display: 'none' }}>
      Predictions
    </div>
  );
};
