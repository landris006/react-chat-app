import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { conversationHandler } from './handlers/conversationHandler';
import bodyParser from 'body-parser';
import { usersRoutes } from './routes/users';
import mongoose from 'mongoose';
import { conversationRoutes } from './routes/conversation';
import { init } from './handlers/init';
import { PORT, CONNECTION_STRING, CLIENT_ADDRESS } from './env';
import { verifyToken } from './middleware/auth';
import { verifySocketToken } from './middleware/socketAuth';

const corsOptions = {
  origin: CLIENT_ADDRESS,
  methods: ['GET', 'POST', 'DELETE'],
};

const app = express();

app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors(corsOptions));

app.use('/conversation', verifyToken, conversationRoutes);
app.use('/users', usersRoutes);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: corsOptions,
});

io.use(verifySocketToken);

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
