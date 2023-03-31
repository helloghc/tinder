import React, { useState } from "react";
import AuthProvider from "src/Components/authProvider";
import { useHistory } from "react-router-dom";
import "./Register.css";
import { existUsername, updateUser } from "src/Api/firebase";
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
    }else if(!regexName.test(form.edad.trim())){
        errors.edad = "Este campo solo admite letras y espacios";
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

  if(currentState == 3 || currentState == 5){
    return <div>
      <h1> Bienvenido</h1>
      <p>Nombre de mascota</p>
      <div>
        <input type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={form.username} />
        {errors.username && <p>{errors.username}</p>}
      </div>
      <hr/><br/>
      <p>Elige tu Nombre de Usuario</p>
      <div>
        <input type="text" name="username" onChange={handleChange} onBlur={handleBlur} value={form.name} required/>
        {errors.name && <p>{errors.name}</p>}
      </div>
      <p>Estado</p>
      <div>
        <input type="text" name="raza" onChange={handleChange} onBlur={handleBlur} value={form.raza} required/>
        {errors.raza && <p>{errors.raza}</p>}
      </div>
      <p>edad de tu mascota</p>
      <div>
        <input type="text" name="raza" onChange={handleChange} onBlur={handleBlur} value={form.edad} required/>
        {errors.edad && <p>{errors.edad}</p>}
      </div>
      <p>Vacunas</p>
      <div>
        <input type="text" name="city" onChange={handleChange} onBlur={handleBlur} value={form.vacuna} required/>
        {errors.vacuna && <p>{errors.vacuna}</p>}
      </div>
      <p>Ciudad</p>
      <div>
        <input type="text" name="city" onChange={handleChange} onBlur={handleBlur} value={form.city} required/>
        {errors.city && <p>{errors.city}</p>}
      </div>
      <div>
        <button onClick={handleContinue}>Continuar</button>
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
