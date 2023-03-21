import React, {useEffect} from "react";
import "./App.css" 
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  
  const auth = getAuth();


  //const [usuario, setUsuario] = React.useState(null);
  /*useEffect(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      console.log("ya tienes sesion iniciada con: ", firebaseUser)
      setUsuario(firebaseUser);
    })
  } , [])*/

  return <div>app</div>;
}

export default App;
