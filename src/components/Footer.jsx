import React from "react";
import cl from './Footer.module.css'

const Footer = () =>{

    return(
        <div >
            <footer className={cl.Footer}>
            <p className={cl.copyright}>  Telegram: @bioware73</p>
            <p className={cl.copyright}>  Email:bioware73@gmail.com </p>
            <p className={cl.copyright}>  WhatsApp:+994554229971 </p>
        </footer>
        </div>
    )
}
export default Footer