import React, { useRef, useState } from "react";
import AuthProvider from "src/Api/Context/authProvider";
import { useHistory } from "react-router-dom";
import "../Register.css";
import { auth } from "../../Api/firebase";
import { signInWithEmailAndPassword, deleteUser } from "firebase/auth";




const DeleteUserView = () => {
  
  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [emailToDelete, setEmailToDelete] = useState('');
  const [passwordToDelete, setPasswordToDelete] = useState('');

  const fileRef = useRef();

  const history = useHistory();
  

  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    setCurrentState(2);
  }

  function handleUserNotLoggedIn() {
    history.push('/login');
  }
  
  const logIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      const userToDelete = auth.currentUser; 
      deleteUser(userToDelete).then(() => {
      alert("Usuario Eliminado")
    })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });
  }


  async function handleContinue(e) {
    e.preventDefault();
    logIn(emailToDelete, passwordToDelete);
  }

  

  if(currentState != 2){
    return (<AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
  ></AuthProvider>);
  }
  return <div className="register">
      <div className="register-container">
        <h1> Eliminar Usuario </h1>
        <p>Si estás seguro, inicia sesión</p>
        <div className="wrap">
          <input type="email" id="emailField" placeholder="Correo Electrónico" value={emailToDelete} onChange={e => {setEmailToDelete(e.target.value)}}></input>
        </div>
        <div className="wrap">
          <input type="password" id="passwordField" placeholder="Contraseña" value={passwordToDelete} onChange={e => {setPasswordToDelete(e.target.value)}}></input>
        </div>
        <div>
          <button type="submit"className="button-continue" onClick={handleContinue}>Eliminar</button>
        </div>
      </div>
    </div> 
  
};

export default DeleteUserView;
