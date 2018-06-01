import { Router } from 'express';
import * as mainController from '../../controllers/main/index';

const router = new Router();

router.route('/').get(mainController.indexPage);

router.route('/agency(/):agency?').get(mainController.indexPage);

router.route('/agency/:agency/mode(/):mode?').get(mainController.indexPage);

router.route('/agency/:agency/mode/:mode/routes').get(mainController.indexPage);

router.route('/agency/:agency/mode/:mode/routes(/):route?/stations').get(mainController.indexPage);

router.route('/agency/:agency/mode/:mode/routes(/):route?/direction').get(mainController.indexPage);

router.route('/agency/:agency/mode/:mode/routes(/):route?/stations(/):station?/direction').get(mainController.indexPage);

router.route('/agency/:agency?/mode/:mode?/routes/:route?/direction/:direction?/stops').get(mainController.indexPage);

router.route('/agency/:agency?/mode/:mode?/routes/:route?/direction/:direction?/stops/:stop?/predictions').get(mainController.indexPage);

router.route('/agency/:agency?/mode/:mode?/routes/:route?/stations/:station/direction/:direction/predictions').get(mainController.indexPage);

export default router;
