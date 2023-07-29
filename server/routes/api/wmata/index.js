import { Router } from 'express';
import busRouter from './bus/index';
import subwayRouter from './subway/index';

const router = new Router();

router.route('/mode/:mode/agency').get((req, res) => {
  const result = [
    {
      label: 'WMATA - Washington Metro - Washinton, DC',
      value: 'wmata',
    },
  ];

  res.send(result);
});

/**
 * WMATA routes
 */
router.use(busRouter);

router.use(subwayRouter);

export default router;
