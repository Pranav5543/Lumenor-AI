import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export function signAccessToken(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_ACCESS_SECRET || 'dev-access-secret', {
    expiresIn: process.env.ACCESS_TOKEN_TTL || '15m'
  });
}

export function signRefreshToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), version: user.refreshTokenVersion },
    process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret',
    { expiresIn: process.env.REFRESH_TOKEN_TTL || '30d' }
  );
}

export function secureToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString('hex');
}

export function setAuthCookies(res, accessToken, refreshToken) {
  const secure = process.env.NODE_ENV === 'production';
  res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'lax', secure, maxAge: 15 * 60 * 1000 });
  res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax', secure, maxAge: 30 * 24 * 60 * 60 * 1000 });
}
