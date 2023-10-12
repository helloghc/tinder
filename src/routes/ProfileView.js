import React, { useEffect, useRef, useState } from "react";
import "./ProfileView.css";
import AuthProvider from "src/Api/Context/authProvider";
import { useHistory } from "react-router-dom";
import { database, getProfilePhotoUrl, logout, setUserProfilePhoto, updateUser } from "src/Api/firebase";
import { deleteUser, getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { Timestamp, doc, onSnapshot, collection } from "firebase/firestore";


const ProfileView = () => {

  const history = useHistory();
  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [profileUrl, setProfileUrl] = useState(null);
  const [pets, setPets] = useState([]);
  const fileRef = useRef();
  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = database
        .collection('people')
        .doc(currentUser.uid)
        .collection('pet')
        .onSnapshot((snapshot) =>
    setPets(snapshot.docs.map((doc) => doc.data()))
  );
    return () => {
      unsubscribe();
    };
  },[currentUser.uid])
  
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

  function handleOpenFilePicker(){
    if(fileRef.current){
      fileRef.current.click();
    }
  }
  
  function handleChangeFile(e){
    const files = e.target.files;
    const fileReader = new FileReader();
    if(fileReader && files && files.length > 0){
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async function(){
        const imageData = fileReader.result;

        const res = await setUserProfilePhoto(currentUser.uid, imageData)
        console.log(res);

        if(res){
          const tmpUser = {...currentUser};
          tmpUser.profilePicture = res.metadata.fullPath;
          await updateUser(tmpUser);
          setCurrentUser({...tmpUser})
          const url = await getProfilePhotoUrl(currentUser.profilePicture);
          setProfileUrl(url); 
          if(profileUrl != null){
            tmpUser.cardPicture = profileUrl;
            await updateUser(tmpUser);
            setCurrentUser({...tmpUser})
          }
          
        }
      }
    }
  }
  function addpet(){
    history.push('/add-pet')
  }
  async function deleteCurrentUser() {
    history.push('/delete-user')
  };
  function userDoc(){
    console.log(auth.currentUser)
    console.log(Timestamp.now());
  }

  if(currentState != 2){
    return (<AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
  ></AuthProvider>);
           
  }
  return  <div className="page-container">
            <div className="profile">
              <div className="description-labels"><h2>{currentUser.username}</h2></div>
              <div className="profile-img" id="insertProfilePic">
                <img src={profileUrl} alt="Foto de Perfil" onClick={handleOpenFilePicker} width={100}/>
                <input ref={fileRef} type="file" style={{display: 'none'}} onChange={handleChangeFile} />
              </div>
              <div className="description-contain">
                <div className="description-labels"><h3>{currentUser.name}</h3></div>
                <div className="description-labels"><h3>Edad: {currentUser.edad}</h3></div>
                <div className="description-labels"><h3>Ciudad: {currentUser.city}</h3></div>
              </div>
              <div>
                <button className="signout" onClick={addpet} >Agregar Mascota</button>
              </div>
              <div>
                <button className="signout" onClick={logout} >SignOut</button>
              </div>
              <div>
                <button className="signout" onClick={deleteCurrentUser} >Delete User</button>
              </div>
              <div>
                <button className="signout" onClick={userDoc} >User</button>
              </div>
            </div>
            {pets.map((pet)=>(
              <div className="profile">
                <div className="profile-img" id="insertProfilePic">
                <img src={pet.petPhoto} alt={"Foto de "+ pet.petName} width={40}/>
               </div>
                <div>{pet.petName}</div>
                <div>
                  <button className="signout" onClick="" >Convertir en principal</button>
                </div>
              </div>
              
            ))}
          </div>

};



export default ProfileView;
