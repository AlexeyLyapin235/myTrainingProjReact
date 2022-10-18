import React from "react";
import ButtonTocart from "../buttons/ButtonTocart";
import InputAdd from "../input/InputAdd";
import cl from "./Chat.module.css";
import DeleteButton from "../buttons/DeleteButton";
import Messages from "./Messages";

const Chat = ({ message, setMessage, addMessages, messages, closeChat }) => {
  return (
    <div className={cl.blockChat}>
      <div >
        <DeleteButton className={cl.closeChat} onClick={closeChat}></DeleteButton>
      </div>
      <div className={cl.blockMessage}>
        {messages.map((el) => (
          <Messages email={el.emai} realTimeMessages={el.mesages} key={el.id}></Messages>
        ))}
      </div>
      <div className={cl.blockForm}>
        <InputAdd
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        ></InputAdd>
        <ButtonTocart onClick={addMessages}>Отправить</ButtonTocart>
      </div>
    </div>
  );
};
export default Chat;
