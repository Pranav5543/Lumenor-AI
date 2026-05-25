import { Cart } from '../models/Cart.js';
import { Coupon } from '../models/Coupon.js';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { createInvoicePdf } from '../services/invoice.service.js';
import { darkEmailTemplate, sendEmail } from '../services/email.service.js';
import { AppError } from '../utils/AppError.js';

export async function createOrder(req, res, next) {
  try {
    const cart = await Cart.findOne(req.user ? { user: req.user._id } : { guestId: req.body.guestId }).populate('items.product');
    if (!cart?.items.length) throw new AppError('Cart is empty', 422);
    let subtotal = 0;
    const items = cart.items.map((item) => {
      const variant = item.product.variants.find((entry) => entry.sku === item.sku);
      if (!variant || variant.inventory < item.quantity) throw new AppError(`Insufficient inventory for ${item.product.title}`, 409);
      subtotal += item.priceSnapshot * item.quantity;
      return { product: item.product._id, title: item.product.title, sku: item.sku, size: variant.size, color: variant.color, quantity: item.quantity, price: item.priceSnapshot, image: item.product.images[0]?.url };
    });
    const coupon = cart.coupon ? await Coupon.findOne({ code: cart.coupon }) : null;
    const discount = coupon ? (coupon.type === 'percentage' ? subtotal * (coupon.value / 100) : coupon.value) : 0;
    const tax = Math.max(0, subtotal - discount) * 0.0825;
    const shipping = subtotal > 500 ? 0 : 18;
    const grandTotal = subtotal - discount + tax + shipping;
    const order = await Order.create({
      user: req.user?._id,
      items,
      shippingAddress: req.body.shippingAddress,
      coupon: coupon && { code: coupon.code, discount },
      totals: { subtotal, tax, shipping, discount, grandTotal },
      invoice: { number: `NT-${Date.now()}` },
      paymentStatus: 'paid'
    });
    await Promise.all(items.map((item) => Product.updateOne({ _id: item.product, 'variants.sku': item.sku }, { $inc: { 'variants.$.inventory': -item.quantity, purchaseCount: 1, stock: -item.quantity } })));
    if (coupon) await Coupon.updateOne({ _id: coupon._id }, { $inc: { usedCount: 1 } });
    await Cart.deleteOne({ _id: cart._id });
    const invoiceBuffer = await createInvoicePdf(order);
    if (req.user?.email) {
      await sendEmail({
        to: req.user.email,
        subject: `NOIRTHREAD order ${order.invoice.number}`,
        html: darkEmailTemplate({ title: 'Order confirmed', body: `Your order ${order.invoice.number} is confirmed. Invoice bytes generated: ${invoiceBuffer.length}.` })
      });
    }
    res.status(201).json({ order });
  } catch (error) {
    next(error);
  }
}
