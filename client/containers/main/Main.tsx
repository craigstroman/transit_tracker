import React from 'react';
import { useLocation } from 'react-router-dom';
import { Options } from '../options/Options';
import { PredictionsContainer } from '../predictions/Predictions';
import { MapContainer } from '../map/Map';
import './Main.scss';

export const Main: React.FC = () => {
  const location = useLocation();
  const showMap = location.pathname.indexOf('/map') > -1 ? true : false;

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
        <div className="predictions-row">
          <PredictionsContainer />
        </div>
        <div className="map-row">{showMap && <MapContainer />}</div>
      </main>
    </div>
  );
};
