export interface newMessage {
  content: string;
  senderUsername: string;
  senderId: string;
  receiverId: string;
}

export interface Message extends newMessage {
  _id: string;
  createdAt: string;
}
