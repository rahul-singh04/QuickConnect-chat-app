// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2Zvgi4NOlhwEkp2G5hFvSyA-qvEV13Xo",
  authDomain: "quickconnect-c32b5.firebaseapp.com",
  projectId: "quickconnect-c32b5",
  storageBucket: "quickconnect-c32b5.appspot.com",
  messagingSenderId: "603361916562",
  appId: "1:603361916562:web:a15be12baa6556065e584b"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
export const auth =getAuth()
export const storage = getStorage();
export const db = getFirestore();