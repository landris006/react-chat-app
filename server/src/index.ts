import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { messageHandler } from './handlers/messageHandler';
import bodyParser from 'body-parser';
import { userRoutes } from './routes/user';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { messagesRoutes } from './routes/messages';

dotenv.config();
const PORT = process.env.PORT ?? 5000;
const CONNECTION_STRING = process.env.CONNECTION_STRING ?? '';
const app = express();

app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/messages', messagesRoutes);
app.use('/user', userRoutes);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  messageHandler(io, socket);
});

mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    httpServer.listen(PORT, () =>
      console.log(`Server listening on port ${PORT}...`)
    );
  })
  .catch((error) => console.log(error));
