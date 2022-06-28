import axios from 'axios';
import { Message } from '../types/Message';
import { Room } from '../types/Room';
import { User } from '../types/User';

const url = 'http://localhost:5000/conversation';

export const getMessages = async (roomId: string) => {
  const response = await axios.get<Message[]>(`${url}/get-messages`, {
    params: { roomId },
  });

  return response.data;
};

export const createRoom = async (newRoom: {
  name: string;
  members: User[];
  ownerId: string;
}) => {
  const response = await axios.post<Room>(`${url}/create-room`, newRoom);

  return response.data;
};

export const getRooms = async (userId: string) => {
  const response = await axios.get<Room[]>(`${url}/get-rooms`, {
    params: { userId },
  });

  return response.data;
};

export const deleteRoom = async (roomId: string) => {
  const response = await axios.delete<Room>(`${url}/delete-room`, {
    params: { roomId },
  });

  return response.data;
};
