import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
await Product.deleteMany({});
await User.deleteMany({});

await User.create({
  name: 'NOIR Admin',
  email: 'admin@noirthread.example',
  password: 'Password123',
  role: 'admin',
  emailVerified: true
});

await Product.insertMany([
  {
    title: 'Atelier Wool Overcoat',
    slug: 'atelier-wool-overcoat',
    description: 'Double-faced wool, architectural shoulder, hand-finished matte hardware.',
    categories: ['Outerwear', 'Atelier'],
    gender: 'Unisex',
    tags: ['wool', 'minimal', 'tailored'],
    pricing: { base: 680, sale: 620 },
    images: [{ url: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1200&q=85' }],
    ratings: { average: 4.9, count: 138 },
    stock: 18,
    featured: true,
    trending: true,
    variants: [{ size: 'M', color: 'Graphite', hex: '#3F3F46', sku: 'NT-AWO-G-M', inventory: 8, price: 620 }]
  }
]);

console.info('NOIRTHREAD seed complete');
await mongoose.disconnect();
