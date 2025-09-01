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

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ message: 'API running with MongoDB' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
