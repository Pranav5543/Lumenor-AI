import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

export async function connectDatabase() {
  if (process.env.NODE_ENV === 'test') return;
  const uri = process.env.MONGO_URI;
  if (!uri) {
    logger.warn('MONGO_URI is not configured. API will start only when database-backed routes are avoided.');
    return;
  }
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { autoIndex: process.env.NODE_ENV !== 'production' });
  logger.info('MongoDB connected');
}
