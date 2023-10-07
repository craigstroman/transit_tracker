import axios from 'axios';
import { removeDuplicates } from '../../../utils/general/index';

require('dotenv').config();

const apiKey = process.env.WMATA_KEY;
const stations = {
  RD: ['A15', 'B11'],
  OR: ['K08', 'D13'],
  BL: ['J03', 'G05'],
  SV: ['N06', 'G05'],
  YL: ['E06', 'C15'],
  GR: ['E10', 'F11'],
};
let directions = [];

export async function getRoutes(req, res) {
  const url = `https://api.wmata.com/Rail.svc/json/jLines?api_key=${apiKey}`;

  try {
    const { data } = await axios.get(url);

    if (data) {
      const { Lines } = data;

      let result = [];

      result = Lines.map((el) => {
        const resultObj = {
          value: el.LineCode,
          label: el.DisplayName,
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

export async function getStations(req, res) {
  const route = req.params.route;
  const url = `https://api.wmata.com/Rail.svc/json/jStations?api_key=${apiKey}&LineCode=${route}`;

  try {
    const { data } = await axios.get(url);

    if (data) {
      const { Stations } = data;

      let result = [];

      result = Stations.map((el) => {
        const resultObj = {
          value: el.Code,
          label: el.Name,
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

export function getDirections(req, res) {
  const direction = req.params.direction;
  const station = req.params.station;

  res.send(directions);
}

export function getPredictions(req, res) {
  const route = req.params.route;
  const station = req.params.station;
  const direction = req.params.direction;

  const predictionsUrl = `https://api.wmata.com/StationPrediction.svc/json/GetPrediction/${station}?api_key=${apiKey}`;
  const alertsUrl = `https://api.wmata.com/Incidents.svc/json/Incidents?api_key=${apiKey}`;

  axios
    .all([axios.get(predictionsUrl), axios.get(alertsUrl)])
    .then(
      axios.spread((predictions, alerts) => {
        let alertsArr = alerts.data.Incidents;
        let predictionsArr = predictions.data.Trains;
        let predictionsResArr = [];
        let alertsResArr = [];
        let resObj = {};

        predictionsResArr = predictionsArr.filter((obj) => {
          if (obj.DestinationCode.charAt(0) === direction.charAt(0)) {
            let id = Math.floor(100000 + Math.random() * 900000);

            obj.VehicleID = id;

            obj.Minutes = obj.Min;

            delete obj.Min;

            return obj;
          }
        });

        alertsArr.forEach((obj) => {
          if (obj.LinesAffected.indexOf(route) > -1) {
            alertsResArr.push(obj);
          }
        });

        resObj = {
          predictions: predictionsResArr,
          alerts: alertsResArr,
        };

        res.send(resObj);
      }),
    )
    .catch((error) => {
      res.send(error);
    });
}
