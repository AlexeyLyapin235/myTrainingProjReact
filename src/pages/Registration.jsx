import React, { useState } from "react";
import ButtonTocart from "../components/UI/buttons/ButtonTocart";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  logged,
  setEmailStore,
  setCreationTime,
  setLastSignInTime,
} from "../store/reduxToolkit/myStore";
import { useNavigate } from "react-router-dom";
import InputAdd from "../components/UI/input/InputAdd";
import { addUser } from "../api/firestore";

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
        const data ={
          email:user.email,
          uid:user.uid
        }
        addUser(data,user.uid)
        console.log(user);
        console.log('qwe');
        dispatch(logged());
        navigate("/");
        localStorage.setItem("Token", user.accessToken);
        dispatch(setEmailStore(user.email));
        dispatch(setCreationTime(user.metadata.creationTime));
        dispatch(setLastSignInTime(user.metadata.lastSignInTime));
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
      <ButtonTocart onClick={register}>Зарегистрироваться</ButtonTocart>
    </div>
  );
};
export default Registration;
