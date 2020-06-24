import axios from 'axios';

export const FETCH_STATION_BEGIN = 'FETCH_STATION_BEGIN';

export const FETCH_STATION_SUCCESS = 'FETCH_STATION_SUCCESS';

export const FETCH_STATION_FAILURE = 'FETCH_STATION_FAILURE';

export const fetchStationBegin = () => ({
  type: FETCH_STATION_BEGIN,
});

export const fetchStationSuccess = (data) => ({
  type: FETCH_STATION_SUCCESS,
  payload: { data },
});

export const fetchStationError = (error) => ({
  type: FETCH_STATION_FAILURE,
  payload: { error },
});

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export function fetchStations(agency, mode, route) {
  return (dispatch) => {
    dispatch(fetchStationBegin());
    axios
      .get(`${apiUrl}/${agency}/mode/${mode}/routes/${route}/stations`)
      .then((res) => {
        dispatch(fetchStationSuccess(res.data));
        return res.data;
      })
      .catch((err) => dispatch(fetchStationError(err)));
  };
}
