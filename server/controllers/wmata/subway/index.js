import axios from 'axios';
import env from 'node-env-file';
import { removeDuplicates } from '../../../utils/general/index';

// Load local environment variables.
if (process.env.NODE_ENV === 'development') {
  env('./.env');
}

const apiKey = process.env.WMATA_KEY;

export function getRoutes(req, res) {
  const url = `https://api.wmata.com/Rail.svc/json/jLines?api_key=${apiKey}`;

  axios.get(url)
    .then(resp => {
      let result = resp.data.Lines;
      let resArr = [];

      resArr = result.map(obj => {
        return {
          label: obj.DisplayName,
          value: obj.LineCode
        }
      });

      res.send(resArr);
    })
    .catch(error => {
      res.send(error);
    });
}

export function getStations(req, res) {
  const route = req.params.route;
  const url = `https://api.wmata.com/Rail.svc/json/jStations?api_key=${apiKey}&LineCode=${route}`;

  axios.get(url)
    .then(resp => {
      let result = resp.data.Stations;
      let resArr = [];

      resArr = result.map(obj => {
        return {
          label: obj.Name,
          value: obj.Code
        }
      });

      res.send(resArr);
    })
    .catch(error => {
      res.send(error);
    });
}

export function getDirections(req, res) {
  const direction = req.params.direction;
  const station = req.params.station;
  const url = `https://api.wmata.com/StationPrediction.svc/json/GetPrediction/${station}?api_key=${apiKey}`;

  axios.get(url)
    .then(resp => {
      let result = resp.data.Trains;
      let resArr = [];

      resArr = result.map(obj => {
        return {
          value: obj.DestinationCode,
          label: obj.DestinationName
        };
      });

      resArr = removeDuplicates(resArr, 'value');

      res.send(resArr);
    })
    .catch(error => {
      res.send(error);
    });
}

export function getPredictions(req, res) {
  const route = req.params.route;
  const station = req.params.station;
  const direction = req.params.direction;

  const predictionsUrl = `https://api.wmata.com/StationPrediction.svc/json/GetPrediction/${station}?api_key=${apiKey}`;
  const alertsUrl = `https://api.wmata.com/Incidents.svc/json/Incidents?api_key=${apiKey}`

  axios.all([
    axios.get(predictionsUrl),
    axios.get(alertsUrl)
  ])
    .then(axios.spread((predictions, alerts) => {
      let alertsArr = alerts.data.Incidents;
      let predictionsArr = predictions.data.Trains;
      let predictionsResArr = [];
      let alertsResArr = [];
      let resObj = {};

      predictionsResArr = predictionsArr.filter(obj => {
        if (obj.DestinationCode === direction) {
          let id =  Math.floor(100000 + Math.random() * 900000);

          obj.VehicleID = id;

          obj.Minutes = obj.Min;

          delete obj.Min;

          return obj;
        }
      });
      console.log('alertsArr: ');
      console.log(Array.isArray(alertsArr));

      alertsArr.forEach((obj) => {
        if (obj.LinesAffected.indexOf(route) > -1) {
          alertsResArr.push(obj);
        }
      });

      resObj = {
        predictions: predictionsResArr,
        alerts: alertsResArr
      };

      res.send(resObj);
    }))
    .catch(error => {
      res.send(error);
    });
}
