import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import Routes from '../../../components/subway/routes/Routes';
import Stations from '../../../components/subway/stations/Stations';
import Direction from '../../../components/subway/direction/Direction';

const Subway = props => (
  <Row>
    <Col className="col-md-4">
      <Route
        path="/agency/:agency/mode/subway/routes"
        component={Routes}
      />
    </Col>
    <Col className="col-md-4">
      <Route
        path="/agency/:agency/mode/subway/routes/:route/stations"
        component={Stations}
      />
    </Col>
    <Col className="col-md-4">
      <Route
        path="/agency/:agency/mode/subway/routes/:route/stations/:station/direction"
        component={Direction}
      />
    </Col>
  </Row>
);

export default withRouter(Subway);
