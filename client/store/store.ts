import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import agencyReducer from '../components/agency/agencySlice';
import modesReducer from '../components/mode/modeSlice';
import routesBusReducer from '../components/bus/routes/routesSlice';
import directionBusReducer from '../components/bus/direction/directionsSlice';
import stopsBusReducer from '../components/bus/stops/stopsSlice';
import predictionsBusReducer from '../components/bus/predictions/predictionsSlice';
import mapBusReducer from '../components/bus/map/mapSlice';

export const reducer = {
  agencies: agencyReducer,
  modes: modesReducer,
  routesBus: routesBusReducer,
  directionBus: directionBusReducer,
  stopsBus: stopsBusReducer,
  predictionsBus: predictionsBusReducer,
  coordsBus: mapBusReducer,
};

export const store = configureStore({
  reducer,
});

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
