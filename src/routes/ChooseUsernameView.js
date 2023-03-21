import React, { useState } from "react";
import AuthProvider from "src/Components/authProvider";
import { useHistory } from "react-router-dom";
import "./ChooseUsernameView.css";
import { existUsername, updateUser } from "src/Api/firebase";


const ChooseUsernameView = () => {

  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUsername] = useState("");

  const history = useHistory();
  
  function handleUserLoggedIn(user) {
    history.push('/');
  }

  function handleUserNotRegistered(user) {
    setCurrentUser(user);
    setCurrentState(3);
  }

  function handleUserNotLoggedIn() {
    history.push('/login');
  }
  
  function handleInputUsername(e){
    setUsername(e.target.value);
  }
  async function handleContinue() {
    if ( username != "" ) {
      const exists = await existUsername(username);
      if(exists){
        setCurrentState(5);
      } else {
        const tmp = {...currentUser};
        tmp.username = username;
        tmp.processCompleted = true;
        await updateUser(tmp);
        setCurrentState(6);
      }
    }
  }

  if(currentState == 3 || currentState == 5){
    return <div>
      <h1> Bienvenido {currentUser.displayName}</h1>
      <p>Elige tu Nombre de Usuario</p>
      {currentState == 5? <p>El nombre de usuario ya existe</p> : "" }
      <div>
        <input type="text" onChange={handleInputUsername} />
      </div>

      <div>
        <button onClick={handleContinue}>Continue</button>
      </div>
    </div>
  }

  return  (<AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
  ></AuthProvider>);
};

export default ChooseUsernameView;
