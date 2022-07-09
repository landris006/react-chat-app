import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { JWT_SECRET } from '../env';

export const verifySocketToken = (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  const token: string = socket.handshake.auth.token?.split(' ')[1];

  if (!token) {
    throw new Error('No token provided...');
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      throw new Error(err.message);
    }
    next();
  });
};
