import React from "react";
import cl from './InputAdd.module.css'

const InputAdd = ({children, greenfocus,...props}) =>{
  const classes = [cl.InputAdd]
  if(greenfocus === true){
    classes.push(cl.greenFocus)
  }

    return(

        <div>
            
        <input {...props} className={classes.join(' ')}  />
        </div>
   
    )
}
export default InputAdd