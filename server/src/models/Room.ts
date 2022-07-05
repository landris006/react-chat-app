import { model, Schema } from 'mongoose';
import { userSchema } from './User';

const roomSchema = new Schema({
  name: { type: String, required: true },
  ownerId: { type: String, required: true },
  members: { type: [userSchema], required: true },
});

export const Room = model<Room>('Room', roomSchema);
