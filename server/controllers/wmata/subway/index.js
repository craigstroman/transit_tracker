import axios from 'axios';

require('dotenv').config();

const apiKey = process.env.WMATA_KEY;

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

export async function getDirections(req, res) {
  const route = req.params.route;
  const station = req.params.station;

  if (route && station) {
    const url = `https://api.wmata.com/StationPrediction.svc/json/GetPrediction/${station}`;
    let directions = [];
    try {
      const { data } = await axios.get(url, {
        headers: {
          api_key: apiKey,
        },
      });

      if (data) {
        const { Trains } = data;

        directions = Trains.map((el) => {
          return {
            label: el.DestinationName,
            value: el.Destination.toLowerCase(),
          };
        });

        directions = directions.reduce((unique, o) => {
          if (!unique.some((obj) => obj.label === o.label)) {
            unique.push(o);
          }
          return unique;
        }, []);

        if (directions.length >= 1) {
          res.send(directions);
        } else {
          res.send('');
        }
      }
    } catch (error) {
      res.send(error);
    }
  }
}

export async function getPredictions(req, res) {
  const route = req.params.route;
  const station = req.params.station;
  const direction = encodeURIComponent(req.params.direction);

  if (route && station && direction) {
    const url = `https://api.wmata.com/StationPrediction.svc/json/GetPrediction/${station}`;
    try {
      const { data } = await axios.get(url, {
        headers: {
          api_key: apiKey,
        },
      });

      if (data) {
        const { Trains } = data;
        let result = [];

        if (Trains.length >= 1) {
          Trains.map((el) => {
            if (el.Destination.toLowerCase() === direction) {
              result.push(el);
            }
          });

          if (result.length >= 1) {
            res.send(result);
          }
        }
      }
    } catch (error) {
      res.send(error);
    }
  }
}
