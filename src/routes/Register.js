import React, { useRef, useState } from "react";
import AuthProvider from "src/Api/Context/authProvider";
import { useHistory } from "react-router-dom";
import "./Register.css";
import { existUsername, updateUser, getProfilePhotoUrl, setUserProfilePhoto, database } from "src/Api/firebase";
import { useForm } from "src/Hooks/useForm";



const initialForm = {
  name: "",
  pet:"",
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
        errors.name = "Nombre es requerido";
    }else if(!regexName.test(form.name.trim())){
        errors.name = "Este campo solo admite letras y espacios";
    }
    
    if(!form.username.trim()){
      errors.username = "El campo Username es requerido";
    }

    if(!form.pet.trim()){
      errors.pet = "Nombre de mascota es requerido";
    }else if(!regexName.test(form.pet.trim())){
        errors.pet = "Este campo solo admite letras y espacios";
    }
    
    if(!form.raza.trim()){
        errors.raza = "Raza es requerida";
    }else if(!regexName.test(form.raza.trim())){
        errors.raza = "Este campo solo admite letras y espacios";
    }

    if(!form.city.trim()){
        errors.city = "Ciudad es requerida";
    }else if(!regexName.test(form.city.trim())){
        errors.city = "Este campo solo admite letras y espacios";
    }
    if(!form.edad.trim()){
        errors.edad = "Edad es requerida";
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

  async function handleUserNotRegistered(user) {
    setCurrentUser(user);
    const url = await getProfilePhotoUrl(user.profilePicture);
    setProfileUrl(url);
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
        tmp.cardPicture= profileUrl;
        tmp.name = form.name;
        tmp.username = form.username;
        tmp.pet = form.pet;
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
        <div className="wrap">
          <input type="text" name="username" placeholder="Nombre de Usuario" onChange={handleChange} onBlur={handleBlur} value={form.username} />
          {errors.username && <p><strong className="error-form">{errors.username}</strong></p>}
        </div>
        <div className="wrap">
          <input type="text" name="pet" placeholder="Nombre de tu Mascota" onChange={handleChange} onBlur={handleBlur} value={form.pet} />
          {errors.pet && <p><strong className="error-form">{errors.pet}</strong></p>}
        </div>
        <div className="wrap">
          <input type="text" name="name" placeholder="Tu Nombre" onChange={handleChange} onBlur={handleBlur} value={form.name} required/>
          {errors.name && <p><strong  className="error-form">{errors.name}</strong></p>}
        </div>
        <div className="wrap">
          <input type="text" name="raza" placeholder="Raza de tu Mascota" onChange={handleChange} onBlur={handleBlur} value={form.raza} required/>
          {errors.raza && <p><strong className="error-form">{errors.raza}</strong></p>}
        </div>
        <div className="wrap">
          <input type="text" name="edad" placeholder="Edad de tu Mascota" onChange={handleChange} onBlur={handleBlur} value={form.edad} required/>
          {errors.edad && <p><strong className="error-form">{errors.edad}</strong></p>}
        </div>        
        <div className="wrap">
          <input type="text" name="vacuna" placeholder="¿Que vacunas tíene tu Mascota?" onChange={handleChange} onBlur={handleBlur} value={form.vacuna} required/>
          {errors.vacuna && <p><strong className="error-form">{errors.vacuna}</strong></p>}
        </div>        
        <div className="wrap">
          <input type="text" id="city" name="city" placeholder="Ciudad" onChange={handleChange} onBlur={handleBlur} value={form.city} required/>
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
