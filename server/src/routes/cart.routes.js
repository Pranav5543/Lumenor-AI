import { Router } from 'express';
import { body } from 'express-validator';
import { applyCoupon, getCart, updateCart } from '../controllers/cart.controller.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.get('/', getCart);
router.put('/', [body('items').isArray()], validate, updateCart);
router.post('/coupon', [body('code').isString().trim().isLength({ min: 2 })], validate, applyCoupon);

export default router;
