import express from 'express';
import { createRoom, getMessages } from '../controllers/conversation';

export const conversationRoutes = express.Router();

conversationRoutes.get('/get-messages', getMessages);
conversationRoutes.get('/create-room', createRoom);
