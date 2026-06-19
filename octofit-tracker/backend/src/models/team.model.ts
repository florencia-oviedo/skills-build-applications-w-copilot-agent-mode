import mongoose, { Document, Schema } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description?: string;
  createdAt: Date;
  memberIds: mongoose.Types.ObjectId[];
}

const TeamSchema: Schema<ITeam> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Team = mongoose.model<ITeam>('Team', TeamSchema);
export default Team;
