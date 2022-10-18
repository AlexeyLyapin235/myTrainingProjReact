import React from "react";
import Paragraph from "../paragraph/Paragraph";
import cl from './OpenRealTimeChat.module.css'

const OpenRealTimeChat = ({openChat,...props}) =>{

    return(
        
        <div className={cl.defaultChat} onClick={openChat}>
            <Paragraph className={cl.text}>Go To RealTime Chat</Paragraph>
        </div>
    )
}
export default OpenRealTimeChat