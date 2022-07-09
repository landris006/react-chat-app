import { model, Model, Schema } from 'mongoose';
import { User as UserType } from '../types/User';

export const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: String, default: Date() },
});

export const User = model<UserType>('User', userSchema);
