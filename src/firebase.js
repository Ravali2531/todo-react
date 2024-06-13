// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAY2ok0s_PZvRyeVgRV17xaN5YXySy69_c",
    authDomain: "todo-list-7b31e.firebaseapp.com",
    projectId: "todo-list-7b31e",
    storageBucket: "todo-list-7b31e.appspot.com",
    messagingSenderId: "1042496832888",
    appId: "1:1042496832888:web:9838a926e77348b538f48d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export {database};