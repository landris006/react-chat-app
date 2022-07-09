import { model, Schema } from 'mongoose';

const roomSchema = new Schema({
  name: { type: String, required: true },
  ownerId: { type: String, required: true },
  members: { type: [String], required: true },
});

export const Room = model<Room>('Room', roomSchema);
