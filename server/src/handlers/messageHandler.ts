import { Message } from '../models/Message';

export const messageHandler: eventHandler = (io, socket) => {
  socket.on('sendMessage', async (message: Message) => {
    console.log(message);

    const newMessage = new Message({ ...message });

    try {
      await newMessage.save();
      io.sockets.emit('newMessage', newMessage);
    } catch (error) {
      console.log(error);
    }
  });
};
