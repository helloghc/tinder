import React, { useRef, useState } from "react";
import AuthProvider from "src/Api/Context/authProvider";
import { useHistory } from "react-router-dom";
import "./Register.css";
import { existUsername, updateUser, getProfilePhotoUrl, setUserProfilePhoto, database } from "src/Api/firebase";
import { useForm } from "src/Hooks/useForm";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { serverTimestamp } from "firebase/firestore";



const UploadImages = () => {

  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [profileUrl, setProfileUrl] = useState(null);
  const fileRef = useRef();

const history = useHistory();
  
  function handleUserLoggedIn(user) {
    history.push('/');
  }

  async function handleUserNotRegistered(user) {
    setCurrentUser(user);
    setCurrentState(3);
  }

  function handleUserNotLoggedIn() {
    history.push('/login');
  }

  
  async function handleContinue(e) {
    e.preventDefault();
    if ( true ) {
      const exists = await existUsername("");
      if(exists){

      } else {        
        const tmp = {...currentUser};
        tmp.cardPicture= profileUrl;
        tmp.created = serverTimestamp();
        await updateUser(tmp);
      }
    }
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
          if(profileUrl != null){
            tmpUser.cardPicture = profileUrl;
            await updateUser(tmpUser);
            setCurrentUser({...tmpUser})
          }
        }
      }
    }
  }

  if(currentState == 3 || currentState == 5){
    return <div className="register">
      <div className="register-container">
        <h1> Regístrate </h1>
        <div className="profileimg" onClick={handleOpenFilePicker}>
          <img className="image" src={profileUrl} alt="" />
          <input ref={fileRef} type="file" style={{display: 'none'}} onChange={handleChangeFile} />
        </div>
        <div>
          <button className="button-continue" onClick={handleContinue}>Continuar</button>
        </div>
      </div>
    </div> 
  }

  return (<AuthProvider
    onUserLoggedIn={handleUserLoggedIn}
    onUserNotRegistered={handleUserNotRegistered}
    onUserNotLoggedIn={handleUserNotLoggedIn}
></AuthProvider>);
};

export default UploadImages;
