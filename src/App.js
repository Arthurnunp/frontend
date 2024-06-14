import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RestauranteList from './components/RestauranteList';
import RestauranteDetails from './components/RestauranteDetails';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

const App = () => {
  const [filter, setFilter] = useState(null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Header user={user} onLogout={handleLogout} />
      <div className="main">
        <Sidebar onFilter={handleFilterChange} />
        <Routes>
          <Route path="/" element={<RestauranteList filter={filter} />} />
          <Route path="/restaurantes/:id" element={<RestauranteDetails user={user}/>} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;