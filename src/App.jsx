import './App.css';
import React from 'react'
import Basket from './pages/Basket';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserProfile from './pages/UserProfile';






function App() {


  return (
    <div className="App">
      <Navbar/>
       <Routes>
          <Route path="/basket" element={<Basket/>} />
      </Routes>
      <Routes>
          <Route path="/" element={<Home/>} />
      </Routes>
      <Routes>
          <Route path="/register" element={<RegisterPage/>} />
      </Routes>
      <Routes>
          <Route path="/login" element={<LoginPage/>} />
      </Routes>
      <Routes>
          <Route path="/profil" element={<UserProfile/>} />
      </Routes>
      
    
      
     
    </div>
  );
}

export default App;
