import React, { useState } from "react";
import "./Chats.css";
import Chat from "./Chat"
import AuthProvider from "src/Components/authProvider";
import { useHistory } from "react-router-dom";

const Chats = () => {

  const history = useHistory();
  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  
  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    setCurrentState(2);
  }

  function handleUserNotRegistered(user) {
    history.push('/login');
  }

  function handleUserNotLoggedIn() {
    history.push('/login');
  }

  if(currentState != 2){
    return (<AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
  ></AuthProvider>);
  }

  return <div className="chats">
      <Chat
      name="Labrador"
      message="Wuff" 
      timestamp="6 mins ago" 
      profilePic="https://gooddoggies.online/wp-content/uploads/2020/06/5-Tips-To-Training-A-Labrador-Puppy-1.jpg"
      />
      <Chat
      name="Shiba Inu"
      message="Bork" 
      timestamp="1 hr ago" 
      profilePic="https://thehappypuppysite.com/wp-content/uploads/2019/06/Mini-Shiba-Inu-HP-long.jpg"/>
      <Chat
      name="Corgi"
      message="Awooo" 
      timestamp="4 hrs ago" 
      profilePic="https://i.pinimg.com/originals/cb/d4/1f/cbd41fb83c06a915a79ed0ab9ca63789.jpg"/>
  </div>;
};



export default Chats;
