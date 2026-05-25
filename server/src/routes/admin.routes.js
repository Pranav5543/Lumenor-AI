import { Router } from 'express';
import { analytics } from '../controllers/admin.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/analytics', authenticate, authorize('admin'), analytics);

export default router;
