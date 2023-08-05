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
export async function getRoutes(req, res) {
  console.log('getRoutes: ');
  const url = `https://api.wmata.com/Bus.svc/json/jRoutes?api_key=${apiKey}`;

  try {
    const { data } = await axios.get(url);

    if (data) {
      const { Routes } = data;

      let result = [];

      result = Routes.map((el) => {
        const name = fixRouteNames(el.Name);

        const resultObj = {
          value: el.RouteID,
          label: name,
        };

        return resultObj;
      });

      if (result.length >= 1) {
        res.send(result);
      } else {
        res.send('');
      }
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
 * Get's the selected bus stop predictions.
 *
 * @param  {String} route The route id.
 * @param  {String} direction The direction for the route.
 * @param  {String} stop The stop id.
 * @return {Object}       An object that contains the bus route predictions for a stop or a error object.
 */
export async function getPredictions(req, res) {
  const { params } = req;
  const { route, stop } = params;
  const predictionsUrl = `https://api.wmata.com/NextBusService.svc/json/jPredictions?api_key=${apiKey}&StopID=${stop}`;
  const alertsUrl = `https://api.wmata.com/Incidents.svc/json/BusIncidents?api_key=${apiKey}&Route=${route}`;

  try {
    const predictions = await axios.get(predictionsUrl);
    const alerts = await axios.get(alertsUrl);

    if (predictions.data.Predictions) {
      let selectedRoute = [];
      let otherRoutes = [];
      let results = {};

      selectedRoute = predictions.data.Predictions.filter((el) => {
        if (el.RouteID === route) {
          return el;
        } else {
          return false;
        }
      });

      otherRoutes = predictions.data.Predictions.filter((el) => {
        if (el.RouteID !== route) {
          return el;
        } else {
          return false;
        }
      });

      results = {
        selectedRoute,
        otherRoutes,
        alerts: '',
      };

      if (alerts.data.BusIncidents && alerts.data.BusIncidents.length >= 1) {
        results.alerts = alerts.data.BusIncidents;
      }

      if (results) {
        res.send(results);
      } else {
        res.send('');
      }
    }
  } catch (error) {
    res.send(error);
  }
}

/**
 * Get's the coordinates of the route.
 *
 * @param      {Object}  req     The request
 * @param      {Object}  res     The resource
 */
export async function getRouteCoordinates(req, res) {
  const { params } = req;
  const { route } = params;
  const url = `https://api.wmata.com/Bus.svc/json/jRouteDetails?api_key=${apiKey}&RouteID=${route}`;
  try {
    const coords = await axios.get(url);
    const { data } = coords;
    const { Direction0, Direction1 } = data;
    const result = Direction0.Shape.concat(Direction1.Shape);

    res.send(result);
  } catch (error) {
    console.log('error: ');
    console.log(error);
    res.send(error);
  }
}

/**
 * Get's the bus positions for a route.
 *
 * @param      {Object}  req     The request
 * @param      {Object}  res     The resource
 */
export async function getBusPositions(req, res) {
  const { params } = req;
  const { route } = params;
  const url = `https://api.wmata.com/Bus.svc/json/jBusPositions?api_key=${apiKey}&RouteID=${route}`;

  try {
    const { data } = await axios.get(url);

    if (data) {
      const { BusPositions } = data;

      if (BusPositions && BusPositions.length >= 1) {
        res.send(BusPositions);
      } else {
        res.send('');
      }
    }
  } catch (error) {
    res.send(error);
  }
}

/**
 * Get's the directions for a route.
 *
 * @param      {Object}  req     The request
 * @param      {Object}  res     The resource
 */

export async function getDirections(req, res) {
  const { params } = req;
  const { route } = params;
  const url = `https://api.wmata.com/Bus.svc/json/jRouteDetails?api_key=${apiKey}&RouteID=${route}`;

  try {
    const { data } = await axios.get(url);
    const { Direction0, Direction1 } = data;
    let result = [];

    result = [
      {
        value: Direction0.DirectionText,
        label: titleCase(`${Direction0.DirectionText} - ${Direction0.TripHeadsign}`),
      },
      {
        value: Direction1.DirectionText,
        label: titleCase(`${Direction1.DirectionText} - ${Direction1.TripHeadsign}`),
      },
    ];

    res.send(result);
  } catch (error) {
    console.log('error: ', error);
    res.send(error);
  }
}
