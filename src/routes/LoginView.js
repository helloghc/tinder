import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom"
import "./LoginView.css";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authForGoogle, userExist, auth, database } from "../Api/firebase.js";
import AuthProvider from "src/Components/authProvider";
import google from "../Resources/img/google.png"
import { async } from "@firebase/util";
import { doc, setDoc } from "firebase/firestore";


const LoginView = (props) => {
  const history = useHistory();
  //const [currentUser, setCurrentUser] = useState(null);
  /*
  State 0: Inicializado
  1: Loading
  2: Login Completo
  3: Login sin registro
  4: No hay nadie logueado
  5: ya existe username
  6: nuevo username listo, redireccionar.
  */
  const [currentState, setCurrentState] = useState(0);

  const [isSignUp, setIsSignUp] = React.useState(false);

  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((firebaseUser) =>{
        console.log("Usuario Creado: ", firebaseUser);
      });
  };

  const logIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).then((firebaseUser) => {
      console.log("Sesión Iniciada con:", firebaseUser.email)
    })
  };

  const submitHandler  = (e) => {
    e.preventDefault();
    const email = e.target.emailField.value;
    const password = e.target.passwordField.value;
    async function userChats (){
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(database, "userChats", res.user.uid), {});
    }
    
    if(isSignUp){
      signUp(email, password);
    }

    if(!isSignUp){
      logIn(email, password);
    }
    userChats();
  };

  async function handleOnClick () {
    const googleProvider = new GoogleAuthProvider(); 
    await signInWithGoogle(googleProvider);
  };

  async function signInWithGoogle(googleProvider){
    try {
      const res = await signInWithPopup(auth, googleProvider);
      await setDoc(doc(database, "userChats", res.user.uid), {});
      console.log(res);
      
    } catch (error) {
      console.error(error);
    }
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
                <h1>{isSignUp ? "Regístrate" : "Iniciar Sesión"}</h1>
                <div className="wrap">
                  <input type="email" id="emailField" placeholder="Correo Electrónico"></input>
                </div>
                <div className="wrap">
                  <input type="password" id="passwordField" placeholder="Contraseña"></input>
                </div>
                <button className="button-session" type="submit">{isSignUp ? "Regístrate" : "Iniciar Sesión"}</button>
              </form>
              <button className="button-session2" onClick={() => setIsSignUp(!isSignUp)}>
                  {isSignUp ? "¿Ya tienes cuenta?, Inicia Sesión" : "¿Aún no tienes cuenta?, Regístrate"}
              </button>
              <div className="alt-options">
                <p>También puedes</p>
                <button onClick={handleOnClick}>Iniciar Sesión con Google <img src={google} alt="login con google"></img></button>
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

export default LoginView;
