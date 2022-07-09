import { useEffect } from 'react';
import { io } from 'socket.io-client';
import Conversation from '../components/Conversation/Conversation';
import Rooms from '../components/Rooms/Rooms';
import { useAppSelector } from '../hooks';

const Home = () => {
  const currentUserId = useAppSelector(({ users }) => users?.currentUser?._id);
  const token = localStorage.getItem('token');

  const socket = io('http://localhost:5000', {
    auth: { token: `Bearer ${token}` },
  });

  useEffect(() => {
    socket.emit('joinRooms', currentUserId);
  }, [currentUserId, socket]);

  return (
    <div className="wrapper">
      <Rooms />
      <Conversation socket={socket} />
      <div style={{ flexGrow: '1' }}></div>
    </div>
  );
};

export default Home;
