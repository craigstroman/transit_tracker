import React from 'react';
import { Options } from '../options/Options';
import { Predictions } from '../predictions/Predictions';
import './Main.scss';

export const Main: React.FC = () => {
  return (
    <React.Fragment>
      <header>
        <div className="title">
          <h1>Washington, D.C. Transit Tracker</h1>
          <hr />
        </div>
      </header>
      <div>
        <Options />
      </div>
      <div>
        <Predictions />
      </div>
    </React.Fragment>
  );
};
