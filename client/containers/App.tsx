import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { Main } from './main/Main';
import { Agency } from '../components/agency/Agency';
import { Mode } from '../components/mode/Mode';
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
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/" element={<Agency />} />
            <Route path="/agency/:agency" element={<Mode />} />

            <Route element={<Predictions />}>
              <Route path="/agency/:agency/mode/:mode/routes" element={<div>Routes</div>} />
              <Route path="/agency/:agency/mode/:mode/routes/:route" element={<div>Stop</div>} />
              <Route
                path="/agency/:agency/mode/:mode/routes/:route/stops/:stop"
                element={<div>Direction</div>}
              />
              <Route
                path="/agency/:agency/mode/:mode/routes/:route/stops/:stop/direction/:direction"
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
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
