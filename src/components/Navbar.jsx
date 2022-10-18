import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import cl from "./Navbar.module.css";

const Navbar = () => {
  const enter = useSelector((state) => state.myState.isAuth);
  const isAdmin = useSelector((state) => state.myState.admin);

  if (enter && isAdmin === false) {
    return (
      <nav className={cl.NavBar}>
        <Link className={cl.Link} to="/">
          Home
        </Link>
        <Link className={cl.Link} to="/basket">
          Корзина
        </Link>
        <Link className={cl.Link} to="/profil">
          Мой профиль
        </Link>
      </nav>
    );
  }
if(isAdmin){
  return(
    <nav className={cl.NavBar}>
        <Link className={cl.Link} to="/">
          Home
        </Link>
        <Link className={cl.Link} to="/adminToolsUsers">
          Пользователи
        </Link>
        <Link className={cl.Link} to="/basket">
          Корзина
        </Link>
        <Link className={cl.Link} to="/profil">
          Мой профиль
        </Link>
      </nav>
  )
}
  return (
    <nav className={cl.NavBar}>
      <Link className={cl.Link} to="/">
        Home
      </Link>
      <Link className={cl.Link} to="/registration">
        Регистрация
      </Link>
      <Link className={cl.Link} to="/login">
        Войти
      </Link>
    </nav>
  );
};
export default Navbar;
