import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  title: String,
  sku: String,
  size: String,
  color: String,
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  image: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  items: [orderItemSchema],
  shippingAddress: Object,
  coupon: {
    code: String,
    discount: Number
  },
  totals: {
    subtotal: Number,
    tax: Number,
    shipping: Number,
    discount: Number,
    grandTotal: Number
  },
  tracking: {
    carrier: String,
    trackingNumber: String,
    events: [{ status: String, at: Date, location: String }]
  },
  invoice: {
    number: { type: String, index: true },
    url: String
  },
  paymentStatus: { type: String, enum: ['pending', 'authorized', 'paid', 'failed', 'refunded'], default: 'pending', index: true },
  deliveryStatus: { type: String, enum: ['processing', 'packed', 'shipped', 'delivered', 'returned'], default: 'processing', index: true }
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);
