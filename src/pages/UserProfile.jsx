import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import MyTitle from "../components/UI/title/MyTitle";
import Paragraph from "../components/UI/paragraph/Paragraph";
import {  useDispatch } from 'react-redux'
import { exits } from '../store/redaxToolkit/myStore'
import { useNavigate } from "react-router-dom";
import Api from '../api/axios.js'
import ButtonTocart from "../components/UI/buttons/ButtonTocart";


const UserProfile = () =>{
const [myInfo,setMyinfo] = useState('');

const dispatch = useDispatch()
const navigate = useNavigate();

const logOut = () =>{
    localStorage.removeItem('Token')
    dispatch(exits())
    navigate('/login')
}

const getMyInfo = async() =>{
     const jwt =  localStorage.getItem('Token')
     Api.getInfoForMe({headers:{
                 Authorization: `Bearer ${jwt}`
                 }}).then((res)=>{
        setMyinfo(res.data)
    })
}
useEffect(()=>{getMyInfo() },[])
    return(
    <div>
        <MyTitle>Профиль</MyTitle>
        <Paragraph>email: {myInfo.email}</Paragraph>
        <Paragraph>userName: {myInfo.username}</Paragraph>
        <ButtonTocart onClick={logOut}>Выход</ButtonTocart>
    </div>
    )
}
export default UserProfile