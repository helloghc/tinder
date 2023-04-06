import React, { useEffect, useState } from "react";
import "./PublicProfileView.css";
import { Link, useParams } from "react-router-dom";
import { database, existUsername, getProfilePhotoUrl, getUserPublicProfileInfo } from "src/Api/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import AuthProvider from "src/Components/authProvider";

const PublicProfileView = () => {
  const params = useParams();
  const [profile, setProfile] = useState(null);
  const [url, setUrl] = useState("");
  const [state, setState] = useState(0);
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    getProfile();

    async function getProfile(){
    
      const username = params.username; 
      try {
        const userUid = await existUsername(username);
        if (userUid) {
          const userInfo = await getUserPublicProfileInfo(userUid);
          setProfile(userInfo);
          

          const url = await getProfilePhotoUrl(userInfo.profileInfo.cardPicture);
          setUrl(url);
        } else {
          setState(7);
        }
      } catch (error) {

      }
    }    
  }, [ params ]);
  
  

  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    setCurrentState(2);
  }

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(database, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(database, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(database, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            name: user.name,
            cardPicture: user.cardPicture,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(database, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            name: currentUser.name,
            cardPicture: currentUser.cardPicture,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
  };

  if(currentState != 2 ){
    return (<AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
  ></AuthProvider>);
  }

  if(state == 7){
    return <div>Username Doesn't exist</div>
  }

  return  <div className="profile">
            <div>
              <h2>Profile</h2>
            </div>
            <div className="profile-img">
              <img src={url} alt="" />
            </div>
            <div>
              <h2>{profile?.profileInfo.username}</h2>
              <p>Dueño: {profile?.profileInfo.name}</p>
              <p>Raza: {profile?.profileInfo.raza}</p>
              <p>Edad: {profile?.profileInfo.edad}</p>
              <p>Vacunas: {profile?.profileInfo.vacuna}</p>
              <p>Ciudad: {profile?.profileInfo.city}</p>
            </div>
            <div>
              <button onClick={handleSelect} > Enviar Mensaje </button>
            </div>
          </div>;
};

export default PublicProfileView;
