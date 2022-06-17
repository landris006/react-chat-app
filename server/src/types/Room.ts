interface Room {
  _id: string;
  name: string;
  members: User[];
  lastMessage?: Message;
}
