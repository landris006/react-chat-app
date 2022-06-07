import express, { Router } from 'express';
import { getMessages } from '../controllers/messages';

export const messagesRoutes = express.Router();

messagesRoutes.get('/getMessages', getMessages);
