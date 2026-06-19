import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  distance?: number;
  durationMinutes?: number;
  caloriesBurned?: number;
  activityDate: Date;
  notes?: string;
}

const ActivitySchema: Schema<IActivity> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    distance: { type: Number, default: 0 },
    durationMinutes: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 },
    activityDate: { type: Date, default: Date.now },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

const Activity = mongoose.model<IActivity>('Activity', ActivitySchema);
export default Activity;
