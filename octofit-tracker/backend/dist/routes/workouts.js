import { Router } from 'express';
import { Workout } from '../models/workout.js';
const router = Router();
router.get('/', async (req, res, next) => {
    try {
        const query = Workout.find().sort({ title: 1 });
        if (typeof req.query.difficulty === 'string') {
            query.where('difficulty').equals(req.query.difficulty);
        }
        res.json(await query);
    }
    catch (error) {
        next(error);
    }
});
router.get('/:id', async (req, res, next) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }
        res.json(workout);
    }
    catch (error) {
        next(error);
    }
});
router.post('/', async (req, res, next) => {
    try {
        res.status(201).json(await Workout.create(req.body));
    }
    catch (error) {
        next(error);
    }
});
router.put('/:id', async (req, res, next) => {
    try {
        const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!workout) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }
        res.json(workout);
    }
    catch (error) {
        next(error);
    }
});
router.delete('/:id', async (req, res, next) => {
    try {
        if (!await Workout.findByIdAndDelete(req.params.id)) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
export default router;
