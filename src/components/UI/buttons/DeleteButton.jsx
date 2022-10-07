import React from "react";
import cl from "./DeleteButton.module.css"
const DeleteButton = ({...props}) =>{

    return(
     <div className={cl.containerDeleteBut}>
    <button {...props} className={cl.DeleteButton}>
    </button>
     </div>   
    
    )
}
export default DeleteButton