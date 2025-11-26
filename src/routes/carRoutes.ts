import { Router } from 'express';
import { createRecord, getRecords } from '../controllers/carController.js';

const router = Router();

router.get('/', getRecords);
router.post('/', createRecord);

export default router;
