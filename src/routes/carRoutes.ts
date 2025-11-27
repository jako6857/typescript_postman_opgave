import { Router } from 'express';
import { createRecord, getRecords, getRecord, updateRecord, deleteRecord } from '../controllers/carController.js';

const router = Router();

router.get('/', getRecords);     
router.post('/', createRecord);  
router.get('/:id', getRecord);   
router.put("/:id", updateRecord); 
router.delete("/:id", deleteRecord); 

export default router;
