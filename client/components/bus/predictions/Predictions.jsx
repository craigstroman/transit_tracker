import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBusPredictions } from '../../../actions/predictions/bus/prediction-actions';
import './Predictions.scss';

class BusPredictions extends React.Component {
  constructor(props) {
    super(props);

    this.loaded = false;
    this.timer = null;
    this.showMap = this.showMap.bind(this);
  }
  componentDidMount() {
    const { agency, direction, route, stop } = this.props.match.params;
    const mode = 'bus';

    this.props.dispatch(fetchBusPredictions(agency, mode, route, direction, stop));

    this.timer = setInterval(() => {
      this.props.dispatch(fetchBusPredictions(agency, mode, route, direction, stop));
    }, 20000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this.loaded = false;
  }
  showMap(params) {
    const { agency, direction, route, stop } = params;
    const mode = 'bus';

    this.props.history.push(
      `/agency/${agency}/mode/${mode}/routes/${route}/direction/${direction}/stops/${stop}/map`,
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
    const { error, loading, busPredictions } = this.props;
    let params = null;
    let route = null;
    let direction = null;
    let stop = null;

    if (busPredictions) {
      this.loaded = true;
      params = this.props.match.params;
      route = localStorage.route;
      direction = localStorage.direction;
      stop = localStorage.stop;
    }

    if (error) {
      clearInterval(this.timer);
      return (
        <div>
          <div>There was an error. Please refresh or try again later.</div>
          <div>{ error }</div>
        </div>
      );
    }

    if (!this.loaded && loading) {
      return (
        <div>Loading...</div>
      );
    }

    let predictionsEl = {};

    if (busPredictions.selectedRoute.length >= 1) {
      predictionsEl = busPredictions.selectedRoute.map((obj, i) => {
        if (((obj.Minutes === 1) || (obj.Minutes === 0)) && i === 0) {
          return (
            <div className="predictions__time" key={obj.VehicleID}>Arriving</div>
          );
        } else if (obj.Minutes > 1) {
          return (
            <div className="predictions__time" key={obj.VehicleID}>{obj.Minutes} minutes</div>
          );
        }
        return '';
      });
    } else {
      predictionsEl = <div className="predictions__no-predictions">Currently no predictions for the selected route.</div>;
    }

    return (
      <div className="predictions">
        <header>
          <h1 className="predictions__title">Predictions</h1>
          <div className="predictions__info">
            Predictions for route {route} to {direction} at {stop}
          </div>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => this.showMap(params)}
          >
            Show Map
          </button>
          <hr />
        </header>
        <section>
          <div className="predictions__selected-route">
            {predictionsEl}
          </div>
          {busPredictions.otherRoutes.length >= 1 &&
            <div className="predictions__other-routes">
              <hr />
              <h4 className="text-center">Also at this stop</h4>
              <hr />
              {busPredictions.otherRoutes.map((obj, i) => {
                if (((obj.Minutes === 1) || (obj.Minutes === 0)) && i === 0) {
                  return (
                    <div className="predictions__other-routes--time" key={obj.VehicleID}>
                      <b>Arriving</b> Route {obj.RouteID}, {obj.DirectionText}
                    </div>
                  );
                } else if (obj.Minutes > 1) {
                  return (
                    <div className="predictions__other-routes--time" key={obj.VehicleID}>
                      <b>{obj.Minutes} min</b> Route {obj.RouteID}, {obj.DirectionText}
                    </div>
                  );
                }
                return '';
              })}
            </div>
          }
          {busPredictions.alerts.length >= 1 &&
            <div className="predictions__alerts">
              <hr />
              <h4 className="text-center">Alerts:</h4>
              <hr />
              {
                busPredictions.alerts.map(obj => <div className="predictions__alerts--item" key={obj.IncidentID}>
                  {obj.Description}
                </div>)
              }
            </div>
          }
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  busPredictions: state.busPredictionsReducer.busPredictions,
  loading: state.busPredictionsReducer.loading,
  error: state.busPredictionsReducer.error,
});


BusPredictions.defaultProps = {
  history: undefined,
  match: undefined,
  params: undefined,
  loading: false,
  error: null,
  busPredictions: {},
  dispatch: () => {},
};

BusPredictions.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  params: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  busPredictions: PropTypes.object,
  dispatch: PropTypes.func,
};

export default withRouter(connect(mapStateToProps)(BusPredictions));
