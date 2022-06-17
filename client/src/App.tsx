import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.scss';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Auth from './pages/Auth/Auth';
import { useAppSelector } from './hooks';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const isLoggedIn = useAppSelector(({ users }) => users.currentUser) !== null;

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Home socket={socket} />
            ) : (
              <Navigate to="/authentication" />
            )
          }
        />
        <Route path="/authentication" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
