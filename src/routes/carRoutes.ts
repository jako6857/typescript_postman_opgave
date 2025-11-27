import { Router } from 'express';
import { createRecord, getRecords, getRecord } from '../controllers/carController.js';

const router = Router();

router.get('/', getRecords);     // GET all
router.post('/', createRecord);  // CREATE
router.get('/:id', getRecord);   // GET single by id

export default router;
