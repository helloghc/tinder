import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadbytes, getDownloadURL, getBytes } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, setDoc } from 'firebase/firestore';
import 'firebase/compat/firestore';

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
};

const firebaseApp = firebase.initializeApp(firebaseConfig);




export const authForGoogle = getAuth(firebaseApp);
export const auth = getAuth(firebaseApp);
export const database = firebaseApp.firestore();
export const storage = getStorage(firebaseApp);

export async function userExist(uid){
    const docRef = doc(database, 'people', uid);
    const res = await getDoc(docRef)
    console.log(res);
    return res.exists();
}