import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Agency from '../../components/agency/Agency';
import Mode from '../../components/mode/Mode';
import Bus from './bus/Bus';
import Subway from './subway/Subway';
import './Options.scss';

const Options = props => (
  <Container>
    <Row>
      <Col className="col-sm-6 col-md-6 col-lg-6">
        <Route path="/" component={Agency} />
      </Col>
      <Col className="col-sm-6 col-md-6 col-lg-6">
        <Route path="/agency/:agency" component={Mode} />
      </Col>
    </Row>
    <Bus />
    <Subway />
  </Container>
);

export default withRouter(Options);
