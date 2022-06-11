interface Message {
  _id?: string;
  content: string;
  from: string;
  to: string;
  createdAt?: string;
}

interface User {
  _id: string;
  username: string;
  password: string;
  createdAt: string;
}
