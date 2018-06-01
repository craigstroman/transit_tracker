import axios from 'axios';

export const FETCH_ROUTE_BEGIN = 'FETCH_ROUTE_BEGIN';

export const FETCH_ROUTE_SUCCESS = 'FETCH_ROUTE_SUCCESS';

export const FETCH_ROUTE_FAILURE = 'FETCH_ROUTE_FAILURE';

export const fetchRouteBegin = () => ({
  type: FETCH_ROUTE_BEGIN,
});

export const fetchRouteSuccess = data => ({
  type: FETCH_ROUTE_SUCCESS,
  payload: { data },
});

export const fetchRouteError = error => ({
  type: FETCH_ROUTE_FAILURE,
  payload: { error },
});

const nodeEnv = process.env.NODE_ENV;
const apiUrl = (nodeEnv === 'production') ? '/api' : 'http://localhost:3000/api';

export function fetchRoutes(agency, mode) {
  return (dispatch) => {
    dispatch(fetchRouteBegin());
    axios.get(`${apiUrl}/${agency}/mode/${mode}/routes`)
      .then((res) => {
        dispatch(fetchRouteSuccess(res.data));
        return res.data;
      })
      .catch(err => dispatch(fetchRouteError(err)));
  };
}
