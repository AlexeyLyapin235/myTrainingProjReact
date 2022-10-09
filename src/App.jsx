import './App.css';
import React from 'react'
import Basket from './pages/Basket';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserProfile from './pages/UserProfile';
import RequireAuth from './components/hok/RequireAuth';






function App() {


  return (
    <div className="App">
      <Navbar/>
       <Routes>
          <Route path="/basket" element={<RequireAuth><Basket/></RequireAuth>} />
          <Route path="/" element={<RequireAuth><Home/></RequireAuth>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/profil" element={<RequireAuth><UserProfile/></RequireAuth>} />
      </Routes>
      
    </div>
  );
}

export default App;
