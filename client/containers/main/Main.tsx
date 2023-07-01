import React from 'react';
import { Options } from '../options/Options';
import './Main.scss';

const Main: React.FC = (props) => {
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
    </React.Fragment>
  );
};

export default Main;
