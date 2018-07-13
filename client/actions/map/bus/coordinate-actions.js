import axios from 'axios';

export const FETCH_BUS_ROUTE_COORDINATES_BEGIN = 'FETCH_BUS_ROUTE_COORDINATES_BEGIN';

export const FETCH_BUS_ROUTE_COORDINATES_SUCCESS = 'FETCH_BUS_ROUTE_COORDINATES_SUCCESS';

export const FETCH_BUS_ROUTE_COORDINATES_FAILURE = 'FETCH_BUS_ROUTE_COORDINATES_FAILURE';

export const fetchBusRouteCoordinatesBegin = () => ({
  type: FETCH_BUS_ROUTE_COORDINATES_BEGIN,
});

export const fetchBusRouteCoordinatesSuccess = data => ({
  type: FETCH_BUS_ROUTE_COORDINATES_SUCCESS,
  payload: { data },
});

export const fetchBusRouteCoordinatesError = error => ({
  type: FETCH_BUS_ROUTE_COORDINATES_FAILURE,
  payload: { error },
});

const nodeEnv = process.env.NODE_ENV;
const apiUrl = (nodeEnv === 'production') ? '/api' : 'http://localhost:3000/api';

export function fetchBusRouteCoordinates(agency, mode, route, direction) {
  const url = `${apiUrl}/${agency}/mode/${mode}/routes/${route}/direction/${direction}/coords`;

  return (dispatch) => {
    dispatch(fetchBusRouteCoordinatesBegin());
    axios.get(url)
      .then((res) => {
        dispatch(fetchBusRouteCoordinatesSuccess(res.data));
        return res.data;
      })
      .catch(err => dispatch(fetchBusRouteCoordinatesError(err)));
  };
}
