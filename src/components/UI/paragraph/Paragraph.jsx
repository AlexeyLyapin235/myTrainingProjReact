import React from "react";
import cl from './Paragraph.module.css'

const Paragraph = ({children,...props}) =>{

    return(
        <p className={cl.Paragraph} {...props}>{children}</p>
    )
}
export default Paragraph