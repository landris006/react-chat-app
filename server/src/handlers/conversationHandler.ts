import { Message } from '../models/Message';
import { Room } from '../models/Room';
import { EventHandler } from '../types/common';

export const conversationHandler: EventHandler = (io, socket) => {
  socket.on('sendMessage', async (message: Message) => {
    const newMessage = new Message({
      ...message,
      senderId: socket.data.user._id,
      senderUsername: socket.data.user.username,
    });

    try {
      if (message.roomId !== 'everyone') {
        const room = await Room.find({ _id: newMessage.roomId });
        if (!room) {
          socket.emit('error', 'Room not found...');
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
