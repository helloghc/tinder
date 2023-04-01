import React, { useRef, useState } from "react";
import AuthProvider from "src/Components/authProvider";
import { useHistory } from "react-router-dom";
import "./Register.css";
import { existUsername, updateUser, getProfilePhotoUrl, setUserProfilePhoto } from "src/Api/firebase";
import { useForm } from "src/Hooks/useForm";


const initialForm = {
  name: "",
  username: "",
  city: "",
  raza: "",
  vacuna: "",
  edad:"",
};
const validationsForm = (form) => {
  let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexComments = /^.{1,255}$/;
    let regexNumbers = /^[0-9]{8,13}$/;

    if(!form.name.trim()){
        errors.name = "El campo Nombre es requerido";
    }else if(!regexName.test(form.name.trim())){
        errors.name = "Este campo solo admite letras y espacios";
    }
    
    if(!form.username.trim()){
      errors.username = "El campo Username es requerido";
    }else if(!regexName.test(form.username.trim())){
        errors.username = "Este campo solo admite letras y espacios";
    }
    
    if(!form.raza.trim()){
        errors.raza = "El campo Raza es requerido";
    }else if(!regexName.test(form.raza.trim())){
        errors.raza = "Este campo solo admite letras y espacios";
    }

    if(!form.city.trim()){
        errors.city = "El campo Ciudad es requerido";
    }else if(!regexName.test(form.city.trim())){
        errors.city = "Este campo solo admite letras y espacios";
    }
    if(!form.edad.trim()){
        errors.edad = "El campo Edad es requerido";
    }

    if(!form.vacuna.trim()){
        errors.vacuna = "El campo Vacunas es requerido";
    }else if(!regexName.test(form.vacuna.trim())){
        errors.vacuna = "Este campo solo admite letras y espacios";
    }
    return errors;
};


const Register = () => {
  const {
    form,
    errors,
    handleChange,
    handleBlur,
  } = useForm(initialForm, validationsForm);

  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [profileUrl, setProfileUrl] = useState(null);
  const fileRef = useRef();

const history = useHistory();
  
  function handleUserLoggedIn(user) {
    history.push('/');
  }

  function handleUserNotRegistered(user) {
    setCurrentUser(user);
    setCurrentState(3);
  }

  function handleUserNotLoggedIn() {
    history.push('/login');
  }

  async function handleContinue() {
    if ( form.username != "" ) {
      const exists = await existUsername(form.username);
      if(exists){
        setCurrentState(5);
      } else {
        const tmp = {...currentUser};
        tmp.name = form.name;
        tmp.username = form.username;
        tmp.city = form.city;
        tmp.raza = form.raza;
        tmp.edad = form.edad;
        tmp.vacuna = form.vacuna;
        tmp.processCompleted = true;
        await updateUser(tmp);
        setCurrentState(6);
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
        <div className="wrap">
          <p>Nombre de mascota</p>
          <input type="text" name="username" onChange={handleChange} onBlur={handleBlur} value={form.username} />
          {errors.username && <p><strong className="error-form">{errors.username}</strong></p>}
        </div>
        <div className="wrap">
          <p>Nombre del Dueño</p>
          <input type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={form.name} required/>
          {errors.name && <p><strong  className="error-form">{errors.name}</strong></p>}
        </div>
        <div className="wrap">
          <p>Raza</p>
          <input type="text" name="raza" onChange={handleChange} onBlur={handleBlur} value={form.raza} required/>
          {errors.raza && <p><strong className="error-form">{errors.raza}</strong></p>}
        </div>
        <div className="wrap">
          <p>Edad de tu mascota</p>
          <input type="text" name="edad" onChange={handleChange} onBlur={handleBlur} value={form.edad} required/>
          {errors.edad && <p><strong className="error-form">{errors.edad}</strong></p>}
        </div>        
        <div className="wrap">
          <p>Vacunas</p>
          <input type="text" name="vacuna" onChange={handleChange} onBlur={handleBlur} value={form.vacuna} required/>
          {errors.vacuna && <p><strong className="error-form">{errors.vacuna}</strong></p>}
        </div>        
        <div className="wrap">
          <p>Ciudad</p>
          <input type="text" id="city" name="city" onChange={handleChange} onBlur={handleBlur} value={form.city} required/>
          {errors.city && <p><strong className="error-form">{errors.city}</strong></p>}
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

export default Register;
