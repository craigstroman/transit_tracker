import axios from 'axios';

export const FETCH_STOP_BEGIN = 'FETCH_STOP_BEGIN';

export const FETCH_STOP_SUCCESS = 'FETCH_STOP_SUCCESS';

export const FETCH_STOP_FAILURE = 'FETCH_STOP_FAILURE';

export const fetchStopBegin = () => ({
  type: FETCH_STOP_BEGIN,
});

export const fetchStopSuccess = data => ({
  type: FETCH_STOP_SUCCESS,
  payload: { data },
});

export const fetchStopError = error => ({
  type: FETCH_STOP_FAILURE,
  payload: { error },
});

const nodeEnv = process.env.NODE_ENV;
const apiUrl = (nodeEnv === 'production') ? '/api' : 'http://localhost:3000/api';

export function fetchStops(agency, mode, route, direction) {
  return (dispatch) => {
    dispatch(fetchStopBegin());
    axios.get(`${apiUrl}/${agency}/mode/${mode}/routes/${route}/direction/${direction}/stops`)
      .then((res) => {
        dispatch(fetchStopSuccess(res.data));
        return res.data;
      })
      .catch(err => dispatch(fetchStopError(err)));
  };
}
