import axios from 'axios';
import env from 'node-env-file';
import { titleCase } from '../../../utils/general/index';
import { fixRouteNames } from '../../../utils/wmata/bus';

// Load local environment variables.
if (process.env.NODE_ENV === 'development') {
  env('./.env');
}

const apiKey = process.env.WMATA_KEY;

/**
 * Get's the bus routes.
 *
 * @return {Object} An object that contains the bus routes or a error object.
 */
export function getRoutes(req, res) {
  const url = `https://api.wmata.com/Bus.svc/json/jRoutes?api_key=${apiKey}`;

  axios.get(url)
    .then(resp => {
      const result = resp.data.Routes;
      let resArr = [];

      resArr =  result.map(obj => {
        const name = fixRouteNames(obj.Name);
        const resultObj = {
          value: obj.RouteID,
          label: name
        }

        return resultObj;
      });

      res.send(resArr);
    })
    .catch(error => {
      res.send(error);
    });
}

/**
 * Get's the selected bus routes directions.
 *
 * @param  {String} route The route id.
 * @return {Object}       An object that contains the bus route directions or a error object.
 */
export function getDirections(req, res) {
  const route = req.params.route;
  const url = `https://api.wmata.com/Bus.svc/json/jRouteDetails?api_key=${apiKey}&RouteID=${route}`;

  axios.get(url)
    .then(resp => {
      if ((typeof resp.data.Direction0 === 'object' && typeof resp.data.Direction1 === 'object')
        && (resp.data.Direction0.Stops.length && resp.data.Direction1.Stops.length)) {
        let result = [
          {
            'value': resp.data.Direction0.DirectionText,
            'label': titleCase(`${resp.data.Direction0.DirectionText} - ${resp.data.Direction0.TripHeadsign}`)
          },
          {
            'value': resp.data.Direction1.DirectionText,
            'label': titleCase(`${resp.data.Direction1.DirectionText} - ${resp.data.Direction1.TripHeadsign}`)
          }
        ];

        res.send(result);
      }
      else {
        res.status(204).end();
      }
    })
    .catch(error => {
      res.send(error);
    });
}

/**
 * Get's the selected route bus stops.
 *
 * @param  {String} route The route id.
 * @param  {String} direction The direction for the route.
 * @return {Object}       An object that contains the bus route stops or a error object.
 */
export function getStops(req, res) {
  const route = req.params.route;
  const direction = req.params.direction;
  const url = `https://api.wmata.com/Bus.svc/json/jRouteDetails?api_key=${apiKey}&RouteID=${route}&DirectionText=${direction}`;

  axios.get(url)
    .then(resp => {
      let results = resp.data;
      if (direction === results.Direction0.DirectionText) {
          if ( resp.data.Direction0.Stops.length ) {
            let result = {};

            result = resp.data.Direction0.Stops;

            result = result.map(obj => {
              return {
                label: titleCase(obj.Name),
                value: obj.StopID,
              }
            });

            res.send(result);
          }
        } else if (direction === results.Direction1.DirectionText) {
          if (results.Direction1.Stops.length) {
            let result = {};

            result = resp.data.Direction1.Stops;

            result = result.map(obj => {
              return {
                label: titleCase(obj.Name),
                value: obj.StopID,
              }
            });

            res.send(result);
          }
        }
    })
    .catch(error => {
      res.send(error);
    });
}

/**
 * Get's the selected route bus stops.
 *
 * @param  {String} route The route id.
 * @param  {String} direction The direction for the route.
 * @param  {String} stop The stop id.
 * @return {Object}       An object that contains the bus route predictions for a stop or a error object.
 */
export function getPredictions(req, res) {
  const route = req.params.route;
  const stop = req.params.stop;
  const predictionsUrl = `https://api.wmata.com/NextBusService.svc/json/jPredictions?api_key=${apiKey}&StopID=${stop}`;
  const alertsUrl = `https://api.wmata.com/Incidents.svc/json/BusIncidents?api_key=${apiKey}&Route=${route}`;

    axios.all([
      axios.get(predictionsUrl),
      axios.get(alertsUrl)
    ])
    .then(axios.spread((predictions, alerts) => {
      let result = predictions.data.Predictions;
      let results = [];
      let selectedRoute = [];
      let otherRoutes = [];

      selectedRoute = result.filter(obj => {
        if (obj.RouteID === route) {
          return obj;
        } else {
          return false;
        }
      });

      otherRoutes = result.filter(obj => {
        if (obj.RouteID !== route) {
          return obj;
        } else {
          return false;
        }
      });

      results = {
        selectedRoute,
        otherRoutes,
        alerts: alerts.data.BusIncidents
      };

      res.send(results);
    }))
    .catch(error => {
      res.send(error);
    });
}
