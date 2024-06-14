// src/components/Header.js
import React from 'react';
import './Header.css';

const Header = ({ user }) => {
  return (
    <header className="header">
      <h1>DineUp</h1>
      <div className="location">Uberlândia-MG</div>
      <div className="account">
        {user ? <span>{user.nomeUsuario}</span> : <a href="/login">Conta</a>}
      </div>
    </header>
  );
};

export default Header;
