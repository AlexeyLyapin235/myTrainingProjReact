import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AuthInput from '../components/UI/input/AuthInput'
import MyTitle from '../components/UI/title/MyTitle'
import {  logged ,setAdmin } from '../store/redaxToolkit/myStore'
import { useNavigate } from "react-router-dom";
import Api from '../api/axios.js'
import ButtonTocart from '../components/UI/buttons/ButtonTocart'

export function LoginPage() {
  const enter = useSelector((state) => state.myState.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminName = 'admin'

const [userLogin,setUserLogin] = useState('');
const [userPassword,setUserPassword] = useState('');
useEffect(() => {
    if (enter){
       return navigate("/");
    }
 },[enter]);
const login = async ()=>{
    if(!userLogin || !userPassword){return}
        Api.loginUser({
        identifier:userLogin,
        password:userPassword
    }).then((res)=>{
        dispatch(logged());
        localStorage.setItem("Token",res.data.jwt);
        if(res.data.user.username === adminName.toLocaleLowerCase()){
         dispatch(setAdmin(adminName.toLocaleLowerCase()))}
    })
  }
  return (
    <div>
    <MyTitle>Войти в систему</MyTitle>
    <AuthInput placeholder="логин" value={userLogin} onChange={ event => setUserLogin(event.target.value)}/>
    <AuthInput placeholder="пароль" value={userPassword} onChange={event => setUserPassword(event.target.value)}/>
    <ButtonTocart  onClick={login}>Вход</ButtonTocart>
    
    </div>
  )
}
export default LoginPage