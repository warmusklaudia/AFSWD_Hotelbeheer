import { FirebaseApp, initializeApp } from 'firebase/app'
import {
  Auth,
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth'

export default () => {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  }

  // Initialize Firebase
  const app: FirebaseApp = initializeApp(firebaseConfig)
  const auth: Auth = getAuth(app)
  setPersistence(auth, browserSessionPersistence)

  return { app, auth }
}
