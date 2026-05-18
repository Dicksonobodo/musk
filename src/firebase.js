import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAblU_cPJzJin_SUP_tIJePuJ-EkW9SUbU",
  authDomain: "musk-verse.firebaseapp.com",
  projectId: "musk-verse",
  storageBucket: "musk-verse.firebasestorage.app",
  messagingSenderId: "607440790229",
  appId: "1:607440790229:web:1ee3c1f7f4937d210e385c"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)