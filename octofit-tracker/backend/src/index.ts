import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '8000', 10);
const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit-tracker';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✓ MongoDB connected successfully');
  } catch (error) {
    console.error('✗ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Health Check Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'OctoFit Tracker Backend is running',
  });
});

// Root Endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'OctoFit Tracker API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
    },
  });
});

// Start Server
const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📊 Database: ${MONGO_URI}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

export default app;
