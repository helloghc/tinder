import React from "react";
import "./SignOutView.css";
import { logout } from 'src/Api/firebase'
import AuthProvider from "src/Components/authProvider";
import { useHistory } from "react-router-dom";


const SignOutView = () => {
  const history = useHistory();

  async function handleUserLoggedIn(user) {
    logout();
  }

  function handleUserNotRegistered(user) {
    history.push('/login');
  }

  function handleUserNotLoggedIn() {
    history.push('/login');
  }
  
  return (<AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
  ></AuthProvider>);
};

export default SignOutView;
