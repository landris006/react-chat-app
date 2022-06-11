import React from 'react';
import { useNavigate } from 'react-router-dom';
import Conversation from '../components/Conversation/Conversation';
import { useAppSelector } from '../hooks';

const Home = () => {
  return (
    <div className="wrapper">
      <Conversation />
    </div>
  );
};

export default Home;
