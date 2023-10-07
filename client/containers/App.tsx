import React from 'react';
import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { Main } from './main/Main';
import { Agency } from '../components/agency/Agency';
import { BusRoutes } from '../components/bus/routes/Routes';
import { Mode } from '../components/mode/Mode';
import { BusStops } from '../components/bus/stops/Stops';
import { BusDirections } from '../components/bus/direction/Directions';
import { SubwayRoutes } from '../components/subway/routes/Routes';
import { SubwayStations } from '../components/subway/stations/Stations';
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
            <Route path="/mode/:mode/agency/:agency/routes" element={<BusRoutes />} />
            <Route path="/mode/:mode/agency/:agency/routes" element={<SubwayRoutes />} />
            <Route path="/mode/:mode/agency/:agency/routes/:route" element={<BusDirections />} />
            <Route path="/mode/:mode/agency/:agency/routes/:route" element={<SubwayStations />} />
            <Route
              path="/mode/:mode/agency/:agency/routes/:route/direction/:direction"
              element={<BusStops />}
            />
            <Route
              path="/mode/:mode/agency/:agency/routes/:route/direction/:direction/stops/:stop/predictions/:predictions"
              element={<PredictionsContainer />}
            />
            <Route
              path="/mode/:mode/agency/:agency/routes/:route/direction/:direction/stops/:stop/map/:map"
              element={<MapContainer />}
            />
          </Route>
        </ReactRoutes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
