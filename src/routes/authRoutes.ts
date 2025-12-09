import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { getUserProfile } from '../controllers/authController';
import { authorizeRole } from '../middleware/authorizeRole';

const router = Router();

router.get('/', authenticateToken, authorizeRole('ADMIN', 'USER'), getUserProfile);

export { router as authRoutes };