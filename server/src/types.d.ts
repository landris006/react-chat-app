type eventHandler = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => void;

interface Message {
  _id: string;
  content: string;
  from: string;
  to: string;
  createdAt: string;
}

interface User {
  _id: string;
  username: string;
  password: string;
  createdAt: string;
}

interface TypedRequestBody<T> extends Express.Request {
  body: T;
}
