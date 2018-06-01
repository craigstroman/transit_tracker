import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import Routes from '../../../components/bus/routes/Routes';
import Direction from '../../../components/bus/direction/Direction';
import Stops from '../../../components/bus/stops/Stops';

const Bus = props => (
  <Row>
    <Col className="col-md-4">
      <Route
        path="/agency/:agency/mode/bus/routes"
        component={Routes}
      />
    </Col>
    <Col className="col-md-4">
      <Route
        path="/agency/:agency/mode/bus/routes/:route/direction"
        component={Direction}
      />
    </Col>
    <Col className="col-md-4">
      <Route
        path="/agency/:agency/mode/bus/routes/:route/direction/:direction/stops"
        component={Stops}
      />
    </Col>
  </Row>
);

export default withRouter(Bus);
