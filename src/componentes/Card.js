import React from 'react'
import '../componentes/Card.css'

const Card = ({
  id,
  image,
  name,
  species,
  status,
  gender,
  location,
  origin,
  onClick
}) => {
  const handleClick = () => {
    onClick({ id, image, name, species, status, gender, location, origin })
  }
  return (
    <div>
      <button className="card" onClick={handleClick}>
        <img src={image} alt={name} />
        <div className="card-description">
          <p className="name">{name}</p>
          <p className="species">{species}</p>
        </div>
      </button>
    </div>
  )
}

export default Card
