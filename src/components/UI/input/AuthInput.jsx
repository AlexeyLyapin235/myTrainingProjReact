import React from "react";
import cl from "./AuthInput.modal.css"
const AuthInput = ({children,...props}) =>{
    return(
        <div>
        <input {...props}  className={cl.AuthInput}/>
        </div> 
         )
}
export default AuthInput