import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import "./TinderCards.css";
import {database,  getProfilePhotoUrl} from "../Api/firebase.js";
import Header from "./Header";
import SwipeButtons from "./SwipeButtons";
import AuthProvider from "src/Api/Context/authProvider";
import { useHistory } from "react-router-dom";


function TinderCards() {
  const [people, setPeople] = useState([]);
  const [currentState, setCurrentState] = useState(0);

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
              <div className="username"><h3>{user.username}</h3></div>
              <div className="description">
                <div className="container-label-one">
                  <div className="description-labels"><p className="data"><strong>{user.name}</strong></p></div>
                  <div className="description-labels"><p className="data"><strong>Mascota: </strong>{user.pet}</p></div>
                  <div className="description-labels"><p className="data"><strong>Raza: </strong>{user.raza}</p></div>
                </div>
                <div className="container-label-two">  
                  <div className="description-labels"><p className="data"><strong>Edad: </strong>{user.edad}</p></div>
                  <div className="description-labels"><p className="data"><strong>Vacunas: </strong>{user.vacuna}</p></div>
                  <div className="description-labels"><p className="data"><strong>Ciudad: </strong>{user.city}</p></div>
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
