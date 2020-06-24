import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import Select from 'react-select';
import { fetchMode } from '../../actions/mode/mode-actions';
import './Mode.scss';

class Mode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const agency = match.params.agency;

    dispatch(fetchMode(agency));
  }

  componentDidUpdate() {
    if (document.querySelector('.mode-container .Select-value') !== null) {
      const modeSelected = document.querySelector('.mode-container .Select-value-label').innerHTML;

      localStorage.setItem('mode', modeSelected);
    }
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
    const { history, match } = this.props;

    if (selectedOption) {
      const { agency } = match.params;
      const mode = selectedOption ? selectedOption.value : null;

      if (agency && mode) {
        history.push(`/agency/${agency}/mode/${mode}/routes`, {
          agency,
          mode: selectedOption.value,
        });
      }
    } else {
      const agency = this.props.match.params.agency;

      history.push(`/agency/${agency}/mode/`, {
        agency,
      });
    }
  }

  render() {
    const { error, loading, modes } = this.props;
    const mode = this.props.location.state ? this.props.location.state.mode : undefined;
    let { selectedOption } = this.state;

    if (mode) {
      selectedOption = mode;
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
      <div className="mode-container">
        <Label for="mode-select">Select a mode:</Label>
        <Select
          name="mode-select"
          id="mode-select"
          value={selectedOption}
          onChange={this.handleChange}
          options={modes}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  modes: state.modeReducer.modes,
  loading: state.modeReducer.loading,
  error: state.modeReducer.error,
});

Mode.defaultProps = {
  match: {},
  params: {},
  location: {},
  history: {},
  loading: false,
  error: null,
  modes: [],
  dispatch: () => {},
};

Mode.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.object,
  modes: PropTypes.array,
  dispatch: PropTypes.func,
};

export default withRouter(connect(mapStateToProps)(Mode));
