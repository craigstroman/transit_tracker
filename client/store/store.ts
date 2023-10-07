import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import agencyReducer from '../components/agency/agencySlice';
import modesReducer from '../components/mode/modeSlice';
import busRoutesReducer from '../components/bus/routes/routesSlice';
import busDirectionReducer from '../components/bus/direction/directionsSlice';
import busStopsReducer from '../components/bus/stops/stopsSlice';
import busPredictionsReducer from '../components/bus/predictions/predictionsSlice';
import mapBusReducer from '../components/bus/map/mapSlice';
import busPositionsReducer from '../components/bus/map/markers/busMarkersSlice';
import subwayRoutesReducer from '../components/subway/routes/routesSlice';
import subwayStationsReducer from '../components/subway/stations/stationsSlice';

export const reducer = {
  agencies: agencyReducer,
  modes: modesReducer,
  busRoutes: busRoutesReducer,
  busDirection: busDirectionReducer,
  busStops: busStopsReducer,
  busPredictions: busPredictionsReducer,
  busCoords: mapBusReducer,
  busPositions: busPositionsReducer,
  subwayRoutes: subwayRoutesReducer,
  subwayStations: subwayStationsReducer,
};

export const store = configureStore({
  reducer,
});

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
