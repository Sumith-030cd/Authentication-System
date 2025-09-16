import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { sanitizeInput } from '../utils/sanitize';
import { User } from '../models/User';
import { VerificationToken } from '../models/VerificationToken';
import { PasswordResetToken } from '../models/PasswordResetToken';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function register(req: Request, res: Response) {
  try {
    const data = registerSchema.parse(sanitizeInput(req.body));
    const existing = await User.findOne({ email: data.email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    
    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await User.create({
      name: data.name,
      email: data.email,
      passwordHash,
      isVerified: true, // Auto-verify for testing
    });
    
    // Email verification (disabled for testing)
    // const token = crypto.randomBytes(32).toString('hex');
    // await VerificationToken.create({
    //   token,
    //   userId: user._id.toString(),
    //   expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
    // });
    
    // await sendVerificationEmail(user.email, token);
    return res.status(201).json({ message: 'Registration successful! You can now login.' });
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = sanitizeInput(req.body);
    console.log('Login attempt for email:', email);
    
    const user = await User.findOne({ email });
    console.log('User found:', user ? 'Yes' : 'No');
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });
    
    console.log('User verified status:', user.isVerified);
    if (!user.isVerified) return res.status(403).json({ message: 'Email not verified' });
    
    console.log('Comparing password...');
    const valid = await bcrypt.compare(password, user.passwordHash);
    console.log('Password valid:', valid);
    if (!valid) return res.status(401).json({ message: 'Invalid email or password' });
    
    console.log('Creating JWT tokens...');
    const accessToken = jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET!, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id.toString() }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });
    
    res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'lax', secure: false });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax', secure: false });
    return res.json({ message: 'Logged in' });
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
}

export async function logout(req: Request, res: Response) {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  return res.json({ message: 'Logged out' });
}

export async function refresh(req: Request, res: Response) {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });
    
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: string };
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: 'Invalid refresh token' });
    
    const accessToken = jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET!, { expiresIn: '15m' });
    res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'lax', secure: false });
    return res.json({ message: 'Token refreshed' });
  } catch {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
}

export async function verifyEmail(req: Request, res: Response) {
  try {
    const { token } = req.params;
    const record = await VerificationToken.findOne({ token });
    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    
    await User.findByIdAndUpdate(record.userId, { isVerified: true });
    await VerificationToken.findOneAndDelete({ token });
    return res.json({ message: 'Email verified' });
  } catch {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
}

export async function requestPasswordReset(req: Request, res: Response) {
  try {
    const { email } = sanitizeInput(req.body);
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ message: 'If email exists, a reset link will be sent.' });
    
    const token = crypto.randomBytes(32).toString('hex');
    await PasswordResetToken.create({
      token,
      userId: user._id.toString(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
    });
    
    await sendPasswordResetEmail(user.email, token);
    return res.json({ message: 'If email exists, a reset link will be sent.' });
  } catch {
    return res.status(400).json({ message: 'Error sending reset email' });
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    const { token } = req.params;
    const { password } = sanitizeInput(req.body);
    const record = await PasswordResetToken.findOne({ token });
    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    
    const passwordHash = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(record.userId, { passwordHash });
    await PasswordResetToken.findOneAndDelete({ token });
    return res.json({ message: 'Password reset successful' });
  } catch {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
}

async function sendVerificationEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const url = `${process.env.CLIENT_URL}/verify-email/${token}`;
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Verify your email',
    html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`
  });
}

async function sendPasswordResetEmail(email: string, token: string) {
  const url = `${process.env.CLIENT_URL}/reset-password/${token}`;
  
  // Temporarily disable email sending for testing
  console.log('=== PASSWORD RESET LINK ===');
  console.log(`Email: ${email}`);
  console.log(`Reset URL: ${url}`);
  console.log('=========================');
  
  // Comment out actual email sending for now
  /*
  const transporter = nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${url}">here</a> to reset your password.</p>`
  });
  */
}
