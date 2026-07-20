import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String
});

const teamSchema = new mongoose.Schema({
  name: String,
  members: Number
});

const activitySchema = new mongoose.Schema({
  type: String,
  duration: Number,
  calories: Number
});

const leaderboardSchema = new mongoose.Schema({
  name: String,
  score: Number
});

const workoutSchema = new mongoose.Schema({
  title: String,
  difficulty: String
});

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
