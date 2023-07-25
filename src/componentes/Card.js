import React from 'react'
import '../componentes/Card.css'

const Card = ({ id, image, name, species }) => {
  return (
    <div className="card">
      <img src={image} alt={name} />
      <div className="card-description">
        <p className="name">{name}</p>
        <p className="species">{species}</p>
      </div>
    </div>
  )
}

export default Card
