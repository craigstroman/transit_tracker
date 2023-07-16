import React from 'react';
import { useParams } from 'react-router-dom';
import { Predictions } from '../../components/predictions/Predictions';

export const PredictionsContainer: React.FC = () => {
  const { agency, mode, route, stop } = useParams();
  return (
    <div style={agency && mode && route && stop ? { display: 'block' } : { display: 'none' }}>
      <Predictions />
    </div>
  );
};
