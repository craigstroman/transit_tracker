import React from 'react';
import PropTypes from 'prop-types';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBusRoutePositions } from '../../../actions/map/bus/position-actions';

class BusMarkers extends React.Component {
  constructor(props) {
    super(props);

    this.timer = null;
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { agency, route, direction } = match.params;
    const mode = 'bus';

    dispatch(fetchBusRoutePositions(agency, mode, route, direction));

    this.timer = setInterval(() => {
      dispatch(fetchBusRoutePositions(agency, mode, route, direction));
    }, 20000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { busRoutePositions } = this.props;
    if (nextProps.busRoutePositions !== busRoutePositions) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { error, loading, busRoutePositions } = this.props;

    if (error) {
      console.log('error: ', error);
      return null;
    }

    if (loading) {
      console.log('loading: ', loading);
      return null;
    }

    return (
      <div>
        {busRoutePositions && // eslint-disable-line operator-linebreak
          busRoutePositions.map((obj) => {
            const label = `${obj.RouteID} - ${obj.DirectionText} - ${obj.TripHeadsign}`;
            const labelPost = new google.maps.Point(53, 68);
            return (
              <MarkerWithLabel
                key={obj.VehicleID}
                position={{ lat: parseFloat(obj.Lat), lng: parseFloat(obj.Lon) }}
                labelAnchor={labelPost}
                labelStyle={{
                  backgroundColor: '#F2C65A',
                  fontSize: '0.85em',
                  fontColor: '#000',
                  fontWeight: 'bold',
                  height: '25px',
                  textAlign: 'center',
                  width: '110px',
                }}
              >
                <div>{label}</div>
              </MarkerWithLabel>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  busRoutePositions: state.busPositionsReducer.busRoutePositions,
  loading: state.busPositionsReducer.loading,
  error: state.busPositionsReducer.error,
});

BusMarkers.defaultProps = {
  match: null,
  params: null,
  agency: null,
  route: null,
  direction: null,
  dispatch: () => {},
  error: null,
  loading: false,
  busRoutePositions: [],
};

BusMarkers.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  agency: PropTypes.string,
  route: PropTypes.string,
  direction: PropTypes.string,
  dispatch: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool,
  busRoutePositions: PropTypes.array,
};

export default withRouter(connect(mapStateToProps)(BusMarkers));
