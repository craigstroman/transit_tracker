import { Router } from 'express';
import { getRoutes, getDirections, getStations, getPredictions } from '../../../../controllers/wmata/subway/index';

const subwayRouter = new Router();
const agency = '/wmata';

subwayRouter.route(`${agency}/mode/1/routes`).get(getRoutes);

subwayRouter.route(`${agency}/mode/1/routes/:route/stations`).get(getStations);

subwayRouter.route(`${agency}/mode/1/routes/:route/stations/:station/direction`).get(getDirections);

subwayRouter.route(`${agency}/mode/1/routes/:route/stations/:station/direction/:direction/predictions`).get(getPredictions);

export default subwayRouter;
