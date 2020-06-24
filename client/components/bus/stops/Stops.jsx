import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import Select from 'react-select';
import { fetchStops } from '../../../actions/stops/stop-actions';

class Stops extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { agency, route, direction } = match.params;
    const mode = '3';

    dispatch(fetchStops(agency, mode, route, direction));
  }

  componentDidUpdate() {
    if (document.querySelector('.stop-container .Select-value') !== null) {
      const stopSelected = document.querySelector('.stop-container .Select-value-label').innerHTML;

      localStorage.setItem('stop', stopSelected);
    }
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
    const { match } = this.props;

    if (selectedOption) {
      const { agency, route, direction } = match.params;
      const mode = '3';
      const stop = selectedOption ? selectedOption.value : null;

      if (agency && mode && route && direction && stop) {
        this.props.history.push(
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
    } else {
      const { agency, route, direction } = match.params;
      const mode = '3';

      if (agency && mode && route && direction) {
        this.props.history.push(
          `/agency/${agency}/mode/${mode}/routes/${route}/direction/${direction}/stops`,
          {
            agency,
            mode,
            route,
            direction,
          },
        );
      }
    }
  }

  render() {
    const { error, loading, location, stops } = this.props;
    const { state } = location;
    const { stop } = state;
    let { selectedOption } = this.state;

    if (stop) {
      selectedOption = stop;
    }

    if (error) {
      return (
        <div>
          <div>There was an error.</div>
          <div>{error}</div>
        </div>
      );
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="stop-container">
        <Label for="stop-select">Select a stop:</Label>
        <Select name="stop-select" value={selectedOption} onChange={this.handleChange} options={stops} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stops: state.stopsReducer.stops,
  loading: state.stopsReducer.loading,
  error: state.stopsReducer.error,
});

Stops.defaultProps = {
  match: {},
  params: {},
  location: {},
  history: {},
  loading: false,
  error: null,
  stops: [],
  dispatch: () => {},
};

Stops.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.object,
  stops: PropTypes.array,
  dispatch: PropTypes.func,
};

export default withRouter(connect(mapStateToProps)(Stops));
