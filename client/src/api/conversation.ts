import axios from 'axios';
import { Message } from '../types/Message';
import { Room } from '../types/Room';
import { User } from '../types/User';

const token = localStorage.getItem('token')!;
const instance = axios.create({
  baseURL: 'https://epic-react-chat-server.herokuapp.com/conversation',
  withCredentials: true,
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export const getMessages = async (roomId: string) => {
  const response = await instance.get<Message[]>('/get-messages', {
    params: { roomId },
  });

  return response.data;
};

export const createRoom = async (newRoom: {
  name: string;
  members: string[];
  ownerId: string;
}) => {
  const response = await instance.post<Room>('/create-room', newRoom);

  return response.data;
};

export const getRooms = async (userId: string) => {
  const response = await instance.get<Room[]>('/get-rooms', {
    params: { userId },
  });

  return response.data;
};

export const deleteRoom = async (roomId: string) => {
  const response = await instance.delete<Room>('/delete-room', {
    params: { roomId },
  });

  return response.data;
};

export const getAllUsers = async () => {
  const res = await instance.get<User[]>('/get-all-users');
  return res.data;
};
