import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSubwayPredictions } from '../../../actions/predictions/subway/prediction-actions';
import './Predictions.scss';

class SubwayPredictions extends React.Component {
  constructor(props) {
    super(props);

    this.loaded = false;
    this.timer = null;
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { agency, direction, route, station } = match.params;
    const mode = '1';

    dispatch(fetchSubwayPredictions(agency, mode, route, direction, station));

    this.timer = setInterval(() => {
      dispatch(fetchSubwayPredictions(agency, mode, route, direction, station));
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.loaded = false;
    localStorage.clear();
  }

  render() {
    const { error, loading, subwayPredictions } = this.props;
    let route = null;
    let station = null;
    let direction = null;

    if (subwayPredictions) {
      this.loaded = true;

      route = localStorage.route;
      station = localStorage.station;
      direction = localStorage.direction;
    }

    if (error) {
      clearInterval(this.timer);
      return (
        <div>
          <div>There was an error. Please refresh or try again later.</div>
          <div>{error}</div>
        </div>
      );
    }

    if (!this.loaded && loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="predictions">
        <header>
          <h1 className="predictions__title">Predictions</h1>
          <div className="predictions__info">
            Predictions for the {route} line at {station} to {direction}
          </div>
          <hr />
        </header>
        <section>
          {subwayPredictions.predictions && subwayPredictions.predictions.length >= 1 && (
            <div className="predictions__selected-route">
              {subwayPredictions.predictions.map((obj, i) => {
                if (obj.Minutes === 'ARR' && i === 0) {
                  return (
                    <div className="predictions__selected-route--time" key={obj.VehicleID}>
                      Arriving
                    </div>
                  );
                } else if (obj.Minutes === 'BRD' && i === 0) {
                  return (
                    <div className="predictions__selected-route--time" key={obj.VehicleID}>
                      Boarding
                    </div>
                  );
                } else if (obj.Minutes > 1) {
                  return (
                    <div className="predictions__selected-route--time" key={obj.VehicleID}>
                      {obj.Minutes} Minutes
                    </div>
                  );
                }
                return '';
              })}
            </div>
          )}
          {subwayPredictions.alerts.length >= 1 && (
            <div className="predictions__alerts">
              <hr />
              <h4 className="text-center">Alerts:</h4>
              <hr />
              {subwayPredictions.alerts.map((obj) => (
                <div className="predictions__alerts--item" key={obj.IncidentID}>
                  {obj.Description}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  subwayPredictions: state.subwayPredictionsReducer.predictions,
  loading: state.subwayPredictionsReducer.loading,
  error: state.subwayPredictionsReducer.error,
});

SubwayPredictions.defaultProps = {
  match: {},
  params: {},
  loading: false,
  error: null,
  subwayPredictions: {},
  dispatch: () => {},
};

SubwayPredictions.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.object,
  subwayPredictions: PropTypes.object,
  dispatch: PropTypes.func,
};

export default withRouter(connect(mapStateToProps)(SubwayPredictions));
