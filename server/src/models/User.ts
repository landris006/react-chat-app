import { model, Model, Schema } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: String, default: Date() },
});

export const User = model<User>('User', userSchema);
