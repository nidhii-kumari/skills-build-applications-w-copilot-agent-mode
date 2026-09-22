import { Router } from 'express';
import { Activity } from '../models/activity.js';

const router = Router();
router.get('/', async (req, res, next) => {
  try {
    const filter = typeof req.query.user === 'string' ? { user: req.query.user } : {};
    res.json(await Activity.find(filter).populate('user', '-password').sort({ date: -1 }));
  } catch (error) { next(error); }
});
router.get('/:id', async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('user', '-password');
    if (!activity) { res.status(404).json({ error: 'Activity not found' }); return; }
    res.json(activity);
  } catch (error) { next(error); }
});
router.post('/', async (req, res, next) => {
  try { res.status(201).json(await (await Activity.create(req.body)).populate('user', '-password')); } catch (error) { next(error); }
});
router.put('/:id', async (req, res, next) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('user', '-password');
    if (!activity) { res.status(404).json({ error: 'Activity not found' }); return; }
    res.json(activity);
  } catch (error) { next(error); }
});
router.delete('/:id', async (req, res, next) => {
  try {
    if (!await Activity.findByIdAndDelete(req.params.id)) { res.status(404).json({ error: 'Activity not found' }); return; }
    res.status(204).send();
  } catch (error) { next(error); }
});
export default router;
