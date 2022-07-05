import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import Conversation from '../components/Conversation/Conversation';
import Rooms from '../components/Rooms/Rooms';
import { useAppSelector } from '../hooks';

interface Props {
  socket: Socket;
}

const Home = ({ socket }: Props) => {
  const currentUserId = useAppSelector(({ users }) => users?.currentUser?._id);

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
