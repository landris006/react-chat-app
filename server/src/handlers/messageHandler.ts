import { Message } from '../models/Message';
import { EventHandler } from '../types/common';

export const messageHandler: EventHandler = (io, socket) => {
  socket.on('sendMessage', async (message: Message) => {
    const newMessage = new Message({ ...message });

    try {
      await newMessage.save();
      io.sockets.emit('newMessage', newMessage);
    } catch (error) {
      console.error(error);
    }
  });
};
