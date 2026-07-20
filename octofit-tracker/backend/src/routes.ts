import { Router } from 'express';
import { getApiUrl } from './config/api.js';

const router = Router();

const mockUsers = [
  { id: 1, name: 'Ava', email: 'ava@example.com', role: 'admin' },
  { id: 2, name: 'Noah', email: 'noah@example.com', role: 'member' }
];

const mockTeams = [
  { id: 1, name: 'Speedsters', members: 8 },
  { id: 2, name: 'Endurance Crew', members: 6 }
];

const mockActivities = [
  { id: 1, type: 'run', duration: 30, calories: 300 },
  { id: 2, type: 'swim', duration: 45, calories: 400 }
];

const mockLeaderboard = [
  { id: 1, name: 'Ava', score: 2400 },
  { id: 2, name: 'Noah', score: 2150 }
];

const mockWorkouts = [
  { id: 1, title: 'HIIT Blast', difficulty: 'advanced' },
  { id: 2, title: 'Morning Mobility', difficulty: 'beginner' }
];

router.get('/api/users/', (_req, res) => {
  res.json({ data: mockUsers, meta: { count: mockUsers.length, url: getApiUrl(undefined, '/api/users/') } });
});

router.get('/api/teams/', (_req, res) => {
  res.json({ data: mockTeams, meta: { count: mockTeams.length, url: getApiUrl(undefined, '/api/teams/') } });
});

router.get('/api/activities/', (_req, res) => {
  res.json({ data: mockActivities, meta: { count: mockActivities.length, url: getApiUrl(undefined, '/api/activities/') } });
});

router.get('/api/leaderboard/', (_req, res) => {
  res.json({ data: mockLeaderboard, meta: { count: mockLeaderboard.length, url: getApiUrl(undefined, '/api/leaderboard/') } });
});

router.get('/api/workouts/', (_req, res) => {
  res.json({ data: mockWorkouts, meta: { count: mockWorkouts.length, url: getApiUrl(undefined, '/api/workouts/') } });
});

export default router;
