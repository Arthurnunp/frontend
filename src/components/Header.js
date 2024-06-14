import React from 'react';
import './Header.css';
import logo from '../assets/dineup-logo.png';
import pin from '../assets/location-icon.png';

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="nameContainer">
        <img className="logo" src={logo} alt="DineUp Logo" />
        <h1>DineUp</h1>
      </div>
      <div className="locationContainer">
        <img className="pin" src={pin} alt="Location Pin" />
        <div className="location">Uberlândia-MG</div>
      </div>
      <div className="account">
        {user ? (
          <div className="user-menu">
            <span>{user.nomeUsuario}</span>
            <button className="logout-button" onClick={onLogout}>SAIR</button>
          </div>
        ) : (
          <a href="/login">Conta</a>
        )}
      </div>
    </header>
  );
};

export default Header;