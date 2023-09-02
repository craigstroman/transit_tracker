import React from 'react';
import { useParams } from 'react-router-dom';
import { Agency } from '../../components/agency/Agency';
import { Mode } from '../../components/mode/Mode';
import { Routes } from '../../components/routes/Routes';
import { Directions } from '../../components/direction/Directions';
import { Stops } from '../../components/stops/Stops';

export const Options: React.FC = () => {
  const { agency, mode, route, direction } = useParams();
  return (
    <React.Fragment>
      <div className="row_large">
        <div>
          <Mode />
        </div>
        {mode && (
          <div>
            <Agency />
          </div>
        )}
      </div>
      <div className="row_small">
        {mode && agency && (
          <div>
            <Routes />
          </div>
        )}
        {mode && agency && route && (
          <div>
            <Directions />
          </div>
        )}
        {mode && agency && route && direction && (
          <div>
            <Stops />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
