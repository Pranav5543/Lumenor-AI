import { Router } from 'express';
import { body } from 'express-validator';
import { createProduct, getProduct, listProducts, updateProduct } from '../controllers/product.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.get('/', listProducts);
router.get('/:slug', getProduct);
router.post('/', authenticate, authorize('admin'), [
  body('title').isLength({ min: 3 }),
  body('description').isLength({ min: 20 }),
  body('pricing.base').isFloat({ min: 1 }),
  body('variants').isArray({ min: 1 })
], validate, createProduct);
router.put('/:id', authenticate, authorize('admin'), updateProduct);

export default router;
