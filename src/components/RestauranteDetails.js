// src/components/RestauranteDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './RestauranteDetails.css';

const RestauranteDetails = () => {
  const { id } = useParams();
  const [restaurante, setRestaurante] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/restaurantes/${id}`)
      .then(response => setRestaurante(response.data))
      .catch(error => console.error('Error fetching restaurante details:', error));
  }, [id]);

  if (!restaurante) return <div>Carregando...</div>;

  return (
    <div className="restaurante-details">
      <h2>{restaurante.nome}</h2>
      <p>{restaurante.estrelas} estrelas</p>
      <p>{restaurante.faixaPreco}</p>
      <p>{restaurante.detalhes}</p>
      {/* Adicione aqui outras informações como fotos, avaliações, localização e telefone */}
    </div>
  );
};

export default RestauranteDetails;
