import React, {useEffect} from "react";
import AppSession from "./AppSession";
import SessionInit from "./SessionInit";
import { fbase } from "./fb";
import "./App.css"
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  
  const auth = getAuth();


  const [usuario, setUsuario] = React.useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      console.log("ya tienes sesion iniciada con: ", firebaseUser)
      setUsuario(firebaseUser);
    })
  } , [])

  return <>{ usuario ?  <AppSession/> :  <SessionInit setUsuario={setUsuario} />}</>;
}

export default App;
