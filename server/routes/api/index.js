import { Router } from 'express';
import wmata from './wmata/index';
import mcdot from './mcdot/index';

const router = new Router();

router.route('/agencies').get((req, res) => {
  const result = [
    {
      label: 'WMATA - Washington Metro - Washinton, DC',
      value: 'wmata',
    },
    {
      label: 'MCDOT - Montgomery County Ride On - Bethesda, MD',
      value: 'mcdot',
    }
  ];

  res.send(result);
});

router.use(wmata);
router.use(mcdot);

export default router;
