import React from 'react';
import { Agency } from '../../components/agency/Agency';
import { Mode } from '../../components/mode/Mode';
import { Routes } from '../../components/routes/Routes';
import { Stops } from '../../components/stops/Stops';

export const Options: React.FC = () => {
  return (
    <React.Fragment>
      <div className="row_large">
        <div>
          <Agency />
        </div>
        <div>
          <Mode />
        </div>
      </div>
      <div className="row_large">
        <div>
          <Routes />
        </div>
        <div>
          <Stops />
        </div>
      </div>
    </React.Fragment>
  );
};
