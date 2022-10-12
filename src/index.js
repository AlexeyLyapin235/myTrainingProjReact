import React ,{createContext}from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "../src/store/store";
import { Provider } from "react-redux";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import firebase from "firebase/compat/app"

const firebaseConfig = {
  apiKey: "AIzaSyBKjvlXsWzWE2ufINMdc0u2X84Ez_0hnQk",
  authDomain: "mytraningproj.firebaseapp.com",
  databaseURL: "https://mytraningproj-default-rtdb.firebaseio.com",
  projectId: "mytraningproj",
  storageBucket: "mytraningproj.appspot.com",
  messagingSenderId: "1052961056111",
  appId: "1:1052961056111:web:e333dd68b54af31f6e349a",
  measurementId: "G-M0NJKHJNRB",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
   
      <App />
      

    </Provider>
  </BrowserRouter>
);
