import React, { useState } from "react";
import "./Chats.css";
import AuthProvider from "src/Components/authProvider";
import { useHistory } from "react-router-dom";
import Search from "./Other/Search";


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

  return (
        <div className="chats">
          <div className="search">
              <div className="searchForm">
                  <Search></Search>
              </div>
          </div>
        </div>
  );
};



export default Chats;
