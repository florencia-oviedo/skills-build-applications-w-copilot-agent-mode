import express, { Request, Response } from 'express';
import Team from '../models/team.model';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 }).limit(100);
    res.json(teams);
  } catch (error) {
    console.error('GET /api/teams error:', error);
    res.status(500).json({ error: 'Failed to load teams' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const payload = {
      ...req.body,
      createdAt: new Date(),
    };
    const team = await Team.create(payload);
    res.status(201).json(team);
  } catch (error) {
    console.error('POST /api/teams error:', error);
    res.status(500).json({ error: 'Failed to create team' });
  }
});

export default router;
