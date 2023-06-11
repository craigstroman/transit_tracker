import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Options from '../options/Options';
import BusPredictions from '../../components/bus/predictions/Predictions';
import SubwayPredictions from '../../components/subway/predictions/Predictions';
import BusMap from '../../components/bus/map/Map';
import './Main.scss';

const Main: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <div className="content">
        <header>
          <div className="title">
            <h1>Washington, D.C. Transit Tracker</h1>
            <hr />
          </div>
        </header>
        <div className="row">
          <Options />
        </div>
        <div className="row">
          <Route
            path="/agency/:agency/mode/3/routes/:route/direction/:direction/stops/:stop/predictions"
            element={BusPredictions}
          />
          <Route
            path="/agency/:agency/mode/1/routes/:route/stations/:station/direction/:direction/predictions"
            element={SubwayPredictions}
          />
        </div>
        <div className="row">
          <Route
            path="/agency/:agency/mode/3/routes/:route/direction/:direction/stops/:stop/map"
            element={BusMap}
          />
        </div>
      </div>
    </Routes>
  </BrowserRouter>
);

export default Main;
