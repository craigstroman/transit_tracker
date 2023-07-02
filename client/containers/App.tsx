import React from 'react';
import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { Main } from './main/Main';
import { Agency } from '../components/agency/Agency';
import { Routes } from '../components/routes/Routes';
import { Mode } from '../components/mode/Mode';
import { Directions } from '../components/direction/Directions';
import { Predictions } from './predictions/Predictions';
import { BusPredictions } from '../components/predictions/Bus/Bus';
import { SubwayPredictions } from '../components/predictions/Subway/Subway';
import { BusMap } from '../components/map/busMap/BusMap';
import { SubwayMap } from '../components/map/subwayMap/SubwayMap';
import './App.scss';

const element = document.getElementById('app');
const root = createRoot(element as HTMLDivElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ReactRoutes>
          <Route path="/" element={<Main />}>
            <Route path="/" element={<Agency />} />
            <Route path="/agency/:agency" element={<Mode />} />
            <Route element={<Predictions />}>
              <Route path="/agency/:agency/mode/:mode/routes" element={<Routes />} />
              <Route path="/agency/:agency/mode/:mode/routes/:route" element={<Directions />} />
              <Route
                path="/agency/:agency/mode/:mode/routes/:route/direction/:direction"
                element={<div>Stops</div>}
              />
              <Route
                path="/agency/:agency/mode/:mode/routes/:route/direction/:direction/stops/:stop"
                element={<div>Predictions</div>}
              />
            </Route>
            <Route element={<div>Map</div>}>
              <Route
                path="/agency/:agency/mode/3/routes/:route/direction/:direction/stops/:stop/map"
                element={<BusMap />}
              />
            </Route>
          </Route>
        </ReactRoutes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
