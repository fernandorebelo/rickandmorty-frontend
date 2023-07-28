import React from 'react'
import './ModalPage.css'

const ModalPage = ({
  id,
  image,
  name,
  species,
  status,
  gender,
  location,
  origin,
  close
}) => {
  return (
    <div className="modal-overlay">
      <div className="container-modal">
        <div className="imagem-blur">
          <img src={image} alt={name} />
        </div>
        <div className="modal-close-button">
          <button onClick={close}>Fechar</button>
        </div>
        <div className="modal-card">
          <img src={image} alt={name} />
          <div className="modal-card-description">
            <p className="modal-card-name">{name}</p>
            <p className="modal-card-species">{species}</p>
          </div>
        </div>
        <div className="container-info">
          <div className="container-info-text">
            <p className="modal-title">ABOUT</p>
            <p className="modal-text">
              {name} is a {gender === 'unknow' || '' ? gender : ''} {species}.
              He is {status} and {status === 'Alive' ? 'well' : 'not so well'}.
            </p>
            <div className="modal-space"></div>
            <p className="modal-title">ORIGIN</p>
            <p className="modal-subtitle">Planet</p>
            <p className="modal-text-big">{origin}</p>
            <div className="modal-space"></div>
            <p className="modal-title">LOCATION</p>
            <p className="modal-subtitle">Planet</p>
            <p className="modal-text-big">{location}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalPage
