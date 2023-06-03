import React, { useContext, useEffect, useState } from "react";
import { database } from "src/Api/firebase";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import AuthProvider from "src/Api/Context/authProvider";
import { ChatContext } from "src/Api/Context/ChatContext";
import "./Search.css"
import { Link } from "react-router-dom";
import { userChatsExist } from "src/Api/firebase";

const Chatlist = () => {
    
    const [chats, setChats] = useState([]);
    const { dispatch } = useContext(ChatContext);
    const [currentState, setCurrentState] = useState(0);
    const [currentUser, setCurrentUser] = useState({});

  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    setCurrentState(2);
  }

    useEffect(() => {
      async function exists(){ 
        const exist = await userChatsExist(currentUser.uid); 
        if (exist) {
          console.log(currentUser)
        } else {
          await setDoc(doc(database, "userChats", currentUser.uid), {
          });
        }
      }
      
      const getChats = () => {
        const unsub = onSnapshot(doc(database, "userChats", currentUser.uid), (doc) => {
          setChats(doc.data());
        });
  
        return () => {
          unsub();
        };
      };
       
      currentUser.uid && exists() && getChats();
    }, [currentUser.uid]);
    const chatsLength = Object.keys(chats).length; 
    const handleSelect = (u) => {
      dispatch({ type: "CHANGE_USER", payload: u });
    };

    if(currentState != 2){
    return (<AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
  ></AuthProvider>);
};


    if ( chatsLength > 0 ) {
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
    }else{
      return(
        <p className="empty">Esto esta muy vacío, Inicia un chat</p>
      )
    }
}

export default Chatlist;