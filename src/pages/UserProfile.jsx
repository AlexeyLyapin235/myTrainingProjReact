import React from "react";
import MyTitle from "../components/UI/title/MyTitle";
import Paragraph from "../components/UI/paragraph/Paragraph";
import { useDispatch, useSelector } from "react-redux";
import { exits } from "../store/reduxToolkit/myStore";
import { useNavigate } from "react-router-dom";
import ButtonTocart from "../components/UI/buttons/ButtonTocart";
import cl from './UserProfile.module.css'

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.myState.email);
  const userCreated = useSelector((state) => state.myState.creationTime);
  const lastSignIn = useSelector((state) => state.myState.lastSignInTime);

  const logOut = () => {
    localStorage.removeItem("Token");
    dispatch(exits());
    navigate("/login");
  };

  return (
    <div className={cl.UserProfile}>
      <MyTitle>Профиль</MyTitle>
      <Paragraph>эмаил: {userEmail}</Paragraph>
      <Paragraph>Дата регистрации: {userCreated}</Paragraph>
      <Paragraph>Дата последнего посещения: {lastSignIn}</Paragraph>
      <ButtonTocart onClick={logOut}>Выход</ButtonTocart>
    </div>
  );
};
export default UserProfile;
