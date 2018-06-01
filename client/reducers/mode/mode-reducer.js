import {
  FETCH_MODE_BEGIN,
  FETCH_MODE_SUCCESS,
  FETCH_MODE_FAILURE,
} from '../../actions/mode/mode-actions';

const modeInitialState = {
  modes: null,
  loading: true,
  error: null,
};

export default function modeReducer(state = modeInitialState, action) {
  switch (action.type) {
    case FETCH_MODE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_MODE_SUCCESS:
      return {
        ...state,
        loading: false,
        modes: action.payload.data,
      };
    case FETCH_MODE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
