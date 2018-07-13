import {
  FETCH_BUS_ROUTE_POSITIONS_BEGIN,
  FETCH_BUS_ROUTE_POSITIONS_SUCCESS,
  FETCH_BUS_ROUTE_POSITIONS_FAILURE,
} from '../../../actions/map/bus/position-actions';

const positionsInitialState = {
  busRoutePositions: null,
  loading: true,
  error: null,
};

export default function busPositionsReducer(state = positionsInitialState, action) {
  switch (action.type) {
    case FETCH_BUS_ROUTE_POSITIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BUS_ROUTE_POSITIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        busRoutePositions: action.payload.data,
      };
    case FETCH_BUS_ROUTE_POSITIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
