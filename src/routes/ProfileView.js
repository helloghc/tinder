import React, { useRef, useState } from "react";
import "./ProfileView.css";
import AuthProvider from "src/Components/authProvider";
import { Link, useHistory } from "react-router-dom";
import { getProfilePhotoUrl, setUserProfilePhoto, updateUser } from "src/Api/firebase";
import { Sync } from "@material-ui/icons";


const ProfileView = () => {

  const history = useHistory();
  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [profileUrl, setProfileUrl] = useState(null);
  const fileRef = useRef();

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
                <div className="description-labels"><h3>Dueño: {currentUser.name}</h3></div>
                <div className="description-labels"><h3>Raza: {currentUser.raza}</h3></div>
                <div className="description-labels"><h3>Edad: {currentUser.edad}</h3></div>
                <div className="description-labels"><h3>Edad: {currentUser.city}</h3></div>
              </div>
              <div>
                <Link to="/signout">
                  <button className="signout">SignOut</button>
                </Link>
              </div>
            </div>
            
          </div>

};



export default ProfileView;
