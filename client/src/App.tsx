import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import Header from './pages/Header/Header';
import Home from './pages/Home';
import Authentication from './pages/Authentication/Authentication';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authentication" element={<Authentication />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
