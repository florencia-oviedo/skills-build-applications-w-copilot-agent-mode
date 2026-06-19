import express, { Request, Response } from 'express';
import LeaderboardEntry from '../models/leaderboard.model';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ score: -1, rank: 1 }).limit(20);
    res.json(leaderboard);
  } catch (error) {
    console.error('GET /api/leaderboard error:', error);
    res.status(500).json({ error: 'Failed to load leaderboard entries' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const payload = {
      ...req.body,
      updatedAt: new Date(),
    };
    const entry = await LeaderboardEntry.create(payload);
    res.status(201).json(entry);
  } catch (error) {
    console.error('POST /api/leaderboard error:', error);
    res.status(500).json({ error: 'Failed to create leaderboard entry' });
  }
});

export default router;
