import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import agencyReducer from '../components/agency/agencySlice';
import modesReducer from '../components/mode/modeSlice';
import routesReducer from '../components/routes/routesSlice';
import directionReducer from '../components/direction/directionsSlice';
import stopsReducer from '../components/stops/stopsSlice';
import predictionsReducer from '../components/predictions/predictionsSlice';
import mapReducer from '../components/map/mapSlice';

export const reducer = {
  agencies: agencyReducer,
  modes: modesReducer,
  routes: routesReducer,
  direction: directionReducer,
  stops: stopsReducer,
  predictions: predictionsReducer,
  coords: mapReducer,
};

export const store = configureStore({
  reducer,
});

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
