// 'use client'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcVSdMQGFxgaBIiJwvfmL5EIbEnUb0tJo",
  authDomain: "next-js-chat-app-33c2b.firebaseapp.com",
  projectId: "next-js-chat-app-33c2b",
  storageBucket: "next-js-chat-app-33c2b.appspot.com",
  messagingSenderId: "269077837950",
  appId: "1:269077837950:web:aa04484eb3107351d2c02f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const firebaseAuth = getAuth(app);
export const storage = getStorage(app)
export const auth = getAuth(app);