import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';

export async function getRecommendationsForUser(user, limit = 12) {
  const products = await Product.find({ stock: { $gt: 0 } }).lean();
  if (!products.length) return [];

  const viewedIds = new Set(user?.recentlyViewed?.map((item) => item.product?.toString()) || []);
  const wishlistIds = new Set(user?.wishlist?.map((id) => id.toString()) || []);
  const orders = user ? await Order.find({ user: user._id }).lean() : [];
  const purchasedProductIds = orders.flatMap((order) => order.items.map((item) => item.product?.toString()));
  const purchasedSet = new Set(purchasedProductIds);

  const interestWeights = new Map();
  const addWeight = (terms, weight) => terms?.forEach((term) => interestWeights.set(term, (interestWeights.get(term) || 0) + weight));

  products.forEach((product) => {
    if (viewedIds.has(product._id.toString())) addWeight([...product.categories, ...product.tags], 4);
    if (wishlistIds.has(product._id.toString())) addWeight([...product.categories, ...product.tags], 6);
    if (purchasedSet.has(product._id.toString())) addWeight([...product.categories, ...product.tags], 8);
  });

  return products
    .map((product) => {
      const behavioralScore = [...product.categories, ...product.tags].reduce((sum, term) => sum + (interestWeights.get(term) || 0), 0);
      const collaborativeScore = product.purchaseCount * 0.8 + product.wishlistCount * 0.55 + product.viewCount * 0.08;
      const freshnessScore = product.trending ? 10 : product.featured ? 6 : 0;
      const stockScore = Math.min(product.stock, 25) * 0.12;
      return { ...product, recommendationScore: behavioralScore + collaborativeScore + freshnessScore + stockScore };
    })
    .filter((product) => !purchasedSet.has(product._id.toString()))
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, limit);
}
