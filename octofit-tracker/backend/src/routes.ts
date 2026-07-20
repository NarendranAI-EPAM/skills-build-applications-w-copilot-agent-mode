import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';
import { getApiUrl } from './config/api.js';

const router = Router();

router.get(['/api/users', '/api/users/'], async (_req, res) => {
  const users = await User.find({}).lean();
  res.json({ data: users, meta: { count: users.length, url: getApiUrl(undefined, '/api/users/') } });
});

router.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json({ data: teams, meta: { count: teams.length, url: getApiUrl(undefined, '/api/teams/') } });
});

router.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json({ data: activities, meta: { count: activities.length, url: getApiUrl(undefined, '/api/activities/') } });
});

router.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).lean();
  res.json({ data: leaderboard, meta: { count: leaderboard.length, url: getApiUrl(undefined, '/api/leaderboard/') } });
});

router.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json({ data: workouts, meta: { count: workouts.length, url: getApiUrl(undefined, '/api/workouts/') } });
});

export default router;
