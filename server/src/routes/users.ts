import express from 'express';
import { getAllUsers, login, signUp } from '../controllers/users';

export const usersRoutes = express.Router();

usersRoutes.post('/sign-up', signUp);
usersRoutes.post('/login', login);
usersRoutes.get('/get-all', getAllUsers);
