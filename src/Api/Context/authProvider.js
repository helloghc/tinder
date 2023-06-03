import React, { createContext } from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { userExist, auth, registerNewUser, getUserInfo } from "../firebase.js";

export const AuthContext = createContext();

export default function AuthProvider({ children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered }){

    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
          if(user){
            const isRegistered = await userExist(user.uid);
            setCurrentUser(user);
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
                    email: user.email,
                    name: '' || user.displayName,
                    profilePicture:'' || user.photoURL,
                    cardPicture:'' || user.photoURL,
                    username:'',
                    city:'',
                    processCompleted: false,
                });
                onUserNotRegistered(user);
            }
          } else {
            onUserNotLoggedIn();
          }
        });
      } , [onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered]);

    return (
      <AuthContext.Provider value={{ currentUser }}>
        {children}
      </AuthContext.Provider>
    )

};