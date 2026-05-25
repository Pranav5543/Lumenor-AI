import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';

export async function analytics(_req, res, next) {
  try {
    const [orders, customers, lowStockProducts] = await Promise.all([
      Order.find().lean(),
      User.countDocuments({ role: 'customer' }),
      Product.find({ stock: { $lte: 10 } }).select('title stock').lean()
    ]);
    const revenue = orders.reduce((sum, order) => sum + (order.totals?.grandTotal || 0), 0);
    res.json({
      revenue,
      orders: orders.length,
      customers,
      lowStock: lowStockProducts.length,
      lowStockProducts,
      series: buildSeries(orders),
      insights: [
        'Recommendation scores combine recently viewed, wishlist, purchase, tags, and collaborative product signals.',
        'Low stock products should be promoted only after inventory replenishment.',
        'Repeat customers are weighted toward adjacent categories rather than exact duplicates.'
      ]
    });
  } catch (error) {
    next(error);
  }
}

function buildSeries(orders) {
  const buckets = new Map();
  orders.forEach((order) => {
    const month = new Date(order.createdAt).toLocaleString('en', { month: 'short' });
    buckets.set(month, (buckets.get(month) || 0) + (order.totals?.grandTotal || 0));
  });
  return [...buckets.entries()].map(([month, revenue]) => ({ month, revenue }));
}
