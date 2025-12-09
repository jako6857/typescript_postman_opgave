import { Router } from 'express';
import { deleteRecord, getRecords, updateRecord } from '../controllers/userController.js';
import { createRecord } from '../controllers/userController.js';

const router = Router();
router.get('/', getRecords);
router.post('/', createRecord);
router.delete('/:id', deleteRecord);
router.put('/:id', updateRecord);



export const userRoutes = router;