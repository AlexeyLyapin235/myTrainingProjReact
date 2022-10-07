import React from "react";
import { useState,useEffect } from "react";
import AuthInput from "../components/UI/input/AuthInput";
import MyTitle from "../components/UI/title/MyTitle";
import { useSelector, useDispatch } from 'react-redux';
import {  logged  ,setAdmin} from '../store/redaxToolkit/myStore'
import { useNavigate } from "react-router-dom";
import Api from '../api/axios.js'
import ButtonTocart from "../components/UI/buttons/ButtonTocart";


const RegisterPage = ()=>{
const [login,setLogin] = useState('');
const [email,setEmail] = useState('');
const adminName = 'admin'
const [password,setPassword] = useState('');
let navigate = useNavigate();
const enter = useSelector((state) => state.myState.value)
const dispatch = useDispatch()
const  register = async() =>{
if(!login || !email || !password){return}
    Api.register({
    username:login,
    email:email,
    password:password
    })
    .then((res)=>{
    dispatch(logged())
    localStorage.setItem("Token",res.data.jwt)
    if(res.data.user.username === adminName.toLocaleLowerCase()){
       dispatch(setAdmin(adminName.toLocaleLowerCase()))}})
    }
useEffect(() => {if (enter){ return navigate("/");}},[enter]);
    return(
    <div>
        <MyTitle>Регистрация</MyTitle>
        <AuthInput value={login} onChange={event => setLogin(event.target.value)} placeholder="Логин"/>
        <AuthInput value={email} onChange={event => setEmail(event.target.value)}  placeholder="Эмаил"/>
        <AuthInput value={password} onChange={event => setPassword(event.target.value)}  placeholder="Пароль"/>
        <ButtonTocart onClick={register}>Регистрация</ButtonTocart>
     </div>
    )
}
export default RegisterPage