import {
  FETCH_BUS_ROUTE_COORDINATES_BEGIN,
  FETCH_BUS_ROUTE_COORDINATES_SUCCESS,
  FETCH_BUS_ROUTE_COORDINATES_FAILURE,
} from '../../../actions/map/bus/coordinate-actions';

const coordinatesInitialState = {
  busRouteCoordinates: null,
  loading: true,
  error: null,
};

export default function busCoordinatesReducer(state = coordinatesInitialState, action) {
  switch (action.type) {
    case FETCH_BUS_ROUTE_COORDINATES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BUS_ROUTE_COORDINATES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        busRouteCoordinates: action.payload.data,
      };
    case FETCH_BUS_ROUTE_COORDINATES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
