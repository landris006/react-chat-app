interface Message {
  _id?: string;
  content: string;
  from: string;
  to: string;
  createdAt?: string;
}

interface User {
  _id: string;
  name: string;
  createdAt: string;
}
