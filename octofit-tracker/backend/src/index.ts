import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import usersRouter from './routes/users.route';
import teamsRouter from './routes/teams.route';
import activitiesRouter from './routes/activities.route';
import workoutsRouter from './routes/workouts.route';
import leaderboardRouter from './routes/leaderboard.route';

dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '8000', 10);
const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';
const CODESPACE_NAME: string | undefined = process.env.CODESPACE_NAME;
const API_BASE_URL: string = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/workouts', workoutsRouter);
app.use('/api/leaderboard', leaderboardRouter);

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
    apiBaseUrl: API_BASE_URL,
  });
});

// Root Endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'OctoFit Tracker API',
    version: '1.0.0',
    apiBaseUrl: API_BASE_URL,
    endpoints: {
      health: '/api/health',
      users: '/api/users',
      teams: '/api/teams',
      activities: '/api/activities',
      workouts: '/api/workouts',
      leaderboard: '/api/leaderboard',
    },
  });
});

// Start Server
const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📊 Database: ${MONGO_URI}`);
    console.log(`🌐 API base URL: ${API_BASE_URL}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

export default app;
