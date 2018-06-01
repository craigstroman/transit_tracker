import {
  FETCH_STOP_BEGIN,
  FETCH_STOP_SUCCESS,
  FETCH_STOP_FAILURE,
} from '../../actions/stops/stop-actions';

const stopInitialState = {
  stops: null,
  loading: true,
  error: null,
};

export default function stopReducer(state = stopInitialState, action) {
  switch (action.type) {
    case FETCH_STOP_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_STOP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        stops: action.payload.data,
      };
    case FETCH_STOP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
