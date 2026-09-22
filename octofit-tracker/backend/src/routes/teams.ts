import { Router } from 'express';
import { Team } from '../models/team.js';

const router = Router();
router.get('/', async (_req, res, next) => {
  try { res.json(await Team.find().populate('members', '-password').sort({ name: 1 })); } catch (error) { next(error); }
});
router.get('/:id', async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id).populate('members', '-password');
    if (!team) { res.status(404).json({ error: 'Team not found' }); return; }
    res.json(team);
  } catch (error) { next(error); }
});
router.post('/', async (req, res, next) => {
  try { res.status(201).json(await Team.create(req.body)); } catch (error) { next(error); }
});
router.put('/:id', async (req, res, next) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('members', '-password');
    if (!team) { res.status(404).json({ error: 'Team not found' }); return; }
    res.json(team);
  } catch (error) { next(error); }
});
router.delete('/:id', async (req, res, next) => {
  try {
    if (!await Team.findByIdAndDelete(req.params.id)) { res.status(404).json({ error: 'Team not found' }); return; }
    res.status(204).send();
  } catch (error) { next(error); }
});
export default router;
