import React from 'react'
import '../componentes/PaginationButton.css'
import vector from '../assets/Vector 2.svg'

function PaginationButtons({ currentPage, totalPages, onPrevious, onNext }) {
  return (
    <div className="pagination-buttons">
      <button
        className="font-face-nunito"
        onClick={onPrevious}
        disabled={currentPage === 1}
        id="previous-button"
      >
        <img src={vector} alt="" />
      </button>
      <button
        className="font-face-nunito"
        onClick={onNext}
        disabled={currentPage === totalPages}
        id="next-button"
      >
        <img src={vector} alt="" />
      </button>
    </div>
  )
}

export default PaginationButtons
