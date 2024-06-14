// src/components/RestauranteDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './RestauranteDetails.css';
import phone from '../assets/viber_152851.png';
import clock from "../assets/clock_86093.png";

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
      <header className='headerDetails'>
        <h2>{restaurante.nome}</h2>
        <p className='headerName'><img style={{width:"5%", marginRight:'8px'}} src={phone}/> {restaurante.telefone}</p>
        <p className='headerName'><img width="5%" src={clock}/>{restaurante.horario}</p>
      </header>
      
      <div className='containerFotos'>
        <img className='fotoPrincipal' src={restaurante.foto}/>
        <div className='fotos'>
          <img className='fotoSecundaria' src={restaurante.foto1}/>
          <img className='fotoSecundaria' src={restaurante.foto2}/>
          <img className='fotoSecundaria' src={restaurante.foto3}/>
          <img className='fotoSecundaria' src={restaurante.foto4}/>
        </div>
      </div>
      
      <div className='containerDetails'>
        <div className='avaliacao'>
          <h3>Avaliações Recentes <p className='totalA'>Total de avaliações: {restaurante.qtdAvaliacao}</p></h3>

          <div className='containerFoto'>
            <img className="fotoPerfil" src={restaurante.fotoAvaliador} style={{ width: '80px', height: '80px' , borderRadius: '360px' }}/> 
            
            <div className='textReview'>
             <h4>{restaurante.nomeAvaliador}</h4>
              <p>Nota: {Array.from({ length: parseInt(restaurante.estrelasAvaliacao, 10) }, () => '⭐️').join('')} <br/>
              {restaurante.avaliacao}
              </p> 
            </div>
            
          
          </div>
             
        </div>

            <div className='details'>
              <p>{Array.from({ length: restaurante.estrelas }, () => '⭐️').join('')}</p>
              <p>{restaurante.faixaPreco}</p>
              <p dangerouslySetInnerHTML={{ __html: restaurante.detalhes }}></p>
            </div>
      </div>

      
       
    </div>
  );
};

export default RestauranteDetails;
