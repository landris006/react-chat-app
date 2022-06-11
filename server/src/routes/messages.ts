import express from 'express';
import { getMessages } from '../controllers/messages';

export const messagesRoutes = express.Router();

messagesRoutes.get('/get-messages', getMessages);
