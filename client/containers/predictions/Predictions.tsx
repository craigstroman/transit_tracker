import React from 'react';
import { useParams } from 'react-router-dom';
import { BusPredictions } from '../../components/bus/predictions/Predictions';

export const PredictionsContainer: React.FC = () => {
  const { agency, mode, route, stop, predictions } = useParams();

  if (
    agency !== undefined &&
    mode === 'bus' &&
    route !== undefined &&
    stop !== undefined &&
    predictions !== undefined
  ) {
    return (
      <div>
        <BusPredictions />
      </div>
    );
  } else {
    return <div>&nbsp;</div>;
  }
};
