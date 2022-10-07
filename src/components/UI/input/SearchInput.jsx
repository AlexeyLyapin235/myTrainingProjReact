import React from "react";
import cl from './SearchInput.module.css'
const SearchInput = ({value,setSearch}) =>{

    return(
        <form className={cl.form}>
        <input value={value} onChange={event => setSearch(event.target.value)} className={cl.input} name="s" placeholder="Искать здесь..." type="search"/>
       
      </form>
    )
}
export default SearchInput