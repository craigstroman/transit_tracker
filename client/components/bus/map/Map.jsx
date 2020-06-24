import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Polyline } from 'react-google-maps';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBusRouteCoordinates } from '../../../actions/map/bus/coordinate-actions';
import BusMarkers from './BusMarkers';

class BusMap extends React.Component {
  constructor(props) {
    super(props);

    this.showPredictions = this.showPredictions.bind(this);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { agency, direction, route } = match.params;
    const mode = 'bus';

    dispatch(fetchBusRouteCoordinates(agency, mode, route, direction));
  }

  showPredictions(params) {
    const { history } = this.props;
    const { agency, direction, route, stop } = params; // eslint-disable-line object-curly-newline
    const mode = 'bus';

    history.push(
      `/agency/${agency}/mode/${mode}/routes/${route}/direction/${direction}/stops/${stop}/predictions`,
      {
        agency,
        mode,
        route,
        direction,
        stop,
      },
    );
  }

  render() {
    const { error, loading, busRouteCoordinates, match } = this.props; // eslint-disable-line object-curly-newline
    const { params } = match;

    if (error) {
      return (
        <div>
          <div>There was an error. Please refresh or try again later.</div>
          <div>{error}</div>
        </div>
      );
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    const BusRouteMap = withGoogleMap((props) => (
      <GoogleMap defaultCenter={busRouteCoordinates.centerCoords} defaultZoom={12}>
        <Polyline
          path={busRouteCoordinates.busRouteCoords}
          geodesic
          options={{
            strokeColor: '#F4CB69',
            strokeOpacity: 1.0,
            strokeWeight: 4,
          }}
        />
        <BusMarkers agency={params.agency} route={params.route} direction={params.direction} />
      </GoogleMap>
    ));

    return (
      <div>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => {
            this.showPredictions(params);
          }}
        >
          Show Predictions
        </button>
        <BusRouteMap
          containerElement={<div style={{ height: '70vh', width: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  busRouteCoordinates: state.busCoordinatesReducer.busRouteCoordinates,
  loading: state.busCoordinatesReducer.loading,
  error: state.busCoordinatesReducer.error,
});

BusMap.defaultProps = {
  history: {},
  match: {},
  params: {},
  loading: false,
  error: null,
  busRouteCoordinates: {},
  dispatch: () => {},
};

BusMap.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  params: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.object,
  busRouteCoordinates: PropTypes.object,
  dispatch: PropTypes.func,
};

export default withRouter(connect(mapStateToProps)(BusMap));
