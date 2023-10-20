import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCrv2oQFL5vyWeggtF5WKhHP_PTTKRQJSA',
  authDomain: 'rickandmorty-3d572.firebaseapp.com',
  projectId: 'rickandmorty-3d572',
  storageBucket: 'rickandmorty-3d572.appspot.com',
  messagingSenderId: '145580626227',
  appId: '1:145580626227:web:825b2d7288436349c96e46',
  measurementId: 'G-ST5H2PPLVX'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
