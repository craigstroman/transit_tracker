import React from 'react';
import { useParams } from 'react-router-dom';
import { BusPredictions } from '../../components/bus/predictions/Predictions';
import { SubwayPredictions } from '../../components/subway/predictions/Predictions';

export const PredictionsContainer: React.FC = () => {
  const { agency, mode, route, stop, predictions, direction, station } = useParams();

  if (
    agency !== undefined &&
    mode === 'bus' &&
    route !== undefined &&
    direction !== undefined &&
    stop !== undefined &&
    predictions !== undefined
  ) {
    return (
      <div>
        <BusPredictions />
      </div>
    );
  } else if (
    agency !== undefined &&
    mode === 'subway' &&
    route !== undefined &&
    station !== undefined &&
    direction !== undefined &&
    predictions !== undefined
  ) {
    return (
      <div>
        <SubwayPredictions />
      </div>
    );
  } else {
    return <div>&nbsp;</div>;
  }
};
