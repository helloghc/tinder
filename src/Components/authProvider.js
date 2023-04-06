import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom"
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import database, { authForGoogle, userExist, auth, registerNewUser, getUserInfo } from "../Api/firebase.js";

export default function AuthProvider({ children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered }){

    
    const history = useHistory();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
          if(user){
            const isRegistered = await userExist(user.uid);
            if(isRegistered){
                const userInfo = await getUserInfo(user.uid);
                if(userInfo.processCompleted){
                    onUserLoggedIn(userInfo);
                } else {
                    onUserNotRegistered(userInfo);
                }
                
            } else {
                await registerNewUser({
                    uid: user.uid,
                    name: '',
                    profilePicture:'',
                    cardPicture:'',
                    username:'',
                    city:'',
                    raza:'',
                    edad:'',
                    processCompleted: false,
                });
                onUserNotRegistered(user);
            }
          } else {
            onUserNotLoggedIn();
          }
        });
      } , [history, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered]);
    return <div>{children}</div>

};