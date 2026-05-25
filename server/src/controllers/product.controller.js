import slugify from 'slugify';
import { Product } from '../models/Product.js';
import { AppError } from '../utils/AppError.js';

export async function listProducts(req, res, next) {
  try {
    const { search, category, gender, min, max, availability, sort = 'trending', page = 1, limit = 24 } = req.query;
    const filter = {};
    if (search) filter.$text = { $search: search };
    if (category && category !== 'All') filter.categories = category;
    if (gender) filter.gender = gender;
    if (availability === 'in-stock') filter.stock = { $gt: 0 };
    if (min || max) filter['pricing.base'] = { ...(min && { $gte: Number(min) }), ...(max && { $lte: Number(max) }) };
    const sortMap = { trending: { trending: -1, viewCount: -1 }, newest: { createdAt: -1 }, 'price-asc': { 'pricing.base': 1 }, 'price-desc': { 'pricing.base': -1 } };
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Product.find(filter).sort(sortMap[sort] || sortMap.trending).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter)
    ]);
    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    next(error);
  }
}

export async function getProduct(req, res, next) {
  try {
    const product = await Product.findOneAndUpdate({ slug: req.params.slug }, { $inc: { viewCount: 1 } }, { new: true });
    if (!product) throw new AppError('Product not found', 404);
    if (req.user) {
      req.user.recentlyViewed = [{ product: product._id, viewedAt: new Date() }, ...req.user.recentlyViewed.filter((item) => item.product.toString() !== product._id.toString())].slice(0, 30);
      await req.user.save();
    }
    res.json({ product });
  } catch (error) {
    next(error);
  }
}

export async function createProduct(req, res, next) {
  try {
    const slug = req.body.slug || slugify(req.body.title, { lower: true, strict: true });
    const product = await Product.create({ ...req.body, slug });
    res.status(201).json({ product });
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) throw new AppError('Product not found', 404);
    res.json({ product });
  } catch (error) {
    next(error);
  }
}
