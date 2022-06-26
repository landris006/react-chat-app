import { Socket } from 'socket.io-client';
import Conversation from '../components/Conversation/Conversation';
import Rooms from '../components/Rooms/Rooms';

interface Props {
  socket: Socket;
}

const Home = ({ socket }: Props) => {
  return (
    <div className="wrapper">
      <Rooms />
      <Conversation socket={socket} />
      <div style={{ flexGrow: '1' }}></div>
    </div>
  );
};

export default Home;
