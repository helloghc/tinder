import React from "react";
import "./SessionInit.css";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const SessionInit = (props) => {

  const [isSignUp, setIsSignUp] = React.useState(false);
  const auth = getAuth();

  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((firebaseUser) =>{
        console.log("Usuario Creado: ", firebaseUser);
        props.setUsuario(firebaseUser)
      });
  };

  const logIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).then((firebaseUser) => {
      console.log("Sesión Iniciada con:", firebaseUser.user)
      props.setUsuario(firebaseUser);
    })
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.emailField.value;
    const password = e.target.passwordField.value;

    if(isSignUp){
      signUp(email, password);
    }

    if(!isSignUp){
      logIn(email, password);
    }

  };

  return <div className="session">
    <div className="form-session">
      <p>{process.env.REACT_APP_SALUDO}</p>
      <form className="form-container" onSubmit={submitHandler}>
        <h1>{isSignUp ? "Registrarte" : "Iniciar Sesión"}</h1>
        <div className="wrap">
          <p>Correo Electrónico</p>
          <input type="email" id="emailField"></input>
        </div>
        <div className="wrap">
          <p>Contraseña</p>
          <input type="password" id="passwordField"></input>
        </div>
        <button className="button-session" type="submit">{isSignUp ? "Regístrate" : "Iniciar Sesión"}</button>
      </form>
      <button className="button-session2" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "¿Ya tienes cuenta?, Inicia Sesión" : "¿Aún no tienes cuenta?, Regístrate"}
      </button>
    </div>
    
  </div>;
};

export default SessionInit;
