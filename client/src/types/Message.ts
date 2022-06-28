export interface newMessage {
  content: string;
  senderUsername: string;
  roomId: string;
  senderId: string;
}

export interface Message extends newMessage {
  _id: string;
  createdAt: string;
}
