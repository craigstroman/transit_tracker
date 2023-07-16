import React from 'react';
import { Options } from '../options/Options';
import { PredictionsContainer } from '../predictions/Predictions';
import './Main.scss';

export const Main: React.FC = () => {
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
      </main>
    </div>
  );
};
