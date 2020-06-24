import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import Select from 'react-select';
import { fetchAgency } from '../../actions/agency/agency-actions';
import './Agency.scss';

class Agency extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchAgency());
  }

  handleChange(selectedOption) {
    const { history } = this.props;

    this.setState({ selectedOption });
    if (selectedOption) {
      const agency = selectedOption.value; // eslint-disable-line react/destructuring-assignment

      history.push(`/agency/${agency}`, agency);
    } else {
      history.push('/');
    }
  }

  render() {
    const { error, loading, location, agencies } = this.props; // eslint-disable-line object-curly-newline
    const agency = location.state ? location.state.agency : undefined;
    let { selectedOption } = this.state;

    if (agency) {
      selectedOption = agency;
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
      <div className="agency-container">
        <Label for="agency-select">Select an agency:</Label>
        <Select name="agency-select" value={selectedOption} onChange={this.handleChange} options={agencies} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  agencies: state.agencyReducer.agencies,
  loading: state.agencyReducer.loading,
  error: state.agencyReducer.error,
});

Agency.defaultProps = {
  history: {},
  location: {},
  loading: false,
  error: null,
  agencies: [],
  dispatch: () => {},
};

Agency.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.object,
  agencies: PropTypes.array,
  dispatch: PropTypes.func,
};

export default withRouter(connect(mapStateToProps)(Agency));
