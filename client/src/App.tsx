import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.scss';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Auth from './pages/Auth/Auth';
import { useAppSelector } from './hooks';
import { io } from 'socket.io-client';
import Profile from './pages/Profile';

function App() {
  const isLoggedIn = useAppSelector(({ users }) => users.currentUser) !== null;

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/everyone" />} />
        <Route
          path="/:roomId"
          element={isLoggedIn ? <Home /> : <Navigate to="/authentication" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/authentication" />}
        />
        <Route path="/authentication" element={<Auth />} />
        {/* <Route path="*" element={<Navigate to="/everyone" />} /> TODO: 404 path */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
