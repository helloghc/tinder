import React, { useState, useContext, useEffect, useRef } from "react";
import AuthProvider, { AuthContext } from "src/Api/Context/authProvider";
import { ChatContext } from "src/Api/Context/ChatContext";
import "./Message.css"

const Message = ({ message }) => {
  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const { data } = useContext(ChatContext);
  const ref = useRef();

  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    setCurrentState(2);
  } 


  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);


  if(currentState != 2){
    return (<AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
  ></AuthProvider>);
};
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img className="userChat-img"
          src={
            message.senderId === currentUser.uid
              ? currentUser.cardPicture
              : data.user.cardPicture
          }
          alt=""
        />
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
