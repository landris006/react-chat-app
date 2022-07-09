import express from 'express';
import {
  createRoom,
  deleteRoom,
  getAllUsers,
  getMessages,
  getRooms,
} from '../controllers/conversation';

export const conversationRoutes = express.Router();

conversationRoutes.get('/get-messages', getMessages);
conversationRoutes.get('/get-rooms', getRooms);
conversationRoutes.get('/get-all-users', getAllUsers);
conversationRoutes.post('/create-room', createRoom);
conversationRoutes.delete('/delete-room', deleteRoom);
