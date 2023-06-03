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
import AuthProvider from "src/Api/Context/authProvider";

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
      currentUser.uid > profile.uid
        ? currentUser.uid + profile.uid
        : profile.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(database, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(database, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(database, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: profile.uid,
            name: profile.name,
            cardPicture: profile.cardPicture,
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

  return  <div className="page-container">
            <div className="profile">
              <div className="description-labels"><h2>{profile?.profileInfo.username}</h2></div>
              <div className="profile-img" >
                <img src={url} alt="" />
              </div>
              <div className="description-contain">
                <div>
                  <p>{profile?.profileInfo.name}</p>
                  <p>Edad: {profile?.profileInfo.edad}</p>
                  <p>Ciudad: {profile?.profileInfo.city}</p>
                </div>
                <div className="sendMessage-container">
                  <button className="sendMessage" onClick={handleSelect} > Enviar Mensaje </button>
                </div>
              </div>
            </div>
          </div>
  
  
};

export default PublicProfileView;
