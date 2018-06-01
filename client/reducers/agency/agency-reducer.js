import {
  FETCH_AGENCY_BEGIN,
  FETCH_AGENCY_SUCCESS,
  FETCH_AGENCY_FAILURE,
} from '../../actions/agency/agency-actions';

const agencyInitialState = {
  agencies: null,
  loading: true,
  error: null,
};

export default function agencyReducer(state = agencyInitialState, action) {
  switch (action.type) {
    case FETCH_AGENCY_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_AGENCY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        agencies: action.payload.data,
      };
    case FETCH_AGENCY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
