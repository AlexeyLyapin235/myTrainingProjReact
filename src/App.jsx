import "./App.css";
import React from "react";
import Basket from "./pages/Basket";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import RequireAuth from "./components/hoc/RequireAuth";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import AdminToolsUsers from "./pages/AdminToolsUsers";
import AdminAuth from "./components/hoc/AdminAuth";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/basket"
          element={
            <RequireAuth>
              <Basket />
            </RequireAuth>
          }
        />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/profil"
          element={
            <RequireAuth>
              <UserProfile />
            </RequireAuth>
          }
        />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminToolsUsers" element={<AdminAuth><AdminToolsUsers/></AdminAuth>} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
