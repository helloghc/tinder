import React, { useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom"
import "./LoginView.css";
import { auth } from "../Api/firebase.js";
import { sendPasswordResetEmail } from "firebase/auth";
import AuthProvider from "src/Api/Context/authProvider";


const ForgotPassword = (props) => {
  const history = useHistory();
  const [currentState, setCurrentState] = useState(0);
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const emailRef = useRef();

  async function submitHandler(e) {
    e.preventDefault();
    try {
      setMessage('')
      setError('')
      setLoading(true)
      sendPasswordResetEmail(auth, emailRef.current.value)
      setMessage('Checa tu bandeja de entrada y sigue las instrucciones')
    } catch (error){
      console.log(error)
      setError('Fallo al restaurar tu password')
    }

    setLoading(false)
  };

  function back(e) {
    history.push('/');
  };

  function handleUserLoggedIn(user) {
    history.push('/');
  };

  function handleUserNotRegistered(user) {
    history.push('/registration')
  };

  function handleUserNotLoggedIn() {
    setCurrentState(4);
  };

  if(currentState == 4){
    return  <div className="session">
            <div className="form-session">
              <form className="form-container" onSubmit={submitHandler}>
                <h1>Recuperar Contraseña</h1>
                { error && <p>{error}</p> }
                <div className="wrap">
                  <input type="email" autoFocus required ref={emailRef} placeholder="Correo Electrónico"></input>
                </div>
                <button className="button-session" type="submit" disabled={loading}>Restaurar</button>
                { message && <p>{message}</p> }
              </form>
              <div className="alt-options">
                <button onClick={back}>Regresar</button>
              </div>
            </div>
          </div>;
  }
  if(currentState == 6){
    history('/');
  }
  return (
    <AuthProvider
    onUserLoggedIn={handleUserLoggedIn}
    onUserNotRegistered={handleUserNotRegistered}
    onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <div>Loading...</div>
    </AuthProvider>
  );
};

export default ForgotPassword;
