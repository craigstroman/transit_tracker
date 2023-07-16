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

busRouter.route(`${agency}/mode/bus/routes`).get(getRoutes);

busRouter.route(`${agency}/mode/bus/routes/:route/stops`).get(getStops);

busRouter.route(`${agency}/mode/bus/routes/:route/stops/:stop/predictions`).get(getPredictions);

busRouter.route(`${agency}/mode/bus/routes/:route/coords`).get(getRouteCoordinates);

busRouter.route(`${agency}/mode/bus/routes/:route/positions`).get(getBusPositions);

export default busRouter;
