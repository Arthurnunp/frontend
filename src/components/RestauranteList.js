// src/components/RestauranteList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RestauranteList.css';

const RestauranteList = ({ filter }) => {
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/restaurantes')
      .then(response => setRestaurantes(response.data))
      .catch(error => console.error('Error fetching restaurantes:', error));
  }, []);

  const filteredRestaurantes = filter
    ? restaurantes.filter(restaurante => restaurante.estrelas === parseInt(filter))
    : restaurantes;

  return (
    <div className="restaurante-list">
      {filteredRestaurantes.map(restaurante => (
        <div key={restaurante.id} className="restaurante">
          <h3>{restaurante.nome}</h3>
          <p>{restaurante.estrelas} estrelas</p>
          <p>{restaurante.faixaPreco}</p>
          <button onClick={() => window.location.href = `/restaurantes/${restaurante.id}`}>Ver Detalhes</button>
        </div>
      ))}
    </div>
  );
};

export default RestauranteList;
