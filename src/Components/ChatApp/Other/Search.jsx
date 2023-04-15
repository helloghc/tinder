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
import { AuthContext } from "src/Api/Context/authProvider";
import Google from "src/Resources/img/google.png"
import "./Search.css"
import { useContext } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

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

        await updateDoc(doc(database, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            username:currentUser.username,
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
        <div className="userChat">
          <img className="userChat-img" src={Google} alt="" />
          <div className="userChatInfo">
            <span>nombre</span>
          </div>
        </div>
    </div>
  );
};

export default Search;