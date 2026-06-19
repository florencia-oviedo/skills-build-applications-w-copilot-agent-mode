import express, { Request, Response } from 'express';
import Activity from '../models/activity.model';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().sort({ activityDate: -1 }).limit(100);
    res.json(activities);
  } catch (error) {
    console.error('GET /api/activities error:', error);
    res.status(500).json({ error: 'Failed to load activities' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const payload = {
      ...req.body,
      activityDate: req.body.activityDate ? new Date(req.body.activityDate) : new Date(),
    };
    const activity = await Activity.create(payload);
    res.status(201).json(activity);
  } catch (error) {
    console.error('POST /api/activities error:', error);
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

export default router;
