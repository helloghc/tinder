import React, { useState } from "react";
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
import { database } from "src/Api/firebase";
import AuthProvider from "src/Api/Context/authProvider";
import "./Search.css"
import { Link } from "react-router-dom";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});

  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    setCurrentState(2);
  }

  const handleSearch = async () => {
    const q = query(
      collection(database, "people"),
      where("username", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    handleSearch();
  };
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
            username:user.username,
            name: user.name,
            cardPicture: user.cardPicture,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      } else {
        await updateDoc(doc(database, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            username:user.username,
            name: user.name,
            cardPicture: user.cardPicture,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };
  if(currentState != 2){
    return (<AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
  ></AuthProvider>);
};
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          value={username}
        />
      </div>
      {err != false && <span>User not found!</span>}
      {user && (
        <Link to={`/chat/${user.username}`}> 
          <div className="userChat" onClick={handleSelect}>
            <img className="userChat-img" src={user.cardPicture} alt="profile photo" />
            <div className="userChatInfo">
              <div className="userChatName">
                <span>{user.name}</span>
                <span>({user.username})</span>
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};
export default Search;