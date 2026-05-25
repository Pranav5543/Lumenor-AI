import { Router } from 'express';
import { recommendations } from '../controllers/recommendation.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, recommendations);

export default router;
