import {
  FETCH_SUBWAY_PREDICTIONS_BEGIN,
  FETCH_SUBWAY_PREDICTIONS_SUCCESS,
  FETCH_SUBWAY_PREDICTIONS_FAILURE,
} from '../../../actions/predictions/subway/prediction-actions';

const predictionsInitialState = {
  predictions: null,
  loading: true,
  error: null,
};

export default function subwayPredictionsReducer(state = predictionsInitialState, action) {
  switch (action.type) {
    case FETCH_SUBWAY_PREDICTIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SUBWAY_PREDICTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        predictions: action.payload.data,
      };
    case FETCH_SUBWAY_PREDICTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
