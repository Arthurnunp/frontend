import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './RestauranteDetails.css';

import phone from '../assets/viber_152851.png'
import clock from '../assets/clock_86093.png'

const RestauranteDetails = ({ user }) => {
  const { id } = useParams();
  const [restaurante, setRestaurante] = useState(null);
  const [avaliacao, setAvaliacao] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/restaurantes/${id}`)
      .then(response => setRestaurante(response.data))
      .catch(error => console.error('Error fetching restaurante details:', error));
  }, [id]);

  const handleStarClick = (value) => {
    setAvaliacao(value);
  };

  const handleChangeReview = (event) => {
    if (event.target.value.length <= 130) {
      setReviewText(event.target.value);
    }
  };

  const handleSubmitReview = () => {
    setModalOpen(true); // Abre o modal ao enviar a avaliação
  };

  const closeModal = () => {
    setModalOpen(false); // Fecha o modal
  };


  if (!restaurante) return <div>Carregando...</div>;

  return (
    <div className="restaurante-details">
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Avaliação será analisada por nossa equipe</h2>
            <h3>Detalhes da sua avaliação:</h3>
            <p>Avaliação: {6 - avaliacao} estrela(s)</p>
            <p>Texto da avaliação: {reviewText}</p>
            <button onClick={closeModal}>x</button>
          </div>
        </div>
      )}


      <header className='headerDetails'>
        <h2>{restaurante.nome}</h2>
        <p className='headerName'><img style={{width:"5%", marginRight:'8px'}} src={phone}/> {restaurante.telefone}</p>
        <p className='headerName'><img style={{width:"5%", marginRight:'8px'}} src={clock}/>{restaurante.horario}</p>
      </header>
      
      <div className='containerFotos'>
        <img className='fotoPrincipal' src={restaurante.foto} alt="Foto Principal"/>
        <div className='fotos'>
          <img className='fotoSecundaria' src={restaurante.foto1} alt="Foto 1"/>
          <img className='fotoSecundaria' src={restaurante.foto2} alt="Foto 2"/>
          <img className='fotoSecundaria' src={restaurante.foto3} alt="Foto 3"/>
          <img className='fotoSecundaria' src={restaurante.foto4} alt="Foto 4"/>
        </div>
      </div>
      
      <div className='containerDetails'>
        <div className='avaliacao'>
          <h3 style={{margin:"0"}}> Avaliações Recentes <p className='totalA'>Total de avaliações: {restaurante.qtdAvaliacao}</p></h3>

          <div className='containerFoto'>
            <img className="fotoPerfil" src={restaurante.fotoAvaliador} alt="Foto Avaliador" style={{ width: '80px', height: '80px', borderRadius: '360px' }}/> 
            
            <div className='textReview'>
              <h4 style={{margin:"0"}}>{restaurante.nomeAvaliador}</h4>
              <p>Nota: {Array.from({ length: parseInt(restaurante.estrelasAvaliacao, 10) }, () => '⭐️').join('')} <br/>
              {restaurante.avaliacao}
              </p> 
            </div>
          </div>
        </div>

        <div className='newReviewContainer'>
        {user ? (
          <div className="user-menu">
            <h3 style={{margin:"0"}}>{user.nomeUsuario}:</h3>
            
          </div>
        ) : (
          <h3 style={{margin:"0"}}>Anônimo:</h3>
        )}
          <div className="star-rating">
            {[...Array(5)].map((star, index) => {
              const starValue = index + 1;
              return (
                <span
                  key={index}
                  className={starValue <= avaliacao ? 'star golden' : 'star'}
                  onClick={() => handleStarClick(starValue)}
                >
                  &#9733;
                </span>
              );
            })}
          </div>
          <textarea
            className='newReview'
            value={reviewText}
            onChange={handleChangeReview}
            maxLength={100}
          ></textarea>
          <p className='subtitle'>Caracteres restantes: {100 - reviewText.length}</p>
          <button className="submitReview" onClick={handleSubmitReview}>Enviar</button>
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
