interface Message {
  _id?: string;
  content: string;
  senderUsername: string;
  senderId: string;
  receiverId: string;
  createdAt?: string;
}

interface User {
  _id: string;
  username: string;
  password: string;
  createdAt: string;
}
