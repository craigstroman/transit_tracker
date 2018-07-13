import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import configureStore from '../../store/configurestore';
import Options from '../options/Options';
import BusPredictions from '../../components/bus/predictions/Predictions';
import SubwayPredictions from '../../components/subway/predictions/Predictions';
import BusMap from '../../components/bus/map/Map';

const store = configureStore();

const Main = props => (
  <Provider store={store}>
    <BrowserRouter>
      <Container>
        <header>
          <Row>
            <Col className="col-md-12 text-center">
              <h1>Transit Tracker</h1>
              <hr />
            </Col>
          </Row>
        </header>
        <Row>
          <Col className="col-md-12">
            <Options />
          </Col>
        </Row>
        <Row>
          <Col className="col-md-12">
            <Route
              exact
              path="/agency/:agency/mode/bus/routes/:route/direction/:direction/stops/:stop/predictions"
              component={BusPredictions}
            />
            <Route
              exact
              path="/agency/:agency/mode/subway/routes/:route/stations/:station/direction/:direction/predictions"
              component={SubwayPredictions}
            />
          </Col>
        </Row>
        <Row>
          <Col className="col-md-12">
            <Route
              exact
              path="/agency/:agency/mode/bus/routes/:route/direction/:direction/stops/:stop/map"
              component={BusMap}
            />
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  </Provider>
);

export default Main;
