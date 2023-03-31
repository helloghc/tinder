import React, { useRef, useState } from "react";
import "./ProfileView.css";
import AuthProvider from "src/Components/authProvider";
import { Link, useHistory } from "react-router-dom";
import { getProfilePhotoUrl, setUserProfilePhoto, updateUser } from "src/Api/firebase";


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

        const res = await setUserProfilePhoto(currentUser.uid, imageData);
        console.log(res);

        if(res){
          const tmpUser = {...currentUser};
          tmpUser.profilePicture = res.metadata.fullPath;
          await updateUser(tmpUser);
          setCurrentUser({...tmpUser})
          const url = await getProfilePhotoUrl(currentUser.profilePicture);
          setProfileUrl(url); 
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
              <h2>Edit Profile</h2>
              <div className="profile-container">
                <div className="profile-img" id="insertProfilePic">
                  <img src={profileUrl} alt="Foto de Perfil" onClick={handleOpenFilePicker} width={100}/>
                  <input ref={fileRef} type="file" style={{display: 'none'}} onChange={handleChangeFile} />
                </div>
              </div>
            </div>
            <div>
              <Link to="/signout">
                <button>SignOut</button>
              </Link>
            </div>
          </div>

};



export default ProfileView;
