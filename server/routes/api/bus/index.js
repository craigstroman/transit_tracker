import { Router } from 'express';
import wmata from './wmata/index';

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

router.use(wmata);

export default router;
