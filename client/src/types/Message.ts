interface Message {
  _id?: string;
  content: string;
  senderUsername: string;
  senderId: string;
  receiverId: string;
  createdAt?: string;
}
