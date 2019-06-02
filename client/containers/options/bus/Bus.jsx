import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Routes from '../../../components/bus/routes/Routes';
import Direction from '../../../components/bus/direction/Direction';
import Stops from '../../../components/bus/stops/Stops';
import './Bus.scss';

const Bus = props => (
  <div className="options__row">
    <div className="options__row--col-med">
      <Route
        path="/agency/:agency/mode/3/routes"
        component={Routes}
      />
    </div>
    <div className="options__row--col-med">
      <Route
        path="/agency/:agency/mode/3/routes/:route/direction"
        component={Direction}
      />
    </div>
    <div className="options__row--col-med">
      <Route
        path="/agency/:agency/mode/3/routes/:route/direction/:direction/stops"
        component={Stops}
      />
    </div>
  </div>
);

export default withRouter(Bus);
