import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  joinedAt: Date;
  teamId?: mongoose.Types.ObjectId;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    joinedAt: { type: Date, default: Date.now },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
