import { Router } from 'express';
import { body } from 'express-validator';
import { createOrder } from '../controllers/order.controller.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.post('/', [body('shippingAddress').isObject()], validate, createOrder);

export default router;
