import React, { useContext, useEffect, useState } from "react";
import { database } from "src/Api/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "src/Api/Context/authProvider";
import { ChatContext } from "src/Api/Context/ChatContext";
import "./Search.css"
import { Link } from "react-router-dom";

const Chatlist = () => {
    
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
      const getChats = () => {
        const unsub = onSnapshot(doc(database, "userChats", currentUser.uid), (doc) => {
          setChats(doc.data());
        });
  
        return () => {
          unsub();
        };
      };
  
      currentUser.uid && getChats();
    }, [currentUser.uid]);
  
    const handleSelect = (u) => {
      dispatch({ type: "CHANGE_USER", payload: u });
    };
    
    return (
      <div className="chats">
        {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
              <Link to={`/chat/${chat[1].userInfo.username}`} key={chat[1].userInfo.username}>
                <div
                className="userChat"
                key={chat[0]}
                onClick={() => {handleSelect(chat[1].userInfo)}}
              >
                <img src={chat[1].userInfo.cardPicture} className="userChat-img" alt="" />
                <div className="userChatInfo">
                  <div className="userChatName">
                    <span>{chat[1].userInfo.name}</span>
                    <span>({chat[1].userInfo.username})</span>
                  </div>
                  <p>{chat[1].lastMessage?.text}</p>
                </div>
              </div>
            </Link>
        ))}
      </div>
    )
}

export default Chatlist;