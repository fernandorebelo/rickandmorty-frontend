import React, { useState, useEffect } from 'react'
import './App.css'
import logo from './assets/header-rickandmorty.png'
import Card from './componentes/Card'
import PaginationButtons from './componentes/PaginationButtons'
import Modal from 'react-modal'
import ModalPage from './componentes/ModalPage'

Modal.setAppElement('#root')

function App() {
  const [inputValue, setInputValue] = useState('')
  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [initialSearchPerformed, setInitialSearchPerformed] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  const openModal = characterInfo => {
    setSelectedCharacter(characterInfo)
    console.log(characterInfo)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

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
    fetch(`http://127.0.0.1:5000/character?name=${inputValue}&page=1`) // Fetch the first page for the initial search
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

  const fetchPaginationData = (_, pageNumber) => {
    setIsLoading(true)
    fetch(
      `http://127.0.0.1:5000/character?name=${encodeURIComponent(
        inputValue
      )}&page=${encodeURIComponent(pageNumber || 1)}`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setCharacters(data.results)
        setCurrentPage(pageNumber || 1)
        setTotalPages(data.total_pages)
        setIsLoading(false)
        console.log('Actual page:', data.page)
        console.log('Total pages: ', data.total_pages)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (initialSearchPerformed) {
      window.scrollTo(0, document.body.scrollHeight)
    }
  }, [characters, initialSearchPerformed])

  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="" />
      </div>

      {/*Form input text and submit*/}
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

      {/*Modal page*/}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          selectedCharacter && (
            <ModalPage
              key={selectedCharacter.id}
              image={selectedCharacter.image}
              name={selectedCharacter.name}
              species={selectedCharacter.species}
              status={selectedCharacter.status}
              gender={selectedCharacter.gender}
              location={selectedCharacter.location}
              origin={selectedCharacter.origin}
              close={closeModal}
            />
          )
        )}
      </Modal>

      {/*Cards pagination*/}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="pagination">
          {characters.map(characters => (
            <Card
              key={characters.id}
              id={characters.id}
              image={characters.image}
              name={characters.name}
              species={characters.species}
              status={characters.status}
              gender={characters.gender}
              location={characters.location_name}
              origin={characters.origin_name}
              onClick={openModal}
            />
          ))}
        </div>
      )}

      {/*Pagination buttons*/}
      {characters.length > 0 && (
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
          fetchPaginationData={fetchPaginationData}
        />
      )}
    </div>
  )
}

export default App
