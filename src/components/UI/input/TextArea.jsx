import React from "react";
import cl from './TextArea.module.css'

const TextArea = ({...props}) =>{
    return(
        <div>
            <textarea {...props} className={cl.TextArea}></textarea>
        </div>
    )
}
export default TextArea