import React from 'react'
import '../componentes/PaginationButton.css'
import vector from '../assets/Vector 2.svg'

function PaginationButtons({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  fetchPaginationData
}) {
  const getPageNumbers = () => {
    const limit = 6
    const pageNumbers = []
    let startPage = Math.max(1, currentPage - Math.floor(limit / 2))
    let endPage = Math.min(totalPages, startPage + limit - 1)

    if (totalPages > limit) {
      if (endPage === totalPages) {
        startPage = Math.max(1, totalPages - limit + 1)
      } else if (startPage === 1) {
        endPage = limit
      } else {
        pageNumbers.push('...')
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    if (totalPages > limit && endPage < totalPages) {
      if (totalPages - endPage === 1) {
        pageNumbers.push(endPage + 1)
      } else {
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      }
    }
    return pageNumbers
  }
  return (
    <div className="pagination-buttons">
      <button
        className="font-face-nunito"
        onClick={() => fetchPaginationData(null, currentPage - 1)}
        disabled={currentPage === 1}
        id="previous-button"
      >
        <img src={vector} alt="" />
      </button>
      {getPageNumbers().map((number, index) => {
        const className =
          number === currentPage ? 'buttonFooter selected' : 'buttonFooter'
        return (
          <button
            className={className}
            key={index}
            onClick={() => {
              if (typeof number === 'number') {
                fetchPaginationData(null, number)
              }
            }}
          >
            {number}
          </button>
        )
      })}
      <button
        className="font-face-nunito"
        onClick={() => fetchPaginationData(null, currentPage + 1)}
        disabled={currentPage === totalPages}
        id="next-button"
      >
        <img src={vector} alt="" />
      </button>
    </div>
  )
}

export default PaginationButtons
