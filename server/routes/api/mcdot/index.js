import { Router } from 'express';
import busRouter from './bus/index';

/**
 * MCDOT routes
 */

const router = new Router();

router.route('/mode').get((req, res) => {
  const modes = [
    {value: 'bus', label: 'Bus'}
  ];

  res.json(modes);
});

router.use(busRouter);

export default router;

