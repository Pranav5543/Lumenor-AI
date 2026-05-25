import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { darkEmailTemplate, sendEmail } from '../services/email.service.js';
import { secureToken, setAuthCookies, signAccessToken, signRefreshToken } from '../services/token.service.js';
import jwt from 'jsonwebtoken';

function authPayload(user) {
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  return { accessToken, refreshToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
}

export async function register(req, res, next) {
  try {
    const existing = await User.findOne({ email: req.body.email });
    if (existing) throw new AppError('Email is already registered', 409);
    const verificationToken = secureToken(20);
    const user = await User.create({ ...req.body, verificationToken });
    const payload = authPayload(user);
    setAuthCookies(res, payload.accessToken, payload.refreshToken);
    await sendEmail({
      to: user.email,
      subject: 'Verify your NOIRTHREAD account',
      html: darkEmailTemplate({ title: 'Verify your account', body: 'Confirm your email to unlock private client services.', cta: 'Verify email', url: `${process.env.CLIENT_URL}/verify-email/${verificationToken}` })
    });
    res.status(201).json(payload);
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email }).select('+password');
    if (!user || !(await user.comparePassword(req.body.password))) throw new AppError('Invalid email or password', 401);
    const payload = authPayload(user);
    setAuthCookies(res, payload.accessToken, payload.refreshToken);
    res.json(payload);
  } catch (error) {
    next(error);
  }
}

export function me(req, res) {
  res.json({ user: req.user });
}

export async function logoutAll(req, res, next) {
  try {
    req.user.refreshTokenVersion += 1;
    await req.user.save();
    res.clearCookie('accessToken').clearCookie('refreshToken').json({ message: 'Logged out from all devices' });
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      user.passwordResetToken = secureToken(24);
      user.passwordResetExpires = new Date(Date.now() + 30 * 60 * 1000);
      await user.save();
      await sendEmail({
        to: user.email,
        subject: 'Reset your NOIRTHREAD password',
        html: darkEmailTemplate({ title: 'Password reset', body: 'This secure link expires in 30 minutes.', cta: 'Reset password', url: `${process.env.CLIENT_URL}/reset-password/${user.passwordResetToken}` })
      });
    }
    res.json({ message: 'If an account exists, a reset email has been sent' });
  } catch (error) {
    next(error);
  }
}

export async function refreshSession(req, res, next) {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken;
    if (!token) throw new AppError('Refresh token required', 401);
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret');
    const user = await User.findById(payload.sub);
    if (!user || user.refreshTokenVersion !== payload.version) throw new AppError('Refresh token revoked', 401);
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    setAuthCookies(res, accessToken, refreshToken);
    res.json({ accessToken, refreshToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    next(error.statusCode ? error : new AppError('Invalid refresh token', 401));
  }
}

export async function verifyEmail(req, res, next) {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) throw new AppError('Verification token is invalid', 422);
    user.emailVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.json({ message: 'Email verified' });
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const user = await User.findOne({
      passwordResetToken: req.params.token,
      passwordResetExpires: { $gt: new Date() }
    }).select('+password');
    if (!user) throw new AppError('Reset token is invalid or expired', 422);
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.refreshTokenVersion += 1;
    await user.save();
    res.json({ message: 'Password reset complete' });
  } catch (error) {
    next(error);
  }
}
