import { AppError } from '../utils/AppError.js';
import { logger } from '../utils/logger.js';

export function notFound(req, _res, next) {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
}

export function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;
  if (statusCode >= 500) logger.error(error);
  res.status(statusCode).json({
    message: error.message || 'Internal server error',
    details: error.details,
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
  });
}
