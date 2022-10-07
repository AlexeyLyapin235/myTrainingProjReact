import React from "react";
import cl from './ButtonTocart.module.css'
const ButtonTocart = ({children,...props}) =>{


    return(
        <button {...props} className={cl.ButtonTocart}><span className={cl.ButtonTocartText}>{children}</span></button>
    )
}
export default ButtonTocart