import express, { Request, Response } from 'express';
import User from '../models/user.model';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ joinedAt: -1 }).limit(100);
    res.json(users);
  } catch (error) {
    console.error('GET /api/users error:', error);
    res.status(500).json({ error: 'Failed to load users' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const payload = {
      ...req.body,
      joinedAt: new Date(),
    };
    const user = await User.create(payload);
    res.status(201).json(user);
  } catch (error) {
    console.error('POST /api/users error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

export default router;
