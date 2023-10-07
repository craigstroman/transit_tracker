import React from 'react';
import { useParams } from 'react-router-dom';
import { Agency } from '../../components/agency/Agency';
import { Mode } from '../../components/mode/Mode';
import { BusRoutes } from '../../components/bus/routes/Routes';
import { SubwayRoutes } from '../../components/subway/routes/Routes';
import { BusDirections } from '../../components/bus/direction/Directions';
import { BusStops } from '../../components/bus/stops/Stops';

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
        {mode === 'bus' && agency && (
          <div>
            <BusRoutes />
          </div>
        )}
        {mode === 'bus' && agency && route && (
          <div>
            <BusDirections />
          </div>
        )}
        {mode === 'bus' && agency && route && direction && (
          <div>
            <BusStops />
          </div>
        )}
        {mode === 'subway' && agency && (
          <div>
            <SubwayRoutes />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
