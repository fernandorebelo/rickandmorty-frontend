import React from 'react'
import './ModalPage.css'

const ModalPage = ({ id, image, name, species }) => {
  return (
    <div className="modal">
      <ul>
        <li>
          <img src={image} alt="" />
        </li>
        <li>{name}</li>
        <li>{species}</li>
      </ul>
    </div>
  )
}

export default ModalPage
