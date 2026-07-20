import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const startServer = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/octofit_db');
    console.log('Connected to MongoDB');

    app.listen(port, '0.0.0.0', () => {
      console.log(`Backend listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

startServer();
