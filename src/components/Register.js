// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem');
      return;
    }
    axios.post('http://localhost:8080/api/usuarios/register', { nomeUsuario, email, senha })
      .then(response => {
        alert('Conta criada com sucesso');
        window.location.href = '/login';
      })
      .catch(error => console.error('Error registering:', error));
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Criar Conta</h2>
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="input-group">
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
        </div>
        <button className="register-button" type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
