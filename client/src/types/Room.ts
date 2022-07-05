import { User } from './User';

export interface Room {
  _id: string;
  name: string;
  members: User[];
  ownerId: string;
}
