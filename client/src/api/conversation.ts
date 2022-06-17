import axios from 'axios';
import { Message } from '../types/Message';
import { Room } from '../types/Room';
import { User } from '../types/User';

const url = 'http://localhost:5000/conversation';

export const getMessages = async () => {
  const response = await axios.get<Message[]>(`${url}/get-messages`);

  return response.data;
};

export const createRoom = async (newRoom: {
  name: string;
  members: User[];
}) => {
  const response = await axios.post<Room>(`${url}/create-room`);

  return response.data;
};
