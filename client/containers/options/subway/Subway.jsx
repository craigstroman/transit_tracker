import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Routes from '../../../components/subway/routes/Routes';
import Stations from '../../../components/subway/stations/Stations';
import Direction from '../../../components/subway/direction/Direction';
import './Subway.scss';

const Subway = props => (
  <div className="options__row">
    <div className="options__row--col-med">
      <Route
        path="/agency/:agency/mode/1/routes"
        component={Routes}
      />
    </div>
    <div className="options__row--col-med">
      <Route
        path="/agency/:agency/mode/1/routes/:route/stations"
        component={Stations}
      />
    </div>
    <div className="options__row--col-med">
      <Route
        path="/agency/:agency/mode/1/routes/:route/stations/:station/direction"
        component={Direction}
      />
    </div>
  </div>
);

export default withRouter(Subway);
