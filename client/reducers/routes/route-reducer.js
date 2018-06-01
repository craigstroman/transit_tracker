import {
  FETCH_ROUTE_BEGIN,
  FETCH_ROUTE_SUCCESS,
  FETCH_ROUTE_FAILURE,
} from '../../actions/routes/route-actions';

const routeInitialState = {
  routes: null,
  loading: true,
  error: null,
};

export default function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case FETCH_ROUTE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ROUTE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        routes: action.payload.data,
      };
    case FETCH_ROUTE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
