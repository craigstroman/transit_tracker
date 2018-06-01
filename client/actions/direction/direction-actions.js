import axios from 'axios';

export const FETCH_DIRECTION_BEGIN = 'FETCH_DIRECTION_BEGIN';

export const FETCH_DIRECTION_SUCCESS = 'FETCH_DIRECTION_SUCCESS';

export const FETCH_DIRECTION_FAILURE = 'FETCH_DIRECTION_FAILURE';

export const fetchDirectionBegin = () => ({
  type: FETCH_DIRECTION_BEGIN,
});

export const fetchDirectionSuccess = data => ({
  type: FETCH_DIRECTION_SUCCESS,
  payload: { data },
});

export const fetchDirectionError = error => ({
  type: FETCH_DIRECTION_FAILURE,
  payload: { error },
});

const nodeEnv = process.env.NODE_ENV;
const apiUrl = (nodeEnv === 'production') ? '/api' : 'http://localhost:3000/api';

export function fetchDirection(agency, mode, route, station = undefined) {
  let url = null;

  if (mode === 'bus') {
    url = `${apiUrl}/${agency}/mode/${mode}/routes/${route}/direction`;
  } else if (mode === 'subway') {
    url = `${apiUrl}/${agency}/mode/${mode}/routes/${route}/stations/${station}/direction`;
  }

  return (dispatch) => {
    dispatch(fetchDirectionBegin());
    axios.get(url)
      .then((res) => {
        if (res.data.length) {
          dispatch(fetchDirectionSuccess(res.data));
          return res.data;
        }
        dispatch(fetchDirectionError('Route not in service. Please choose another route.'));
        return 0;
      })
      .catch(err => dispatch(fetchDirectionError(err)));
  };
}
