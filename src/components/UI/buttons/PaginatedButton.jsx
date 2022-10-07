import React from "react";
import classes from './PaginatedButton.module.css'

const PaginatedButton = ({children,page,paginations,...props}) =>{


    return(
        <button {...props} page={page} className={classes.MyBtn} onClick={() => paginations(page)}>
        {children}
        </button>
    )
}
export default PaginatedButton