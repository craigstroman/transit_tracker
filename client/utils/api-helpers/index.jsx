import axios from 'axios';

const domain = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000' : '';

export function getMode(agency = '') {
  return axios.get(`${domain}/api/${agency}/mode`)
        .then(res => res.data )
        .catch(error => ({ message: error }));
}

export function getRoutes(agency = '', mode = '') {
  return axios.get(`${domain}/api/${agency}/mode/${mode}/routes`)
        .then(res => res.data )
        .catch(error => ({ message: error }));
}

export function getDirection(agency = '', mode = '', route = '') {
  return axios.get(`${domain}/api/${agency}/mode/${mode}/routes/${route}/direction`)
        .then(res => res.data )
        .catch(error => ({ message: error }));
}

export function getStops(agency = '', mode = '', route = '', direction = '') {
  direction = direction.toLowerCase();

  return axios.get(`${domain}/api/${agency}/mode/${mode}/routes/${route}/direction/${direction}`)
        .then(res => res.data )
        .catch(error => ({ message: error }));
}

export function getVehicles(agency = '', mode = '', route = '', direction = '', stop = '') {
  return axios.get(`${domain}/api/${agency}/mode/${mode}/routes/${route}/direction/${direction}/stop/${stop}`)
        .then(res => res.data )
        .catch(error => ({ message: error }));
}