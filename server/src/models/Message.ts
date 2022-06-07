import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  createdAt: { type: String, default: Date() },
});

export const Message = mongoose.model('Message', messageSchema);
