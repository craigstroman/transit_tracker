import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import Select from 'react-select';
import { fetchDirection } from '../../../actions/direction/direction-actions';

class Direction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const { agency, route } = this.props.match.params;
    const mode = '3';

    this.props.dispatch(fetchDirection(agency, mode, route));
  }
  componentDidUpdate() {
    if (document.querySelector('.direction-container .Select-value') !== null) {
      const directionSelected = document.querySelector('.direction-container .Select-value-label').innerHTML;

      localStorage.setItem('direction', directionSelected);
    }
  }
  handleChange(selectedOption) {
    this.setState({ selectedOption });

    if (selectedOption) {
      const { agency, route } = this.props.match.params;
      const mode = '3';
      const direction = (selectedOption) ? selectedOption.value : null;

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
    } else {
      const { agency, route } = this.props.match.params;
      const mode = '3';

      if (agency && mode && route) {
        this.props.history.push(
          `/agency/${agency}/mode/${mode}/routes/${route}/direction`,
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
    const { error, loading, directions } = this.props;
    const direction = this.props.location.state.direction;
    let { selectedOption } = this.state;

    if (direction) {
      selectedOption = direction;
    }

    if (error) {
      return (
        <div className="error">
          <div className="error__text">{ error }</div>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="loading">Loading...</div>
      );
    }

    return (
      <div className="direction-container">
        <Label for="direction-select">Select a direction:</Label>
        <Select
          name="direction-select"
          value={selectedOption}
          onChange={this.handleChange}
          options={directions}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  directions: state.directionReducer.direction,
  loading: state.directionReducer.loading,
  error: state.directionReducer.error,
});


Direction.defaultProps = {
  match: undefined,
  params: undefined,
  location: undefined,
  history: undefined,
  loading: false,
  error: null,
  directions: [],
  dispatch: () => {},
};

Direction.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  directions: PropTypes.array,
  dispatch: PropTypes.func,
};

export default withRouter(connect(mapStateToProps)(Direction));
