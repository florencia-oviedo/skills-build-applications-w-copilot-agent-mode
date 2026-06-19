import express, { Request, Response } from 'express';
import Workout from '../models/workout.model';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 }).limit(100);
    res.json(workouts);
  } catch (error) {
    console.error('GET /api/workouts error:', error);
    res.status(500).json({ error: 'Failed to load workouts' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const payload = {
      ...req.body,
      createdAt: new Date(),
    };
    const workout = await Workout.create(payload);
    res.status(201).json(workout);
  } catch (error) {
    console.error('POST /api/workouts error:', error);
    res.status(500).json({ error: 'Failed to create workout' });
  }
});

export default router;
