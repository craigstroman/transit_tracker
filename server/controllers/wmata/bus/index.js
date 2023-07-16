import axios from 'axios';
import { titleCase } from '../../../utils/general/index';
import { fixRouteNames } from '../../../utils/wmata/bus';

require('dotenv').config();

const apiKey = process.env.WMATA_KEY;

/**
 * Get's the bus routes.
 *
 * @return {Object} An object that contains the bus routes or a error object.
 */
export function getRoutes(req, res) {
  const url = `https://api.wmata.com/Bus.svc/json/jRoutes?api_key=${apiKey}`;

  axios
    .get(url)
    .then((resp) => {
      const result = resp.data.Routes;
      let resArr = [];

      resArr = result.map((obj) => {
        const name = fixRouteNames(obj.Name);
        const resultObj = {
          value: obj.RouteID,
          label: name,
        };

        return resultObj;
      });

      res.send(resArr);
    })
    .catch((error) => {
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

  axios
    .get(url)
    .then((resp) => {
      if (
        typeof resp.data.Direction0 === 'object' &&
        typeof resp.data.Direction1 === 'object' &&
        resp.data.Direction0.Stops.length &&
        resp.data.Direction1.Stops.length
      ) {
        let result = [
          {
            value: resp.data.Direction0.DirectionText,
            label: titleCase(`${resp.data.Direction0.DirectionText} - ${resp.data.Direction0.TripHeadsign}`),
          },
          {
            value: resp.data.Direction1.DirectionText,
            label: titleCase(`${resp.data.Direction1.DirectionText} - ${resp.data.Direction1.TripHeadsign}`),
          },
        ];

        res.send(result);
      } else {
        res.status(204).end();
      }
    })
    .catch((error) => {
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
export async function getStops(req, res) {
  const { params } = req;
  const { route } = params;
  const url = `https://api.wmata.com/Bus.svc/json/jStops?api_key=${apiKey}&RouteID=${route}`;

  try {
    const { data } = await axios.get(url);

    if (data) {
      const { Stops } = data;
      let foundStops = [];
      let result = [];

      Stops.forEach((element) => {
        const hasRoute = element.Routes.find((el) => {
          if (el === route) {
            return el;
          }
        });

        if (hasRoute) {
          foundStops.push(element);
        }
      });

      if (foundStops && foundStops.length >= 1) {
        foundStops.forEach((element) => {
          if (!result.some((el) => el.label === element.Name)) {
            result.push({
              label: element.Name,
              value: element.StopID,
            });
          }
        });
      }

      res.send(result);
    } else {
      res.send('');
    }
  } catch (error) {
    res.send(error);
  }
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

  axios
    .all([axios.get(predictionsUrl), axios.get(alertsUrl)])
    .then(
      axios.spread((predictions, alerts) => {
        let result = predictions.data.Predictions;
        let results = [];
        let selectedRoute = [];
        let otherRoutes = [];

        selectedRoute = result.filter((obj) => {
          if (obj.RouteID === route) {
            return obj;
          } else {
            return false;
          }
        });

        otherRoutes = result.filter((obj) => {
          if (obj.RouteID !== route) {
            return obj;
          } else {
            return false;
          }
        });

        results = {
          selectedRoute,
          otherRoutes,
          alerts: alerts.data.BusIncidents,
        };

        res.send(results);
      }),
    )
    .catch((error) => {
      res.send(error);
    });
}

/**
 * Get's the coordinates of the route.
 *
 * @param      {Object}  req     The request
 * @param      {Object}  res     The resource
 */
export function getRouteCoordinates(req, res) {
  const route = req.params.route;
  const direction = req.params.direction;
  const url = `https://api.wmata.com/Bus.svc/json/jRouteDetails?api_key=${apiKey}&RouteID=${route}`;

  axios
    .get(url)
    .then((resp) => {
      const result = resp.data;
      let centerCoords = {};
      let resArr = [];

      if (result.Direction0.DirectionText === direction) {
        resArr = result.Direction0.Shape;
      } else if (result.Direction1.DirectionText === direction) {
        resArr = result.Direction1.Shape;
      }

      resArr = resArr.map((el) => {
        let result = {};

        result = {
          lat: el.Lat,
          lng: el.Lon,
        };

        return result;
      });

      centerCoords = resArr[Math.floor((resArr.length - 1) / 2)];

      res.json({
        centerCoords,
        busRouteCoords: resArr,
      });
    })
    .catch((error) => {
      res.send(error);
    });
}

export function getBusPositions(req, res) {
  const route = req.params.route;
  const direction = req.params.direction;
  const url = `https://api.wmata.com/Bus.svc/json/jBusPositions?api_key=${apiKey}&RouteID=${route}`;

  axios
    .get(url)
    .then((resp) => {
      res.send(resp.data.BusPositions);
    })
    .catch((error) => {
      res.send(error);
    });
}
