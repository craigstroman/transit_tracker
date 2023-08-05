import React from 'react';
import { Agency } from '../../components/agency/Agency';
import { Mode } from '../../components/mode/Mode';
import { Routes } from '../../components/routes/Routes';
import { Directions } from '../../components/direction/Directions';
import { Stops } from '../../components/stops/Stops';

export const Options: React.FC = () => {
  return (
    <React.Fragment>
      <div className="row_large">
        <div>
          <Mode />
        </div>
        <div>
          <Agency />
        </div>
      </div>
      <div className="row_small">
        <div>
          <Routes />
        </div>
        <div>
          <Directions />
        </div>
        <div>
          <Stops />
        </div>
      </div>
    </React.Fragment>
  );
};
