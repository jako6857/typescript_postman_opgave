import { Router } from 'express';
import { login } from '../controllers/loginController.js';

const router = Router();

// Subroutes til /api/auth
router.post('/', login);

export { router as loginRoutes };