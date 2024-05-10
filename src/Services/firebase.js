// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import SignUserOut from "./SignUserOut";
import addTodoToDB from "./addTodo";
import getTodos from "./getTodos";
import deleteTodo from "./deleteTodo";
import updateTodo from "./updateTodo";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7jtPLUhGKzhGc4waNlt1qZYXbDxpKKLU",
  authDomain: "todoauthapp-69960.firebaseapp.com",
  databaseURL: "https://todoauthapp-69960-default-rtdb.firebaseio.com/",
  projectId: "todoauthapp-69960",
  storageBucket: "todoauthapp-69960.appspot.com",
  messagingSenderId: "4003613422",
  appId: "1:4003613422:web:9a1eabff847f2c45aa81ff"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

export  { db, auth , addTodoToDB , SignUserOut , getTodos ,deleteTodo ,updateTodo}; // Exporting db and auth objects
