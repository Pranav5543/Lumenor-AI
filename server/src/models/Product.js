import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  size: { type: String, required: true },
  color: { type: String, required: true },
  hex: String,
  sku: { type: String, required: true, unique: true },
  inventory: { type: Number, required: true, min: 0 },
  images: [{ url: String, publicId: String }],
  price: Number
}, { _id: true });

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, min: 1, max: 5 },
  comment: String
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, index: 'text' },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  categories: [{ type: String, index: true }],
  gender: { type: String, enum: ['Men', 'Women', 'Unisex'], index: true },
  tags: [{ type: String, index: true }],
  variants: [variantSchema],
  pricing: {
    base: { type: Number, required: true },
    sale: Number,
    currency: { type: String, default: 'USD' }
  },
  images: [{ url: String, publicId: String, alt: String }],
  reviews: [reviewSchema],
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  stock: { type: Number, default: 0, index: true },
  seo: {
    title: String,
    description: String,
    canonical: String
  },
  featured: { type: Boolean, default: false, index: true },
  trending: { type: Boolean, default: false, index: true },
  viewCount: { type: Number, default: 0 },
  purchaseCount: { type: Number, default: 0 },
  wishlistCount: { type: Number, default: 0 }
}, { timestamps: true });

productSchema.index({ title: 'text', description: 'text', tags: 'text', categories: 'text' });
productSchema.index({ categories: 1, gender: 1, stock: 1 });

export const Product = mongoose.model('Product', productSchema);
