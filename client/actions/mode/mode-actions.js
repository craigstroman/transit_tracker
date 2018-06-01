import axios from 'axios';

export const FETCH_MODE_BEGIN = 'FETCH_MODE_BEGIN';

export const FETCH_MODE_SUCCESS = 'FETCH_MODE_SUCCESS';

export const FETCH_MODE_FAILURE = 'FETCH_MODE_FAILURE';

export const fetchModeBegin = () => ({
  type: FETCH_MODE_BEGIN,
});

export const fetchModeSuccess = data => ({
  type: FETCH_MODE_SUCCESS,
  payload: { data },
});

export const fetchModeError = error => ({
  type: FETCH_MODE_FAILURE,
  payload: { error },
});

const nodeEnv = process.env.NODE_ENV;
const apiUrl = (nodeEnv === 'production') ? '/api' : 'http://localhost:3000/api';

export function fetchMode(agency) {
  return (dispatch) => {
    dispatch(fetchModeBegin());
    axios.get(`${apiUrl}/${agency}/mode`)
      .then((res) => {
        dispatch(fetchModeSuccess(res.data));
        return res.data;
      })
      .catch(err => dispatch(fetchModeError(err)));
  };
}
