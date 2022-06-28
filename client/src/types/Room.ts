import { User } from './User';
import { Message } from './Message';

export interface Room {
  _id: string;
  name: string;
  members: User[];
  ownerId: string;
  lastMessage?: Message;
}
