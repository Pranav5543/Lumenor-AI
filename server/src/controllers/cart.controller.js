import { Cart } from '../models/Cart.js';
import { Coupon } from '../models/Coupon.js';
import { Product } from '../models/Product.js';
import { AppError } from '../utils/AppError.js';

async function loadCart(req) {
  const key = req.user ? { user: req.user._id } : { guestId: req.cookies.guestId || req.body.guestId };
  return Cart.findOne(key).populate('items.product');
}

export async function getCart(req, res, next) {
  try {
    const cart = await loadCart(req);
    res.json({ cart: cart || { items: [] } });
  } catch (error) {
    next(error);
  }
}

export async function updateCart(req, res, next) {
  try {
    const { items = [], guestId } = req.body;
    const products = await Product.find({ _id: { $in: items.map((item) => item.product) } });
    const productById = new Map(products.map((product) => [product._id.toString(), product]));
    for (const item of items) {
      const product = productById.get(item.product);
      const variant = product?.variants.find((entry) => entry.sku === item.sku);
      if (!product || !variant || variant.inventory < item.quantity) throw new AppError('Inventory validation failed', 409);
    }
    const key = req.user ? { user: req.user._id } : { guestId };
    const cart = await Cart.findOneAndUpdate(key, { ...key, items }, { new: true, upsert: true }).populate('items.product');
    res.json({ cart });
  } catch (error) {
    next(error);
  }
}

export async function applyCoupon(req, res, next) {
  try {
    const coupon = await Coupon.findOne({ code: req.body.code?.toUpperCase(), active: true });
    if (!coupon || coupon.expiry < new Date() || coupon.usedCount >= coupon.usageLimit) throw new AppError('Coupon is not valid', 422);
    const cart = await loadCart(req);
    const subtotal = cart?.items.reduce((sum, item) => sum + item.priceSnapshot * item.quantity, 0) || 0;
    if (subtotal < coupon.minimumOrder) throw new AppError('Minimum order requirement not met', 422);
    cart.coupon = coupon.code;
    await cart.save();
    res.json({ coupon });
  } catch (error) {
    next(error);
  }
}
