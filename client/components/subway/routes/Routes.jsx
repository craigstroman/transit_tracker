import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import Select from 'react-select';
import { fetchRoutes } from '../../../actions/routes/route-actions';

class Routes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const { agency } = this.props.match.params;
    const mode = 'subway';

    this.props.dispatch(fetchRoutes(agency, mode));
  }
  componentDidUpdate() {
    if (document.querySelector('.route-container .Select-value') !== null) {
      const routeSelected = document.querySelector('.route-container .Select-value-label').innerHTML;

      localStorage.setItem('route', routeSelected);
    }
  }
  handleChange(selectedOption) {
    this.setState({ selectedOption });

    if (selectedOption) {
      const agency = this.props.match.params.agency;
      const mode = 'subway';
      const route = (selectedOption) ? selectedOption.value : null;

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
    } else {
      const agency = this.props.match.params.agency;
      const mode = 'subway';

      if (agency && mode) {
        this.props.history.push(
          `/agency/${agency}/mode/${mode}/routes`,
          {
            agency,
            mode,
          },
        );
      }
    }
  }
  render() {
    const { error, loading, routes } = this.props;
    const route = this.props.location.state.route;
    let { selectedOption } = this.state;

    if (route) {
      selectedOption = route;
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
      <div className="route-container">
        <Label for="route-select">Select a route:</Label>
        <Select
          name="route-select"
          value={selectedOption}
          onChange={this.handleChange}
          options={routes}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  routes: state.routesReducer.routes,
  loading: state.routesReducer.loading,
  error: state.routesReducer.error,
});


Routes.defaultProps = {
  match: undefined,
  params: undefined,
  location: undefined,
  history: undefined,
  loading: false,
  error: null,
  routes: [],
  dispatch: () => {},
};

Routes.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  routes: PropTypes.array,
  dispatch: PropTypes.func,
};

export default withRouter(connect(mapStateToProps)(Routes));
