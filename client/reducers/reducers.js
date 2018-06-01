import { combineReducers } from 'redux';
import agencyReducer from './agency/agency-reducer';
import modeReducer from './mode/mode-reducer';
import routesReducer from './routes/route-reducer';
import directionReducer from './direction/direction-reducer';
import stopsReducer from './stops/stop-reducer';
import stationsReducer from './stations/station-reducer';
import busPredictionsReducer from './predictions/bus/predictions-reducer';
import subwayPredictionsReducer from './predictions/subway/predictions-reducer';

const rootReducer = combineReducers({
  agencyReducer,
  modeReducer,
  routesReducer,
  directionReducer,
  stopsReducer,
  stationsReducer,
  busPredictionsReducer,
  subwayPredictionsReducer,
});

export default rootReducer;
