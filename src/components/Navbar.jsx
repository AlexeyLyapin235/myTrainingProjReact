import React from "react";
import {Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import cl from "./Navbar.module.css"

const Navbar = () =>{


    
const enter = useSelector((state) => state.myState.value)
    if(enter){
        return(
        <nav className={cl.NavBar} >
           <Link className={cl.Link} to="/">Home</Link>
           <Link className={cl.Link} to="/basket">Корзина</Link>
           <Link className={cl.Link} to="/profil">Мой профиль</Link>
        </nav>
        )
      }

    return(
    <nav className={cl.NavBar}>
    <Link className={cl.Link}  to="/">Home</Link>
    
    <Link className={cl.Link}  to="/register">Регистрация</Link>
    <Link className={cl.Link}  to="/login">Войти</Link>
      
    </nav>
    )
}
export default Navbar