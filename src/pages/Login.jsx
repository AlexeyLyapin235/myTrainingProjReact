import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ButtonTocart from "../components/UI/buttons/ButtonTocart";
import { useNavigate } from "react-router-dom";
import {
  logged,
  setAdmin,
  setEmailStore,
  setCreationTime,
  setLastSignInTime,
} from "../store/reduxToolkit/myStore";
import InputAdd from "../components/UI/input/InputAdd";

const Login = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getlogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(logged());
        navigate("/");
        localStorage.setItem("Token", user.accessToken);
        dispatch(setEmailStore(user.email));
        dispatch(setCreationTime(user.metadata.creationTime));
        dispatch(setLastSignInTime(user.metadata.lastSignInTime));
        if (email === "myAdmin@gmail.com" && password === "admin123") {
          dispatch(setAdmin());
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div>
      
      <InputAdd
        value={email}
        type="email"
        placeholder="Введите эмаил"
        onChange={(event) => setEmail(event.target.value)}
      />
      <InputAdd
        value={password}
        type="password"
        placeholder="Введите пароль"
        onChange={(event) => setPassword(event.target.value)}
      />
      <ButtonTocart onClick={getlogin}>Войти</ButtonTocart>
    </div>
  );
};
export default Login;
