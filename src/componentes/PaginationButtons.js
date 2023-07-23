import React from 'react'
import '../componentes/PaginationButton.css'
import App from '../App'

const PaginationButtons = ({ currentPage, totalPages }) => {
  return (
    <div className="pagination-buttons">
      <button
        onClick={() => App.handlePageChange({ currentPage } - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {Array.from({ length: { totalPages } }, (_, i) => i + 1).map(
        pageNumber => (
          <button
            key={pageNumber}
            onClick={() => App.handlePageChange(pageNumber)}
            className={pageNumber === currentPage ? 'active' : ''}
          >
            {pageNumber}
          </button>
        )
      )}
      <button
        onClick={() => App.handlePageChange(currentPage + 1)}
        disabled={currentPage === { totalPages }}
      >
        &gt;
      </button>
    </div>
  )
}

export default PaginationButtons
