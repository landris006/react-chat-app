import express from 'express';
import { login, loginWithToken, signUp } from '../controllers/users';
import { verifyToken } from '../middleware/auth';

export const usersRoutes = express.Router();

usersRoutes.post('/sign-up', signUp);
usersRoutes.post('/login', login);
usersRoutes.post('/login-with-token', loginWithToken);
