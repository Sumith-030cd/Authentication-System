import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/database';
import authRoutes from './routes/auth';
import profileRoutes from './routes/profile';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ 
    message: 'Authentication System API - Backend is running!',
    status: 'success',
    endpoints: {
      auth: '/api/auth',
      profile: '/api/profile'
    }
  });
});

app.get('/api', (req: express.Request, res: express.Response) => {
  res.json({ message: 'API running with MongoDB on Vercel' });
});

// Export the app for Vercel
export default app;

const PORT = process.env.PORT || 4000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
