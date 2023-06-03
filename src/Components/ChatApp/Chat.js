import React, { useContext } from "react";
import Messages from "./Other/Messages";
import Input from "./Other/Input";
import "./Chat.css"
import ChatHeader from "./Other/ChatHeader";



const Chat = () => {


  return (
        <div className="chat">
          <ChatHeader/>
          <Messages />
          <Input/>
        </div>
  );
};

export default Chat;
