import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Auth from './pages/Auth/Auth';
import Notifications from './components/Notifications/Notifications';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Notifications />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authentication" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
