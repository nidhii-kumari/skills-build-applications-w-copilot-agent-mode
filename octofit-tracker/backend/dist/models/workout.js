import { Schema, model } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    duration: { type: Number, required: true, min: 1 },
    exercises: [{ type: String, trim: true }],
    target: { type: String, required: true, trim: true },
}, { timestamps: true });
export const Workout = model('Workout', workoutSchema);
