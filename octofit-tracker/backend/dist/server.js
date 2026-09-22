import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
dotenv.config();
const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(cors());
app.use(express.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'Octofit Tracker API is running' });
});
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);
app.use((error, _req, res, _next) => {
    console.error('API request failed:', error);
    if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).json({ error: error.message });
        return;
    }
    if (error instanceof mongoose.Error.CastError) {
        res.status(400).json({ error: 'Invalid resource identifier' });
        return;
    }
    if (error instanceof Error && 'code' in error && error.code === 11000) {
        res.status(409).json({ error: 'A record with those unique fields already exists' });
        return;
    }
    res.status(500).json({ error: 'Internal server error' });
});
async function startServer() {
    try {
        await connectDatabase();
        app.listen(port, () => {
            console.log(`Octofit Tracker API running on port ${port}`);
            console.log(`API base URL: ${apiBaseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
