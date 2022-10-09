import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { useState } from "react";
import AuthInput from "../components/UI/input/AuthInput";
import ButtonTocart from '../components/UI/buttons/ButtonTocart';
import { useNavigate } from "react-router-dom";
import {  logged ,setAdmin } from '../store/redaxToolkit/myStore'


const Login = () =>{
    const auth = getAuth();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getlogin = () =>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
          const user = userCredential.user;
          dispatch(logged())
          navigate("/");
          localStorage.setItem("Token",user.accessToken);
          if(email === 'myAdmin@gmail.com' && password ==='admin123'){
            dispatch(setAdmin());
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage)
        });
    }

    return (
        <div>
            <AuthInput value={email} type="email" placeholder="Введите эмаил" onChange={event=> setEmail(event.target.value)}/>
            <AuthInput value={password} type="password" placeholder="Введите пароль" onChange={event=> setPassword(event.target.value)} />
            <ButtonTocart onClick={getlogin}>Войти</ButtonTocart>
        </div>
    )
}
export default Login