import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { conversationHandler } from './handlers/conversationHandler';
import bodyParser from 'body-parser';
import { usersRoutes } from './routes/users';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { conversationRoutes } from './routes/conversation';
import { init } from './handlers/init';

dotenv.config();
const PORT = process.env.PORT ?? 5000;
const CONNECTION_STRING = process.env.CONNECTION_STRING ?? '';
const CLIENT_ADDRESS = process.env.CLIENT_ADDRESS ?? 'http://localhost:3000';

const corsOptions = {
  origin: CLIENT_ADDRESS,
  methods: ['GET', 'POST', 'DELETE'],
};

const app = express();

app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors(corsOptions));

app.use('/conversation', conversationRoutes);
app.use('/users', usersRoutes);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: corsOptions,
});

io.on('connection', (socket) => {
  console.log(`${socket.id} connected...`);

  init(io, socket);
  conversationHandler(io, socket);

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected...`);
  });
});

mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}...`);
    });
  })
  .catch((error) => console.error(error));
