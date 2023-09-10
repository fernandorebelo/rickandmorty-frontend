import React from 'react'
import LoadingImage from '../assets/loading.png'
import './Loading.css'

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-image">
        <img src={LoadingImage} alt="Loading" />
      </div>
      <div className="loading-text">
        {/* <p className="font-face-nunito">Loading...</p> */}
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Loading
