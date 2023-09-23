import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Options } from '../options/Options';
import { PredictionsContainer } from '../predictions/Predictions';
import { MapContainer } from '../map/Map';
import './Main.scss';

export const Main: React.FC = () => {
  const { agency, mode, route, stop, direction, predictions, map } = useParams();

  return (
    <div className="content">
      <header>
        <div className="title">
          <h1>Washington, D.C. Transit Tracker</h1>
          <hr />
        </div>
      </header>
      <main>
        <div className="options-row">
          <Options />
        </div>
        {agency && mode && route && direction && stop && predictions && (
          <div className="predictions-row">
            <PredictionsContainer />
          </div>
        )}
        {agency && mode && route && direction && stop && map && (
          <div className="map-row">
            <MapContainer />
          </div>
        )}
      </main>
    </div>
  );
};
