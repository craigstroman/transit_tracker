import axios from 'axios';

export const FETCH_BUS_PREDICTIONS_BEGIN = 'FETCH_BUS_PREDICTIONS_BEGIN';

export const FETCH_BUS_PREDICTIONS_SUCCESS = 'FETCH_BUS_PREDICTIONS_SUCCESS';

export const FETCH_BUS_PREDICTIONS_FAILURE = 'FETCH_BUS_PREDICTIONS_FAILURE';

export const fetchBusPredictionsBegin = () => ({
  type: FETCH_BUS_PREDICTIONS_BEGIN,
});

export const fetchBusPredictionsSuccess = data => ({
  type: FETCH_BUS_PREDICTIONS_SUCCESS,
  payload: { data },
});

export const fetchBusPredictionsError = error => ({
  type: FETCH_BUS_PREDICTIONS_FAILURE,
  payload: { error },
});

const nodeEnv = process.env.NODE_ENV;
const apiUrl = (nodeEnv === 'production') ? '/api' : 'http://localhost:3000/api';

export function fetchBusPredictions(agency, mode, route, direction, stop) {
  const url = `${apiUrl}/${agency}/mode/${mode}/routes/${route}/direction/${direction}/stops/${stop}/predictions`;

  return (dispatch) => {
    dispatch(fetchBusPredictionsBegin());
    axios.get(url)
      .then((res) => {
        dispatch(fetchBusPredictionsSuccess(res.data));
        return res.data;
      })
      .catch(err => dispatch(fetchBusPredictionsError(err)));
  };
}
