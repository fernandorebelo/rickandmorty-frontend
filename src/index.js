import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import './assets/fonts/static/Nunito-Regular.ttf'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './componentes/Auth/Auth'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<App />} />
    </Routes>
  </Router>
)
