import {
  FETCH_STATION_BEGIN,
  FETCH_STATION_SUCCESS,
  FETCH_STATION_FAILURE,
} from '../../actions/stations/station-actions';

const stationsInitialState = {
  stops: null,
  loading: true,
  error: null,
};

export default function stationReducer(state = stationsInitialState, action) {
  switch (action.type) {
    case FETCH_STATION_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_STATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        stations: action.payload.data,
      };
    case FETCH_STATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
