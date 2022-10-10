import React,{useEffect,useState} from "react";
import cl from './InputAdd.module.css'

const InputAdd = ({children,value,...props}) =>{
  const classes = [cl.InputAdd]
  const [greenFocusName, setGreenFocus] = useState(false);
  useEffect(() => {
    value.length > 0 ? setGreenFocus(true) : setGreenFocus(false);
  }, [value]);


  if(greenFocusName === true){
    classes.push(cl.greenFocus)
  }

    return(

        <div>
            
        <input {...props} value={value} className={classes.join(' ')}  />
        </div>
   
    )
}
export default InputAdd