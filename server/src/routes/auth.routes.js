import { Router } from 'express';
import { body } from 'express-validator';
import { forgotPassword, login, logoutAll, me, refreshSession, register, resetPassword, verifyEmail } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.post('/register', [
  body('name').trim().isLength({ min: 2 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 })
], validate, register);
router.post('/login', [body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 8 })], validate, login);
router.get('/me', authenticate, me);
router.post('/refresh', refreshSession);
router.get('/verify-email/:token', verifyEmail);
router.post('/forgot-password', [body('email').isEmail().normalizeEmail()], validate, forgotPassword);
router.post('/reset-password/:token', [body('password').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 })], validate, resetPassword);
router.post('/logout-all', authenticate, logoutAll);

export default router;
