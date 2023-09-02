import React from 'react';
import { useParams } from 'react-router-dom';
import { Predictions } from '../../components/predictions/Predictions';

export const PredictionsContainer: React.FC = () => {
  const { agency, mode, route, stop } = useParams();

  if (agency !== undefined && mode !== undefined && route !== undefined && stop !== undefined) {
    return (
      <div>
        <Predictions />
      </div>
    );
  } else {
    return <div>&nbsp;</div>;
  }
};
