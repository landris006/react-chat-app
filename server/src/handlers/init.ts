import { Message } from '../models/Message';
import { Room } from '../models/Room';
import { EventHandler } from '../types/common';

export const init: EventHandler = (io, socket) => {
  socket.on('joinRooms', async (userId: string) => {
    try {
      const rooms = await Room.find({
        members: userId,
      });

      rooms.forEach((room) => {
        socket.join(room._id.toString());
      });
    } catch (error) {
      console.error(error);
    }
  });
};
