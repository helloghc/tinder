import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB0Ljn9h4XMgoAJ3oMgiG18kASbwfH0Me8",
    authDomain: "tinderclone-3d015.firebaseapp.com",
    projectId: "tinderclone-3d015",
    storageBucket: "tinderclone-3d015.appspot.com",
    messagingSenderId: "309235698223",
    appId: "1:309235698223:web:cc55541cfb5d035b49d4da"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const database = firebaseApp.firestore();

export default database;