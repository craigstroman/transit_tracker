import { Router } from 'express';
import { getRoutes, getDirections, getStops, getPredictions } from '../../../../controllers/wmata/bus/index';

const busRouter = new Router();
const agency = '/wmata';

busRouter.route(`${agency}/mode/bus/routes`).get(getRoutes);

busRouter.route(`${agency}/mode/bus/routes/:route/direction`).get(getDirections);

busRouter.route(`${agency}/mode/bus/routes/:route/direction/:direction/stops`).get(getStops);

busRouter.route(`${agency}/mode/bus/routes/:route/direction/:direction/stops/:stop/predictions`).get(getPredictions);

export default busRouter;
