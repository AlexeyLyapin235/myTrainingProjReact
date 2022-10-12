import React from "react";
import cl from './OpenRealTimeChat.module.css'
import Paragraph from "./UI/paragraph/Paragraph";

const OpenRealTimeChat = ({openChat,...props}) =>{

    return(
        <div className={cl.defaultChat} onClick={openChat}>
            <Paragraph className={cl.text}>Go To RealTime Chat</Paragraph>
        </div>
    )
}
export default OpenRealTimeChat