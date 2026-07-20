import express from 'express';
import mongoose from 'mongoose';
import routes from './routes.js';
const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
        return;
    }
    next();
});
app.use(routes);
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', port, baseUrl });
});
const startServer = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/octofit_db');
        console.log('Connected to MongoDB');
        app.listen(port, '0.0.0.0', () => {
            console.log(`Backend listening on port ${port}`);
        });
    }
    catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
};
startServer();
