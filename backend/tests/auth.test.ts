import request from 'supertest';
import express from 'express';
import authRoutes from '../src/routes/auth';
import mongoose from 'mongoose';
import connectDB from '../src/config/database';
import { User } from '../src/models/User';

// Mock nodemailer for testing
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(() => Promise.resolve({ messageId: 'test' })),
  })),
}));

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

beforeAll(async () => {
  // Connect to test database
  process.env.MONGODB_URI = 'mongodb://localhost:27017/authdb_test';
  // Set test email config to avoid connection errors
  process.env.EMAIL_HOST = 'localhost';
  process.env.EMAIL_PORT = '587';
  process.env.EMAIL_USER = 'test@example.com';
  process.env.EMAIL_PASS = 'testpass';
  process.env.EMAIL_FROM = 'test@example.com';
  
  await connectDB();
});

describe('Auth Routes', () => {
  test('POST /auth/register - should register a new user', async () => {
    // Clear any existing user first
    await User.deleteOne({ email: 'test@example.com' });
    
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    const response = await request(app)
      .post('/auth/register')
      .send(userData);

    console.log('Register response:', response.status, response.body);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Registered. Please verify your email.');
    
    const user = await User.findOne({ email: userData.email });
    expect(user).toBeTruthy();
    expect(user?.isVerified).toBe(false);
  });

  test('POST /auth/register - should reject duplicate email', async () => {
    const userData = {
      name: 'Test User',
      email: 'duplicate@example.com',
      password: 'password123',
    };

    // Create first user
    await request(app).post('/auth/register').send(userData);

    // Try to create duplicate
    const response = await request(app)
      .post('/auth/register')
      .send(userData)
      .expect(400);

    expect(response.body.message).toBe('Email already registered');
  });

  test('POST /auth/login - should login verified user', async () => {
    // Create and verify user
    const userData = {
      name: 'Test User',
      email: 'verified@example.com',
      password: 'password123',
    };

    await request(app).post('/auth/register').send(userData);
    
    // Manually verify user for test
    await User.findOneAndUpdate(
      { email: userData.email },
      { isVerified: true }
    );

    const response = await request(app)
      .post('/auth/login')
      .send({ email: userData.email, password: userData.password })
      .expect(200);

    expect(response.body.message).toBe('Logged in');
    expect(response.headers['set-cookie']).toBeDefined();
  });

  test('POST /auth/login - should reject unverified user', async () => {
    const userData = {
      name: 'Test User',
      email: 'unverified@example.com',
      password: 'password123',
    };

    await request(app).post('/auth/register').send(userData);

    const response = await request(app)
      .post('/auth/login')
      .send({ email: userData.email, password: userData.password })
      .expect(403);

    expect(response.body.message).toBe('Email not verified');
  });

  test('POST /auth/login - should reject invalid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'nonexistent@example.com', password: 'wrongpassword' })
      .expect(401);

    expect(response.body.message).toBe('Invalid credentials');
  });

  test('POST /auth/logout - should logout user', async () => {
    const response = await request(app)
      .post('/auth/logout');

    console.log('Logout response:', response.status, response.body);

    // Logout should work even without auth (just clears cookies)
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Logged out');
  });
});
