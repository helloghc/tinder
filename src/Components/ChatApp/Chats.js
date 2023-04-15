import React from "react";
import "./Chats.css";
import Search from "./Other/Search";
import Chatlist from "./Other/ChatsList";


const Chats = () => {

  return (
        <div className="chats">
          <Search></Search>
          <Chatlist></Chatlist>
        </div>
  );
};



export default Chats;
