import React, { useState } from "react";
import ButtonTocart from "../components/UI/buttons/ButtonTocart";
import AuthInput from "../components/UI/input/AuthInput";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  logged,
  setEmailStore,
  setCreationTime,
  setLastSignInTime,
} from "../store/redaxToolkit/myStore";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const register = () => {
    if (!email || !password) {
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(logged());
        navigate("/");
        localStorage.setItem("Token", user.accessToken);
        console.log(user.email);
        dispatch(setEmailStore(user.email));
        dispatch(setCreationTime(user.metadata.creationTime));
        dispatch(setLastSignInTime(user.metadata.lastSignInTime));
        console.log(user.metadata);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  return (
    <div>
      <AuthInput
        value={email}
        type="email"
        placeholder="Введите эмаил"
        onChange={(event) => setEmail(event.target.value)}
      />
      <AuthInput
        value={password}
        type="password"
        placeholder="Введите пароль"
        onChange={(event) => setPassword(event.target.value)}
      />
      <ButtonTocart onClick={register}>Зарегистрироваться</ButtonTocart>
    </div>
  );
};
export default Registration;
