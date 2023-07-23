import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
import logo from './assets/header-rickandmorty.png'
import Card from './componentes/Card'
import PaginationButtons from './componentes/PaginationButtons'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handleInputChange = e => {
    setInputValue(e.target.value)
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    fetchData()
  }

  const handlePageChange = pageNumber => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  const fetchData = () => {
    setIsLoading(true)
    fetch(`http://127.0.0.1:5000/character?name=${inputValue}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setCharacters(data.results)
        setCurrentPage(data.page)
        setTotalPages(data.total_pages)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setIsLoading(false)
      })
  }

  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="input-button">
        <form onSubmit={handleFormSubmit} className="form">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search characters"
            className="font-face-nunito"
          />
          <button type="submit" className="font-face-nunito">
            Search
          </button>
        </form>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="pagination">
          {characters.map(characters => (
            <Card
              image={characters.image}
              name={characters.name}
              species={characters.species}
            />
          ))}
          <div className="pagination-buttons">
            <button
              onClick={() => handlePageChange({ currentPage } - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {Array.from({ length: { totalPages } }, (_, i) => i + 1).map(
              pageNumber => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={pageNumber === currentPage ? 'active' : ''}
                >
                  {pageNumber}
                </button>
              )
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === { totalPages }}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
