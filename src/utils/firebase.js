
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeUFcTCRK4MZDg3RAqVDEY8Zjnd4jHwUM",
  authDomain: "netflixgpt-films.firebaseapp.com",
  projectId: "netflixgpt-films",
  storageBucket: "netflixgpt-films.firebasestorage.app",
  messagingSenderId: "568283293168",
  appId: "1:568283293168:web:9668d914d71e7a9da12935",
  measurementId: "G-MXYPZFV3XG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);