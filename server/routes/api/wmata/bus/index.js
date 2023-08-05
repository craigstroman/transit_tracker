import { Router } from 'express';
import {
  getRoutes,
  getDirections,
  getStops,
  getPredictions,
  getRouteCoordinates,
  getBusPositions,
} from '../../../../controllers/wmata/bus/index';

const busRouter = new Router();
const agency = '/wmata';

busRouter.route(`/mode/:mode/agency/${agency}/routes`).get(getRoutes);

busRouter.route(`/mode/:mode/agency/${agency}/routes/:route`).get(getDirections);

busRouter.route(`${agency}/mode/bus/routes/:route/direction/:direction/stops`).get(getStops);

busRouter.route(`${agency}/mode/bus/routes/:route/stops/:stop/predictions`).get(getPredictions);

busRouter.route(`${agency}/mode/bus/routes/:route/direction/:direction/coords`).get(getRouteCoordinates);

busRouter.route(`${agency}/mode/bus/routes/:route/positions`).get(getBusPositions);

export default busRouter;
