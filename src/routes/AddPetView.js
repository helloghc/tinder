import React, { useRef, useState } from "react";
import AuthProvider from "src/Api/Context/authProvider";
import { useHistory } from "react-router-dom";
import "./Register.css";
import { existUsername, updateUser, getProfilePhotoUrl, uploadPetImages, database, petExist, getPetPhotoUrl } from "src/Api/firebase";
import { useForm } from "src/Hooks/useForm";
import { updateDoc, doc, arrayUnion, addDoc, collection, setDoc, serverTimestamp } from "firebase/firestore";



const initialForm = {
  name: "",
  username: "",
  city: "",
  edad:"",
};
const validationsForm = (form) => {
  let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexComments = /^.{1,255}$/;
    let regexNumbers = /^[0-9]{8,13}$/;

    if(!form.petName.trim()){
      errors.petName = "El nombre de tu mascota es requerido";
    }
    return errors;
};


const AddPetView = () => {
  const {
    form,
    errors,
    handleChange,
    handleBlur,
  } = useForm(initialForm, validationsForm);

  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [petPhotoUrl, setPetPhotoUrl] = useState(null);
  const fileRef = useRef();

const history = useHistory();
  

  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    setCurrentState(2);
  }

  function handleUserNotLoggedIn() {
    history.push('/login');
  }
  
  

  async function handleContinue(e) {
    e.preventDefault();  
    database.collection('people').doc(currentUser.uid).collection('pet').add({
        petName: form.petName,
        petPhoto: petPhotoUrl,
        created: serverTimestamp(),
        age: form.age,
        vaccines: form.vaccines,
    })
    console.log("Arriba");
  }
  async function busqueda(){
    const exists = await petExist(form.petName);
    if (exists) {
      console.log(exists + "si existe")
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
        console.log(imageData);
        const res = await uploadPetImages(currentUser.uid, imageData, form.petName);
        console.log("Ya esta arriba");
        console.log(res);

        if(res){
          const url = await getPetPhotoUrl(currentUser.uid, form.petName);
          setPetPhotoUrl(url); 
        }
      }
    }
  }

  

  if(currentState != 2){
    return (<AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
  ></AuthProvider>);
  }
  return <div className="register">
      <div className="register-container">
        <h1> Agrega tu Mascota </h1>
        <div className="wrap">
          <input type="text" name="petName" placeholder="Nombre de tu Mascota" onChange={handleChange} onBlur={handleBlur} value={form.petName} />
          {errors.petName && <p><strong className="error-form">{errors.petName}</strong></p>}
        </div>
        <div className="wrap">
          <input type="text" name="age" placeholder="edad de tu Mascota" onChange={handleChange} onBlur={handleBlur} value={form.age} />
          {errors.age && <p><strong className="error-form">{errors.age}</strong></p>}
        </div>
        <div className="wrap">
          <input type="text" name="vaccines" placeholder="Que vacunas tiene tu mascota?" onChange={handleChange} onBlur={handleBlur} value={form.vaccines} />
          {errors.vaccines && <p><strong className="error-form">{errors.vaccines}</strong></p>}
        </div>
        <h3> Agrega una foto </h3>
        <div className="profileimg" onClick={handleOpenFilePicker}>
          <img className="image" src={petPhotoUrl} alt="" />
          <input ref={fileRef} type="file" style={{display: 'none'}} onChange={handleChangeFile} />
        </div>
        <div>
          <button className="button-continue" onClick={handleContinue}>Continuar</button>
        </div>
      </div>
    </div> 
  
};

export default AddPetView;
