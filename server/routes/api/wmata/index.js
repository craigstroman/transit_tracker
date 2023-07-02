import { Router } from 'express';
import busRouter from './bus/index';
import subwayRouter from './subway/index';

/**
 * WMATA routes
 */
const router = new Router();
const agency = 'wmata';

router.route(`/${agency}/mode`).get((req, res) => {
  const modes = [
    { value: 'bus', label: 'Bus' },
    { value: 'subway', label: 'Subway' },
  ];

  res.json(modes);
});

router.use(busRouter);

router.use(subwayRouter);

export default router;
