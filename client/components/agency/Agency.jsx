import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import Select from 'react-select';
import { fetchAgency } from '../../actions/agency/agency-actions';

class Agency extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(fetchAgency());
  }
  handleChange(selectedOption) {
    this.setState({ selectedOption });
    if (selectedOption) {
      const agency = selectedOption.value;
      this.props.history.push(
        `/agency/${agency}`,
        agency,
      );
    } else {
      this.props.history.push(
        '/',
      );
    }
  }
  render() {
    const { error, loading, agencies } = this.props;
    const agency = (this.props.location.state) ? this.props.location.state.agency : undefined;
    let { selectedOption } = this.state;

    if (agency) {
      selectedOption = agency;
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
      <div className="agency-container">
        <Label for="agency-select">Select an agency:</Label>
        <Select
          name="agency-select"
          value={selectedOption}
          onChange={this.handleChange}
          options={agencies}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  agencies: state.agencyReducer.agencies,
  loading: state.agencyReducer.loading,
  error: state.agencyReducer.error,
});

Agency.defaultProps = {
  history: undefined,
  location: undefined,
  loading: false,
  error: null,
  agencies: [],
  dispatch: () => {},
};

Agency.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  agencies: PropTypes.array,
  dispatch: PropTypes.func,
};

export default withRouter(connect(mapStateToProps)(Agency));
