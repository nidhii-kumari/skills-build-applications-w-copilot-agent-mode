import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { getConnectionString } from '../config/database.js';
import { User } from '../models/user.js';
import { Team } from '../models/team.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Workout } from '../models/workout.js';

dotenv.config();

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(getConnectionString());

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Ada Lovelace', email: 'ada@example.com', password: 'password123' },
      { name: 'Grace Hopper', email: 'grace@example.com', password: 'password123' },
      { name: 'Alan Turing', email: 'alan@example.com', password: 'password123' },
    ]);
    const teams = await Team.create([
      { name: 'Code Runners', description: 'Build healthy habits together', members: [users[0]._id, users[1]._id] },
      { name: 'Byte Athletes', description: 'Friendly competition for everyone', members: [users[2]._id] },
    ]);
    await Activity.create([
      { user: users[0]._id, type: 'Running', duration: 30, calories: 280, notes: 'Morning run' },
      { user: users[1]._id, type: 'Cycling', duration: 45, calories: 410, notes: 'Trail ride' },
      { user: users[2]._id, type: 'Strength', duration: 40, calories: 260, notes: 'Full body session' },
    ]);
    await Leaderboard.create([
      { user: users[0]._id, points: 980, rank: 1 },
      { user: users[1]._id, points: 820, rank: 2 },
      { user: users[2]._id, points: 710, rank: 3 },
    ]);
    await Workout.create([
      {
        title: 'Starter Strength',
        description: 'A balanced introduction to strength training.',
        difficulty: 'beginner',
        duration: 25,
        exercises: ['Squats', 'Push-ups', 'Plank'],
        target: 'Full body',
      },
      {
        title: 'Cardio Challenge',
        description: 'An interval workout to improve endurance.',
        difficulty: 'intermediate',
        duration: 35,
        exercises: ['Jumping jacks', 'High knees', 'Burpees'],
        target: 'Cardio',
      },
    ]);

    console.log(`Seeded ${users.length} users, ${teams.length} teams, 3 activities, 3 leaderboard entries, and 2 workouts`);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
