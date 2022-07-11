import { useEffect } from 'react';
import { io } from 'socket.io-client';
import Conversation from '../components/Conversation/Conversation';
import Rooms from '../components/Rooms/Rooms';
import { useAppSelector, useErrorMessage } from '../hooks';

const Home = () => {
  const token = localStorage.getItem('token');
  const { sendError } = useErrorMessage();

  const socket = io('http://localhost:5000', {
    auth: { token: `Bearer ${token}` },
  });

  useEffect(() => {
    socket.on('error', (error) => {
      sendError(error);
    });

    return () => {
      socket.removeListener('error');
    };
  }, [socket, sendError]);

  return (
    <div className="wrapper">
      <Rooms />
      <Conversation socket={socket} />
      <div style={{ flexGrow: '1' }}></div>
    </div>
  );
};

export default Home;
