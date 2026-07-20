import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            LeaderboardEntry.deleteMany({}),
            Workout.deleteMany({})
        ]);
        const users = await User.insertMany([
            { name: 'Ava Chen', email: 'ava.chen@example.com', role: 'admin', avatar: 'ava.jpg' },
            { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'member', avatar: 'noah.jpg' },
            { name: 'Mia Alvarez', email: 'mia.alvarez@example.com', role: 'member', avatar: 'mia.jpg' }
        ]);
        await Team.insertMany([
            { name: 'Speedsters', members: 8, captain: users[0].name },
            { name: 'Endurance Crew', members: 6, captain: users[1].name }
        ]);
        await Activity.insertMany([
            { userId: users[0]._id, type: 'run', duration: 35, calories: 420, date: '2026-07-20' },
            { userId: users[1]._id, type: 'cycling', duration: 60, calories: 620, date: '2026-07-19' },
            { userId: users[2]._id, type: 'swim', duration: 45, calories: 380, date: '2026-07-18' }
        ]);
        await LeaderboardEntry.insertMany([
            { userId: users[0]._id, name: users[0].name, score: 2450, streak: 7 },
            { userId: users[1]._id, name: users[1].name, score: 2280, streak: 5 },
            { userId: users[2]._id, name: users[2].name, score: 2140, streak: 4 }
        ]);
        await Workout.insertMany([
            { title: 'HIIT Blast', difficulty: 'advanced', duration: 25, focus: 'cardio' },
            { title: 'Morning Mobility', difficulty: 'beginner', duration: 20, focus: 'flexibility' },
            { title: 'Strength Circuit', difficulty: 'intermediate', duration: 40, focus: 'strength' }
        ]);
        console.log('Seed data inserted successfully');
        console.log({ users: users.length, teams: 2, activities: 3, leaderboard: 3, workouts: 3 });
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
