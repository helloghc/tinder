import React, { useContext, useState } from "react";
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
import AuthProvider from "src/Components/authProvider";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentState, setCurrentState] = useState(0);

  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    setCurrentState(2);
  }

  const handleSearch = async () => {
    const q = query(
      collection(database, "people"),
      where("name", "==", username)
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
    e.code === "Enter" && handleSearch();
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
            name: user.name,
            cardPicture: user.photoURL,
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
    setUsername("")
  };

  if(currentState != 2){
    return (<AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
  ></AuthProvider>);
  }
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.cardPicture} alt="" />
          <div className="userChatInfo">
            <span>{user.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;