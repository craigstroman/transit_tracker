import { Router } from 'express';
import { getRoutes, getDirections, getStations } from '../../../../controllers/wmata/subway/index';

const subwayRouter = new Router();

subwayRouter.route(`/mode/subway/agency/:agency/routes`).get(getRoutes);

subwayRouter.route(`/mode/subway/agency/:agency/routes/:route`).get(getStations);

subwayRouter
  .route(`/mode/subway/agency/:agency/routes/:route/station/:station/directions`)
  .get(getDirections);

export default subwayRouter;
