import axios from 'axios';

export const FETCH_AGENCY_BEGIN = 'FETCH_AGENCY_BEGIN';

export const FETCH_AGENCY_SUCCESS = 'FETCH_AGENCY_SUCCESS';

export const FETCH_AGENCY_FAILURE = 'FETCH_AGENCY_FAILURE';

export const fetchAgencyBegin = () => ({
  type: FETCH_AGENCY_BEGIN,
});

export const fetchAgencySuccess = (data) => ({
  type: FETCH_AGENCY_SUCCESS,
  payload: { data },
});

export const fetchAgencyError = (error) => ({
  type: FETCH_AGENCY_FAILURE,
  payload: { error },
});

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export function fetchAgency() {
  const url = `${apiUrl}/agencies`;

  return (dispatch) => {
    dispatch(fetchAgencyBegin());
    axios
      .get(url)
      .then((res) => {
        if (res.data.length) {
          dispatch(fetchAgencySuccess(res.data));
          return res.data;
        }
        dispatch(fetchAgencyError('Agencies not available.'));
        return 0;
      })
      .catch((err) => dispatch(fetchAgencyError(err)));
  };
}
