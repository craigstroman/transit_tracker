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

busRouter.route(`/mode/bus/agency/:agency/routes`).get(getRoutes);

busRouter.route(`/mode/bus/agency/:agency/routes/:route`).get(getDirections);

busRouter.route(`/mode/bus/agency/:agency/routes/:route/stops`).get(getStops);

busRouter.route(`/mode/bus/agency/:agency/routes/:route/stops/:stop/predictions`).get(getPredictions);

busRouter.route(`/mode/bus/agency/:agency/routes/:route/coords`).get(getRouteCoordinates);

busRouter.route(`/mode/bus/agency/:agency/routes/:route/positions`).get(getBusPositions);

export default busRouter;
