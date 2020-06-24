import axios from 'axios';

export const FETCH_BUS_ROUTE_POSITIONS_BEGIN = 'FETCH_BUS_ROUTE_POSITIONS_BEGIN';

export const FETCH_BUS_ROUTE_POSITIONS_SUCCESS = 'FETCH_BUS_ROUTE_POSITIONS_SUCCESS';

export const FETCH_BUS_ROUTE_POSITIONS_FAILURE = 'FETCH_BUS_ROUTE_POSITIONS_FAILURE';

export const fetchBusRoutePositionsBegin = () => ({
  type: FETCH_BUS_ROUTE_POSITIONS_BEGIN,
});

export const fetchBusRoutePositionsSuccess = (data) => ({
  type: FETCH_BUS_ROUTE_POSITIONS_SUCCESS,
  payload: { data },
});

export const fetchBusRoutePositionsError = (error) => ({
  type: FETCH_BUS_ROUTE_POSITIONS_FAILURE,
  payload: { error },
});

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export function fetchBusRoutePositions(agency, mode, route, direction) {
  const url = `${apiUrl}/${agency}/mode/${mode}/routes/${route}/direction/${direction}/positions`;

  return (dispatch) => {
    dispatch(fetchBusRoutePositionsBegin());
    axios
      .get(url)
      .then((res) => {
        dispatch(fetchBusRoutePositionsSuccess(res.data));
        return res.data;
      })
      .catch((err) => dispatch(fetchBusRoutePositionsError(err)));
  };
}
