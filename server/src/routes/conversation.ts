import express from 'express';
import {
  createRoom,
  deleteRoom,
  getMessages,
  getRooms,
} from '../controllers/conversation';

export const conversationRoutes = express.Router();

conversationRoutes.get('/get-messages', getMessages);
conversationRoutes.get('/get-rooms', getRooms);
conversationRoutes.post('/create-room', createRoom);
conversationRoutes.delete('/delete-room', deleteRoom);
