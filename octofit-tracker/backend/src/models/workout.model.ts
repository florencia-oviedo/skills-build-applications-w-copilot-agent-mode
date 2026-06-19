import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description?: string;
  durationMinutes: number;
  intensity?: string;
  exercises?: string[];
  createdAt: Date;
}

const WorkoutSchema: Schema<IWorkout> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    durationMinutes: { type: Number, default: 0 },
    intensity: { type: String, trim: true },
    exercises: [{ type: String, trim: true }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);
export default Workout;
