import { useEffect } from 'react';
import { io } from 'socket.io-client';
import Conversation from '../components/Conversation/Conversation';
import Rooms from '../components/Rooms/Rooms';
import { useErrorMessage } from '../hooks';

const Home = () => {
  const token = localStorage.getItem('token');
  const { sendError } = useErrorMessage();
  // TODO: FE environment variable
  const socket = io('https://epic-react-chat-server.herokuapp.com', {
    auth: { token: `Bearer ${token}` },
    transports: ['websocket'],
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
