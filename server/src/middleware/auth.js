import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';

export async function authenticate(req, _res, next) {
  try {
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : req.cookies.accessToken;
    if (!token) throw new AppError('Authentication required', 401);
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'dev-access-secret');
    const user = await User.findById(payload.sub).select('-password');
    if (!user) throw new AppError('Session user not found', 401);
    req.user = user;
    next();
  } catch (error) {
    next(error.statusCode ? error : new AppError('Invalid or expired session', 401));
  }
}

export function authorize(...roles) {
  return (req, _res, next) => {
    if (!roles.includes(req.user?.role)) return next(new AppError('Forbidden', 403));
    return next();
  };
}
