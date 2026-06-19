import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model';
import Team from '../models/team.model';
import Activity from '../models/activity.model';
import Workout from '../models/workout.model';
import LeaderboardEntry from '../models/leaderboard.model';

dotenv.config();

const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

const seedDatabase = async (): Promise<void> => {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGO_URI);
  console.log(`Connected to MongoDB: ${MONGO_URI}`);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
  ]);

  const users = await User.create([
    { name: 'Ava Torres', email: 'ava.torres@example.com' },
    { name: 'Marcus Lee', email: 'marcus.lee@example.com' },
    { name: 'Nina Patel', email: 'nina.patel@example.com' },
  ]);

  const teams = await Team.create([
    {
      name: 'Sunrise Sprinters',
      description: 'Competitive runners focused on morning training and pacing.',
      memberIds: [users[0]._id, users[1]._id],
    },
    {
      name: 'Core Crushers',
      description: 'Strength and conditioning athletes building endurance.',
      memberIds: [users[2]._id],
    },
  ]);

  const workouts = await Workout.create([
    {
      name: 'Endurance Builder',
      description: 'A steady-state cardio session for sustained stamina.',
      durationMinutes: 45,
      intensity: 'Medium',
      exercises: ['easy run', 'cycling intervals', 'cool down stretch'],
    },
    {
      name: 'Power HIIT',
      description: 'High-intensity interval training to improve power and speed.',
      durationMinutes: 30,
      intensity: 'High',
      exercises: ['burpees', 'kettlebell swings', 'jump squats', 'mountain climbers'],
    },
  ]);

  const activities = await Activity.create([
    {
      userId: users[0]._id,
      type: 'Running',
      distance: 6.3,
      durationMinutes: 38,
      caloriesBurned: 520,
      activityDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
      notes: 'Morning tempo run with consistent pace.',
    },
    {
      userId: users[1]._id,
      type: 'Cycling',
      distance: 18.4,
      durationMinutes: 55,
      caloriesBurned: 760,
      activityDate: new Date(Date.now() - 1000 * 60 * 60 * 48),
      notes: 'Outdoor ride with hill sprints.',
    },
    {
      userId: users[2]._id,
      type: 'Strength Training',
      durationMinutes: 50,
      caloriesBurned: 430,
      activityDate: new Date(Date.now() - 1000 * 60 * 60 * 72),
      notes: 'Full-body strength circuit focused on core and legs.',
    },
  ]);

  const leaderboardEntries = await LeaderboardEntry.create([
    { userId: users[0]._id, username: users[0].name, score: 1480, rank: 1 },
    { userId: users[1]._id, username: users[1].name, score: 1295, rank: 2 },
    { userId: users[2]._id, username: users[2].name, score: 1170, rank: 3 },
  ]);

  console.log('Seed complete:');
  console.log(`- Users: ${users.length}`);
  console.log(`- Teams: ${teams.length}`);
  console.log(`- Workouts: ${workouts.length}`);
  console.log(`- Activities: ${activities.length}`);
  console.log(`- Leaderboard entries: ${leaderboardEntries.length}`);

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
};

seedDatabase().catch((error) => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
