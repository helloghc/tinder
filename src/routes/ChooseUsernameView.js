import React, { useState } from "react";
import AuthProvider from "src/Components/authProvider";
import { useHistory } from "react-router-dom";
import "./ChooseUsernameView.css";
import { existUsername, updateUser } from "src/Api/firebase";
import { useForm } from "src/Hooks/useForm";


const initialForm = {
  name: "",
  username: "",
  city: "",
  estado: "",
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
    
    if(!form.estado.trim()){
        errors.estado = "El campo Estado es requerido";
    }else if(!regexName.test(form.estado.trim())){
        errors.estado = "Este campo solo admite letras y espacios";
    }

    if(!form.city.trim()){
        errors.city = "El campo Ciudad es requerido";
    }else if(!regexName.test(form.city.trim())){
        errors.city = "Este campo solo admite letras y espacios";
    }
    return errors;
};


const ChooseUsernameView = () => {
  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm, validationsForm);

  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [estado, setEstado] = useState("");

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
  
  /*function handleInputUsername(e){
    setUsername(e.target.value);
  }
  function handleInputCity(e){
    setCity(e.target.value);
  }
  function handleInputEstado(e){
    setEstado(e.target.value);
  }
  function handleInputName(e){
    setName(e.target.value);
  }*/

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
        tmp.estado = form.estado;
        tmp.processCompleted = true;
        await updateUser(tmp);
        setCurrentState(6);
      }
    }
  }

  if(currentState == 3 || currentState == 5){
    return <div>
      <h1> Bienvenido</h1>
      <p>Nombre y Apellido</p>
      <div>
        <input type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={form.name} />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <hr/><br/>
      <p>Elige tu Nombre de Usuario</p>
      <div>
        <input type="text" name="username" onChange={handleChange} onBlur={handleBlur} value={form.username} required/>
        {errors.username && <p>{errors.username}</p>}
      </div>
      <p>Estado</p>
      <div>
        <input type="text" name="estado" onChange={handleChange} onBlur={handleBlur} value={form.estado} required/>
        {errors.estado && <p>{errors.estado}</p>}
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

export default ChooseUsernameView;
