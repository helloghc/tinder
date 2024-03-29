import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import "./TinderCards.css";
import { database, existPaw } from "../Api/firebase.js";
import Header from "./Header";
import AuthProvider from "src/Api/Context/authProvider";
import { useHistory } from "react-router-dom";
import styles from "./SwipeButtons.css";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import { Paw, Bones, Woof, Like } from './Interactions.js'



function TinderCards() {
  const [people, setPeople] = useState([]);
  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [buttonDisable, setButtonDisable] = useState(false);


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
            key={(user.username)}
            preventSwipe={["up", "down"]}
          >
            <div
              
              style={{ background: "#FF5864" }}
              className="infocard"
              itemProp={(user.uid)}
            >
              
              <div className="username"><h3>{user.each}</h3></div>
              <div className="description">
                <div className="container-label-one">
                  <div className="description-labels"><p className="data"><strong>{user.identificador}</strong></p></div>
                </div>
                <div className="container-label-two">  
                  <div className="description-labels"><p className="data"><strong>Edad: </strong>{user.edad}</p></div>
                  <div className="description-labels"><p className="data"><strong>Ciudad: </strong>{user.city}</p></div>
                </div>
                <div className="swipeButtons" itemProp={(user.uid)}>
                  <Paw id="paw" user={user} currentUser={currentUser}></Paw>
                  <Bones id="bones" user={user} currentUser={currentUser}></Bones>
                  <Woof id="woof" user={user} currentUser={currentUser}></Woof>
                  <Like id="like" user={user} currentUser={currentUser}></Like>
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
      
      
    </div>
  );
  
}

export default TinderCards



