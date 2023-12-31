import React, { useState } from 'react'
import './Auth.css'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { auth } from './firebase-config'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerFirstName, setRegisterFirstName] = useState('')
  const [registerLastName, setRegisterLastName] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registrationError, setRegistrationError] = useState(null) // State for registration error
  const [loginError, setLoginError] = useState(null)
  const [showRegistrationError, setShowRegistrationError] = useState(false)
  const [showLoginError, setShowLoginError] = useState(false)
  const [userData, setUserData] = useState(null)

  const navigate = useNavigate()

  const closeRegistrationError = () => {
    setShowRegistrationError(false)
    setRegistrationError(null)
  }

  const closeLoginError = () => {
    setShowLoginError(false)
    setLoginError(null)
  }

  const login = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        console.log(user.uid)

        axios
          .get(
            `https://rickandmorty-backend-rtvb.onrender.com/auth/user?uid=${user.uid}`
          )
          .then(response => {
            const userDatabase = response.data.data.result
            setUserData(userDatabase) // Store the user data in state
            localStorage.setItem('user', JSON.stringify(userDatabase))
          })
          .catch(error => {
            // Handle Axios GET request error
            console.error(error)
          })
        console.log(userData)
        navigate('/', { state: { userData } })
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message

        console.log(errorCode)
        console.log(errorMessage)

        if (errorCode === 'auth/invalid-email') {
          setLoginError('This account does not exists.')
          setShowLoginError(true)
        } else {
          setLoginError(errorMessage)
          setShowLoginError(true)
        }
      })
  }

  const register = e => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user
        console.log(user)

        const data = {
          uid: user.uid,
          first_name: registerFirstName,
          last_name: registerLastName,
          email: registerEmail
        }

        axios
          .post(
            'https://rickandmorty-backend-rtvb.onrender.com/auth/register',
            data
          )
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.error(error)
          })

        navigate('/')
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode)
        console.log(errorMessage)

        if (errorCode === 'auth/email-already-in-use') {
          setRegistrationError(
            'Email is already in use. Please use a different email.'
          )
          setShowRegistrationError(true)
        } else {
          setRegistrationError(errorMessage)
          setShowRegistrationError(true)
        }
      })
  }

  return (
    <div className="container-login">
      <form method="post" className="form">
        <h1>Login</h1>
        <div>
          <input
            type="email"
            name="email"
            required
            onChange={event => {
              setLoginEmail(event.target.value)
            }}
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div>
          <input
            type="password"
            name="password"
            required
            onChange={event => {
              setLoginPassword(event.target.value)
            }}
          />
          <label htmlFor="password">Password</label>
        </div>
        <button name="login" required onClick={login}>
          Login
        </button>
      </form>
      <form method="post" className="form">
        <h1>Create account</h1>
        <div>
          <input
            type="text"
            name="first_name"
            required
            onChange={event => {
              setRegisterFirstName(event.target.value)
            }}
          />
          <label htmlFor="first_name">First name</label>
        </div>
        <div>
          <input
            type="text"
            name="last_name"
            required
            onChange={event => {
              setRegisterLastName(event.target.value)
            }}
          />
          <label htmlFor="last_name">Last name</label>
        </div>
        <div>
          <input
            type="email"
            name="email"
            required
            onChange={event => {
              setRegisterEmail(event.target.value)
            }}
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div>
          <input
            type="password"
            name="password"
            required
            onChange={event => {
              setRegisterPassword(event.target.value)
            }}
          />
          <label htmlFor="password">Password</label>
        </div>
        <button name="create_account" required onClick={register}>
          Register
        </button>
      </form>
      {/* Display error messages as pop-ups with close buttons */}
      {showRegistrationError && (
        <div className="error-popup">
          {registrationError}
          <button className="close-button" onClick={closeRegistrationError}>
            X
          </button>
        </div>
      )}
      {showLoginError && (
        <div className="error-popup">
          {loginError}
          <button className="close-button" onClick={closeLoginError}>
            X
          </button>
        </div>
      )}
    </div>
  )
}

export default Login
