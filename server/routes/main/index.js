import { Router } from 'express';
import * as mainController from '../../controllers/main/index';

const router = new Router();

router.route('/').get(mainController.indexPage);
router.route('/mode').get(mainController.indexPage);
//router.route('/mode/:mode*').get(mainController.indexPage);

/**
 * Bus routes.
 */
router.route('/mode/bus/agency/:agency/routes').get(mainController.indexPage);
router.route('/mode/bus/agency/:agency/routes/:route/direction').get(mainController.indexPage);
router.route('/mode/bus/agency/:agency/routes/:route/direction').get(mainController.indexPage);
router
  .route('/mode/bus/agency/:agency/routes/:route/direction/:direction/stops')
  .get(mainController.indexPage);
router
  .route('/mode/bus/agency/:agency/routes/:route/direction/:direction/stops/:stop/predictions')
  .get(mainController.indexPage);
router.route('/map/*').get(mainController.mapPage);

/**
 * Subway routes.
 */
router.route('/agency/:agency/mode/1/routes').get(mainController.indexPage);
router.route('/agency/:agency/mode/1/routes/:route/stations').get(mainController.indexPage);
router
  .route('/agency/:agency/mode/1/routes/:route/stations/:station/direction')
  .get(mainController.indexPage);
router
  .route('/agency/:agency/mode/1/routes/:route/stations/:station/direction/:direction/predictions')
  .get(mainController.indexPage);

export default router;
