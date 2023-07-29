import { Router } from 'express';
import busRouter from './bus/index';

const router = new Router();

router.route('/mode').get((req, res) => {
  const result = [
    {
      label: 'Bus',
      value: 'bus',
    },
    {
      label: 'Subway',
      value: 'subway',
    },
  ];

  res.send(result);
});

router.use(busRouter);

export default router;
