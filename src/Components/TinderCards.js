import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import "./TinderCards.css";
import {database,  getProfilePhotoUrl} from "../Api/firebase.js";
import Header from "./Header";
import SwipeButtons from "./SwipeButtons";
import AuthProvider from "src/Components/authProvider";
import { useHistory } from "react-router-dom";


function TinderCards() {
  const [people, setPeople] = useState([]);
  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [profileUrl, setProfileUrl] = useState(null);

  useEffect(() => {
    const unsubscribe = database
      .collection("people")
      .orderBy("username", "desc")
      .onSnapshot((snapshot) =>
        setPeople(snapshot.docs.map((doc) => doc.data()))
      );

    return () => {
      unsubscribe();
    };
  }, []);

  const history = useHistory();
  
  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    const url = await getProfilePhotoUrl(user.profilePicture);
    setProfileUrl(url);
    setCurrentState(2);
  }

  function handleUserNotRegistered(user) {
    history.push('/login');
  }

  function handleUserNotLoggedIn() {
    history.push('/login');
  }

  if(currentState != 2){
    return (<AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
  ></AuthProvider>);
  }

  return (
    <div>
      <Header />  
      <div className="tinderCards__cardContainer">
        {people.map((user) => (
          <TinderCard
            className="swipe"
            key={user.username}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{ backgroundImage: `url(${user.profilePicture})` }}
              className="card"
            >
              <h3>{user.username}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <SwipeButtons />
    </div>
  );
  
}

export default TinderCards;
