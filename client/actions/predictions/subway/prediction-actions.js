import axios from 'axios';

export const FETCH_SUBWAY_PREDICTIONS_BEGIN = 'FETCH_SUBWAY_PREDICTIONS_BEGIN';

export const FETCH_SUBWAY_PREDICTIONS_SUCCESS = 'FETCH_SUBWAY_PREDICTIONS_SUCCESS';

export const FETCH_SUBWAY_PREDICTIONS_FAILURE = 'FETCH_SUBWAY_PREDICTIONS_FAILURE';

export const fetchSubwayPredictionsBegin = () => ({
  type: FETCH_SUBWAY_PREDICTIONS_BEGIN,
});

export const fetchSubwayPredictionsSuccess = (data) => ({
  type: FETCH_SUBWAY_PREDICTIONS_SUCCESS,
  payload: { data },
});

export const fetchSubwayPredictionsError = (error) => ({
  type: FETCH_SUBWAY_PREDICTIONS_FAILURE,
  payload: { error },
});

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export function fetchSubwayPredictions(agency, mode, route, direction, stop) {
  const url = `${apiUrl}/${agency}/mode/${mode}/routes/${route}/stations/${stop}/direction/${direction}/predictions`;

  return (dispatch) => {
    dispatch(fetchSubwayPredictionsBegin());
    axios
      .get(url)
      .then((res) => {
        dispatch(fetchSubwayPredictionsSuccess(res.data));
        return res.data;
      })
      .catch((err) => dispatch(fetchSubwayPredictionsError(err)));
  };
}
