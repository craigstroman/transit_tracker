import {
  FETCH_DIRECTION_BEGIN,
  FETCH_DIRECTION_SUCCESS,
  FETCH_DIRECTION_FAILURE,
} from '../../actions/direction/direction-actions';

const directionsInitialState = {
  direction: null,
  loading: true,
  error: null,
};

export default function directionReducer(state = directionsInitialState, action) {
  switch (action.type) {
    case FETCH_DIRECTION_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DIRECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        direction: action.payload.data,
      };
    case FETCH_DIRECTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
