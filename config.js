import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "********************",
  authDomain: "halisahauygulamasi-369015.firebaseapp.com",
  projectId: "halisahauygulamasi-369015",
  storageBucket: "halisahauygulamasi-369015.appspot.com",
  messagingSenderId: "659254773155",
  appId: "1:659254773155:web:e296b9a9e56e2ac559c616",
  measurementId: "G-RR1BCL8VKL"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);
