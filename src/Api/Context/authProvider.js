import React, { createContext } from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";
import { onAuthStateChanged } from "firebase/auth";
import { userExist, auth, registerNewUser, getUserInfo } from "../firebase.js";

export const AuthContext = createContext();

export default function AuthProvider({ children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered }){

    const [currentUser, setCurrentUser] = useState({});
    const history = useHistory();

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
                    name: '',
                    pet: '',
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
    return (
      <AuthContext.Provider value={{ currentUser }}>
        {children}
      </AuthContext.Provider>
    )

};