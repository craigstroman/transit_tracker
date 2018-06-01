import {
  FETCH_BUS_PREDICTIONS_BEGIN,
  FETCH_BUS_PREDICTIONS_SUCCESS,
  FETCH_BUS_PREDICTIONS_FAILURE,
} from '../../../actions/predictions/bus/prediction-actions';

const predictionsInitialState = {
  busPredictions: null,
  loading: true,
  error: null,
};

export default function busPredictionsReducer(state = predictionsInitialState, action) {
  switch (action.type) {
    case FETCH_BUS_PREDICTIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BUS_PREDICTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        busPredictions: action.payload.data,
      };
    case FETCH_BUS_PREDICTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
