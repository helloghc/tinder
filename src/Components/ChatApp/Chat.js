import React, { useContext } from "react";
import Messages from "./Other/Messages";
import Input from "./Other/Input";
import { ChatContext } from "src/Api/Context/ChatContext";
import "./Chat.css"
import ChatHeader from "./Other/ChatHeader";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <ChatHeader/>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
