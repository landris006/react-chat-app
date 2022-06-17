import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import Conversation from '../components/Conversation/Conversation';
import Rooms from '../components/Rooms/Rooms';
import { useAppSelector } from '../hooks';

const Home = ({ socket }: { socket: Socket }) => {
  return (
    <div className="wrapper">
      <Rooms />
      <Conversation socket={socket} />
      <div style={{ flexGrow: '1' }}></div>
    </div>
  );
};

export default Home;
