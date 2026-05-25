import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  guestId: { type: String, index: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    sku: String,
    quantity: { type: Number, min: 1 },
    priceSnapshot: Number
  }],
  coupon: { type: String },
  recoveredAt: Date
}, { timestamps: true });

cartSchema.index({ user: 1, guestId: 1 });

export const Cart = mongoose.model('Cart', cartSchema);
