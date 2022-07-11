import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { JWT_SECRET } from '../env';
import { Room } from '../models/Room';
import { User } from '../types/User';

export const socketInit = async (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  const token: string = socket.handshake.auth.token?.split(' ')[1];

  if (!token) {
    socket.emit('error', 'No token provided, please log in again...');
    throw new Error('No token provided...');
  }

  jwt.verify(token, JWT_SECRET, async (err, user) => {
    if (err || !user) {
      console.log(err);
      socket.emit(
        'error',
        err?.message ?? 'Something went wrong, log in again...'
      );
      throw new Error(err?.message ?? 'Something went wrong, log in again...');
    }
    socket.data.user = user;

    try {
      const rooms = await Room.find({
        members: (<User>user)._id,
      });

      rooms.forEach((room) => {
        socket.join(room._id.toString());
      });
    } catch (error) {
      console.error(error);
    }
    next();
  });
};
