import { model, Model, Schema } from 'mongoose';
import { messageSchema } from './Message';
import { userSchema } from './User';

const roomSchema = new Schema({
  name: { type: String, required: true },
  ownerId: { type: String, required: true },
  members: { type: [userSchema], required: true },
  lastMessage: { type: messageSchema },
});

export const Room = model<Room>('Room', roomSchema);
