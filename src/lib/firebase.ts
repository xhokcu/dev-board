// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  browserSessionPersistence,
  setPersistence,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC-t01r0v-b4Z86Rgt5FnEhlG6Qm1LpG0o',
  authDomain: 'devboard-1d613.firebaseapp.com',
  projectId: 'devboard-1d613',
  storageBucket: 'devboard-1d613.firebasestorage.app',
  messagingSenderId: '63040396742',
  appId: '1:63040396742:web:04b2679439fa7ed53aa6c7',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

setPersistence(auth, browserSessionPersistence)
