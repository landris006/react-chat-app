import mongoose, { Model } from 'mongoose';

export const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  senderId: { type: String, required: true },
  senderUsername: { type: String, required: true },
  receiverId: { type: String, required: true },
  createdAt: { type: String, default: Date() },
});

export const Message: Model<Message> = mongoose.model('Message', messageSchema);
