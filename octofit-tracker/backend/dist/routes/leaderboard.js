import { Router } from 'express';
import { Leaderboard } from '../models/leaderboard.js';
const router = Router();
router.get('/', async (req, res, next) => {
    try {
        const filter = typeof req.query.period === 'string' ? { period: req.query.period } : {};
        res.json(await Leaderboard.find(filter).populate('user', '-password').sort({ points: -1, rank: 1 }));
    }
    catch (error) {
        next(error);
    }
});
router.get('/:id', async (req, res, next) => {
    try {
        const entry = await Leaderboard.findById(req.params.id).populate('user', '-password');
        if (!entry) {
            res.status(404).json({ error: 'Leaderboard entry not found' });
            return;
        }
        res.json(entry);
    }
    catch (error) {
        next(error);
    }
});
router.post('/', async (req, res, next) => {
    try {
        res.status(201).json(await Leaderboard.create(req.body));
    }
    catch (error) {
        next(error);
    }
});
router.put('/:id', async (req, res, next) => {
    try {
        const entry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('user', '-password');
        if (!entry) {
            res.status(404).json({ error: 'Leaderboard entry not found' });
            return;
        }
        res.json(entry);
    }
    catch (error) {
        next(error);
    }
});
router.delete('/:id', async (req, res, next) => {
    try {
        if (!await Leaderboard.findByIdAndDelete(req.params.id)) {
            res.status(404).json({ error: 'Leaderboard entry not found' });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
export default router;
