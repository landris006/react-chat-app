import { Message } from '../models/Message';
import { Room } from '../models/Room';
import { EventHandler } from '../types/common';

export const conversationHandler: EventHandler = (io, socket) => {
  socket.on('sendMessage', async (message: Message) => {
    const newMessage = new Message({ ...message });

    try {
      if (message.roomId !== 'everyone') {
        const room = await Room.find({ _id: newMessage.roomId });
        if (!room) {
          console.log({ newMessage, room });

          return;
        }
      }

      const savedMessage = await newMessage.save();

      if (savedMessage.roomId === 'everyone') {
        io.sockets.emit('newMessage', savedMessage);
        return;
      }

      io.in(savedMessage.roomId).emit('newMessage', savedMessage);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('deleteRoom', async (roomId: string) => {});
};
