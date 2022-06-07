import React from 'react';
import './index.scss';
import Header from './components/Header/Header';
import Conversation from './components/Conversation/Conversation';

function App() {
  return (
    <>
      <Header />
      <div className="wrapper">
        <Conversation />
      </div>
    </>
  );
}

export default App;
