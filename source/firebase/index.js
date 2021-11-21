import {initializeApp } from "firebase/app";
import {getStorage } from "firebase/storage";
import {getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCs-E8-DbaXcUgCfzjYuH8DWiu05MYnij8",
    authDomain: "t-bot-92db1.firebaseapp.com",
    projectId: "t-bot-92db1",
    storageBucket: "t-bot-92db1.appspot.com",
    messagingSenderId: "336066287358",
    appId: "1:336066287358:web:d5e62fc09ca9c59d6ef7af",
    measurementId: "G-M7303N4HW3"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export const db = getFirestore();
