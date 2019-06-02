import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import Select from 'react-select';
import { fetchStations } from '../../../actions/stations/station-actions';

class Stations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const { agency, route } = this.props.match.params;
    const mode = '1';

    this.props.dispatch(fetchStations(agency, mode, route));
  }
  componentDidUpdate() {
    if (document.querySelector('.station-container .Select-value') !== null) {
      const stationSelected = document.querySelector('.station-container .Select-value-label').innerHTML;

      localStorage.setItem('station', stationSelected);
    }
  }
  handleChange(selectedOption) {
    this.setState({ selectedOption });

    if (selectedOption) {
      const { agency, route } = this.props.match.params;
      const mode = '1';
      const station = (selectedOption) ? selectedOption.value : null;

      if (agency && mode && route && station) {
        this.props.history.push(
          `/agency/${agency}/mode/${mode}/routes/${route}/stations/${station}/direction`,
          {
            agency,
            mode,
            route,
            station,
          },
        );
      }
    } else {
      const { agency, route } = this.props.match.params;
      const mode = '1';

      if (agency && mode && route) {
        this.props.history.push(
          `/agency/${agency}/mode/${mode}/routes/${route}/stations`,
          {
            agency,
            mode,
            route,
          },
        );
      }
    }
  }
  render() {
    const { error, loading, stations } = this.props;
    const station = this.props.location.state.station;
    let { selectedOption } = this.state;

    if (station) {
      selectedOption = station;
    }

    if (error) {
      return (
        <div>
          <div>There was an error.</div>
          <div>{ error }</div>
        </div>
      );
    }

    if (loading) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div className="station-container">
        <Label for="station-select">Select a station:</Label>
        <Select
          name="station-select"
          value={selectedOption}
          onChange={this.handleChange}
          options={stations}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stations: state.stationsReducer.stations,
  loading: state.stationsReducer.loading,
  error: state.stationsReducer.error,
});


Stations.defaultProps = {
  match: undefined,
  params: undefined,
  location: undefined,
  history: undefined,
  loading: false,
  error: null,
  stations: [],
  dispatch: () => {},
};

Stations.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  stations: PropTypes.array,
  dispatch: PropTypes.func,
};

export default withRouter(connect(mapStateToProps)(Stations));
