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
              style={{ background: "#FF5864" }}
              className="infocard"
            >
              <div className="username"><h2>{user.username}</h2></div>
              <div className="description">
                <div className="container-label-one">
                  <div className="description-labels"><h3>Dueño:</h3><h3>{user.name}</h3></div>
                  <div className="description-labels"><h3>Raza:</h3><h3>{user.raza}</h3></div>
                  <div className="description-labels"><h3>Edad:</h3><h3>{user.edad}</h3></div>
                </div>
                <div className="container-label-two">  
                  <div className="description-labels"><h3>Vacunas:</h3><h3>{user.vacuna}</h3></div>
                  <div className="description-labels"><h3>Ciudad:</h3><h3>{user.city}</h3></div>
                </div>
              </div>
            </div>
            <div
              style={{ backgroundImage: `url(${user.cardPicture})` }}
              className="card"
            >
              
            </div>
          </TinderCard>
        ))}
      </div>
      <SwipeButtons />
    </div>
  );
  
}

export default TinderCards;
