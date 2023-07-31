import React from 'react';
import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { Main } from './main/Main';
import { Agency } from '../components/agency/Agency';
import { Routes } from '../components/routes/Routes';
import { Mode } from '../components/mode/Mode';
import { Stops } from '../components/stops/Stops';
import { PredictionsContainer } from './predictions/Predictions';
import { MapContainer } from './map/Map';
import './App.scss';

const element = document.getElementById('app');
const root = createRoot(element as HTMLDivElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ReactRoutes>
          <Route path="/" element={<Main />}>
            <Route path="/" element={<Mode />} />
            <Route path="/mode/:mode/agency" element={<Agency />} />
            <Route path="/mode/:mode/agency/:agency/routes" element={<Routes />} />
            <Route path="/mode/:mode/agency/:agency/routes/:route" element={<Stops />} />
            <Route
              path="/mode/:mode/agency/:agency/routes/:route/stops/:stop/predictions"
              element={<PredictionsContainer />}
            />
            <Route
              path="/mode/:mode/agency/:agency/routes/:route/stops/:stop/predictions/map"
              element={<MapContainer />}
            />
          </Route>
        </ReactRoutes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
