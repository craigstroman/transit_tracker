import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Agency from '../../components/agency/Agency';
import Mode from '../../components/mode/Mode';
import Bus from './bus/Bus';
import Subway from './subway/Subway';
import './Options.scss';

const Options = props => (
  <div className="options">
    <div className="options__row">
      <div className="options__row--col">
        <Route path="/" component={Agency} />
      </div>
      <div className="options__row--col">
        <Route path="/agency/:agency" component={Mode} />
      </div>
    </div>
    <Bus />
    <Subway />
  </div>
);

export default withRouter(Options);
