import { Router } from 'express';
import { User } from '../models/user.js';
const router = Router();
router.get('/', async (_req, res, next) => {
    try {
        res.json(await User.find().select('-password').sort({ name: 1 }));
    }
    catch (error) {
        next(error);
    }
});
router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(await User.findById(user._id).select('-password'));
    }
    catch (error) {
        next(error);
    }
});
router.put('/:id', async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('-password');
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
router.delete('/:id', async (req, res, next) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id);
        if (!result) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
export default router;
