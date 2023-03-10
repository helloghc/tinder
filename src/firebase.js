import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
    "projectId": "tinderclone-3d015",
    "appId": "1:309235698223:web:23ca6745f5c9cad549d4da",
    "storageBucket": "tinderclone-3d015.appspot.com",
    "apiKey": "AIzaSyB0Ljn9h4XMgoAJ3oMgiG18kASbwfH0Me8",
    "authDomain": "tinderclone-3d015.firebaseapp.com",
    "messagingSenderId": "309235698223"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const database = firebaseApp.firestore();

export default database;