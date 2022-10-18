import React,{useEffect} from "react";
import { getUsers } from "../api/firestore";
import { useState } from "react";
import Table from "../components/UI/table/Table";


const AdminToolsUsers = () =>{
   
    const [allUsers,setAllUsers] = useState([]);
    const arrayThead = ['Пользователи']

    useEffect(()=>{
        getUsers(setAllUsers);
    },[]);
   
    return(
        <div>
        <Table arrayTbody={allUsers} arrayThead={arrayThead}></Table>
        </div>
    )
}
export default AdminToolsUsers;