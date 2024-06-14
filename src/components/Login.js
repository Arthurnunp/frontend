// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin }) => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/usuarios/login', { nomeUsuario, senha })
      .then(response => {
        if (response.data) {
          onLogin(response.data);
          window.location.href = '/';
        } else {
          alert('Credenciais inválidas');
        }
      })
      .catch(error => console.error('Error logging in:', error));
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Nome de usuário"
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <button className="login-button" type="submit">Entrar</button>
        <div className="login-links">
          <a href="/register">Criar conta</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
