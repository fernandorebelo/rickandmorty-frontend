import React, { useState, useEffect } from 'react'
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
  const [initialSearchPerformed, setInitialSearchPerformed] = useState(false)

  const handleInputChange = e => {
    setInputValue(e.target.value)
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    fetchInitialData()
  }

  const handlePageChange = pageNumber => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  const handlePreviousPage = e => {
    handlePageChange(currentPage - 1)
    fetchPaginationData(currentPage - 1)
    setInitialSearchPerformed(true) // Mark the initial search as performed
  }

  const handleNextPage = e => {
    handlePageChange(currentPage + 1)
    fetchPaginationData(currentPage + 1)
    setInitialSearchPerformed(true) // Mark the initial search as performed
  }

  const fetchInitialData = () => {
    setIsLoading(true)
    fetch(`http://127.0.0.1:5000/character?name=${inputValue}&page=1`) // Always fetch the first page for the initial search
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

  const fetchPaginationData = pageNumber => {
    setIsLoading(true)
    fetch(
      `http://127.0.0.1:5000/character?name=${inputValue}&page=${pageNumber}`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setCharacters(data.results)
        setCurrentPage(data.page)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    // Scroll to the bottom only after the initial search is performed
    if (initialSearchPerformed) {
      window.scrollTo(0, document.body.scrollHeight)
    }
  }, [characters, initialSearchPerformed]) // Run this effect whenever 'characters' or 'initialSearchPerformed' state changes

  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="" />
      </div>

      <div className="container-form">
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
              key={characters.id}
              image={characters.image}
              name={characters.name}
              species={characters.species}
            />
          ))}
        </div>
      )}
      {characters.length > 0 && ( // Conditionally render PaginationButtons when characters exist
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
        />
      )}
    </div>
  )
}

export default App
