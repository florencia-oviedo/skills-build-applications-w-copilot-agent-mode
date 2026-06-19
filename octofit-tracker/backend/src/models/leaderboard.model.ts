import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: mongoose.Types.ObjectId;
  username: string;
  score: number;
  rank: number;
  updatedAt: Date;
}

const LeaderboardSchema: Schema<ILeaderboardEntry> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true, trim: true },
    score: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', LeaderboardSchema);
export default LeaderboardEntry;
