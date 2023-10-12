import React, { useRef, useState } from "react";
import AuthProvider from "src/Api/Context/authProvider";
import { useHistory } from "react-router-dom";
import "./Register.css";
import { existUsername, updateUser, getProfilePhotoUrl, uploadPetImages, database, petExist, getPetPhotoUrl1, uploadPetImages5, uploadPetImages4, uploadPetImages3, uploadPetImages2, uploadPetImages1, getPetPhotoUrl4, getPetPhotoUrl5, getPetPhotoUrl3, getPetPhotoUrl2 } from "src/Api/firebase";
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
  const [petPhotoUrl1, setPetPhotoUrl1] = useState(null);
  const [petPhotoUrl2, setPetPhotoUrl2] = useState(null);
  const [petPhotoUrl3, setPetPhotoUrl3] = useState(null);
  const [petPhotoUrl4, setPetPhotoUrl4] = useState(null);
  const [petPhotoUrl5, setPetPhotoUrl5] = useState(null);
  const fileRef1 = useRef();
  const fileRef2 = useRef();
  const fileRef3 = useRef();
  const fileRef4 = useRef();
  const fileRef5 = useRef();


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
        petPhoto: (petPhotoUrl1, petPhotoUrl2, petPhotoUrl3, petPhotoUrl4, petPhotoUrl5),
        created: serverTimestamp(),
        age: form.age,
        vaccines: form.vaccines,
    })
    console.log("Arriba");
  }
 // async function busqueda(){
   // const exists = await petExist(form.petName);
    //if (exists) {
      //console.log(exists + "si existe")
    //}
  //}
  function handleOpenFilePicker(){
    if(fileRef1.current){
      fileRef1.current.click();
    }else if (fileRef2.current){
      fileRef2.current.click();
    }else if (fileRef3.current){
      fileRef3.current.click();
    }else if (fileRef4.current){
      fileRef4.current.click();
    }else if (fileRef5.current){
      fileRef5.current.click();
    }
  }

  function handleChangeFile1(e){
    const files = e.target.files;
    const fileReader = new FileReader();
    if(fileReader && files && files.length > 0){
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async function(){
        const imageData = fileReader.result;
        console.log(imageData);
        const res = await uploadPetImages1(currentUser.uid, imageData, form.petName);
        console.log("Ya esta arriba");
        console.log(res);

        if(res){
          const url = await getPetPhotoUrl1(currentUser.uid, form.petName);
          if(url){
            setPetPhotoUrl1(url); 
          }

        }
      }
    }
  }
  function handleChangeFile2(e){
    const files = e.target.files;
    const fileReader = new FileReader();
    if(fileReader && files && files.length > 0){
      fileReader.readAsArrayBuffer(files[1]);
      fileReader.onload = async function(){
        const imageData = fileReader.result;
        console.log(imageData);
        const res = await uploadPetImages2(currentUser.uid, imageData, form.petName);
        console.log("Ya esta arriba");
        console.log(res);

        if(res){
          const url = await getPetPhotoUrl2(currentUser.uid, form.petName);
          if(url){
            setPetPhotoUrl2(url); 
          }

        }
      }
    }
  }
  function handleChangeFile3(e){
    const files = e.target.files;
    const fileReader = new FileReader();
    if(fileReader && files && files.length > 0){
      fileReader.readAsArrayBuffer(files[2]);
      fileReader.onload = async function(){
        const imageData = fileReader.result;
        console.log(imageData);
        const res = await uploadPetImages3(currentUser.uid, imageData, form.petName);
        console.log("Ya esta arriba");
        console.log(res);

        if(res){
          const url = await getPetPhotoUrl3(currentUser.uid, form.petName);
          if(url){
            setPetPhotoUrl3(url); 
          }

        }
      }
    }
  }
  function handleChangeFile4(e){
    const files = e.target.files;
    const fileReader = new FileReader();
    if(fileReader && files && files.length > 0){
      fileReader.readAsArrayBuffer(files[3]);
      fileReader.onload = async function(){
        const imageData = fileReader.result;
        console.log(imageData);
        const res = await uploadPetImages4(currentUser.uid, imageData, form.petName);
        console.log("Ya esta arriba");
        console.log(res);

        if(res){
          const url = await getPetPhotoUrl4(currentUser.uid, form.petName);
          if(url){
            setPetPhotoUrl4(url); 
          }

        }
      }
    }
  }
  function handleChangeFile5(e){
    const files = e.target.files;
    const fileReader = new FileReader();
    if(fileReader && files && files.length > 0){
      fileReader.readAsArrayBuffer(files[4]);
      fileReader.onload = async function(){
        const imageData = fileReader.result;
        console.log(imageData);
        const res = await uploadPetImages5(currentUser.uid, imageData, form.petName);
        console.log("Ya esta arriba");
        console.log(res);

        if(res){
          const url = await getPetPhotoUrl5(currentUser.uid, form.petName);
          if(url){
            setPetPhotoUrl5(url); 
          }

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
        <div className="images-wrap">
          <div className="profileimg" onClick={handleOpenFilePicker}>
            <img className="image" src={petPhotoUrl1} alt="" />
            <input ref={fileRef1} type="file" style={{display: 'none'}} onChange={handleChangeFile1} />
          </div>
          <div className="profileimg" onClick={handleOpenFilePicker}>
            <img className="image" src={petPhotoUrl2} alt="" />
            <input ref={fileRef2} type="file" style={{display: 'none'}} onChange={handleChangeFile2} />
          </div>
          <div className="profileimg" onClick={handleOpenFilePicker}>
            <img className="image" src={petPhotoUrl3} alt="" />
            <input ref={fileRef3} type="file" style={{display: 'none'}} onChange={handleChangeFile3} />
          </div>
          <div className="profileimg" onClick={handleOpenFilePicker}>
            <img className="image" src={petPhotoUrl4} alt="" />
            <input ref={fileRef4} type="file" style={{display: 'none'}} onChange={handleChangeFile4} />
          </div>
          <div className="profileimg" onClick={handleOpenFilePicker}>
            <img className="image" src={petPhotoUrl5} alt="" />
            <input ref={fileRef5} type="file" style={{display: 'none'}} onChange={handleChangeFile5} />
          </div>
        </div>
        <div>
          <button className="button-continue" onClick={handleContinue}>Continuar</button>
        </div>
      </div>
    </div> 
  
};

export default AddPetView;
