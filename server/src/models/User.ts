import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: String, default: Date() },
});

export const User = mongoose.model('User', userSchema);
