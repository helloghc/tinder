import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL, getBytes } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, setDoc } from 'firebase/firestore';
import 'firebase/compat/firestore';
import { async } from '@firebase/util';

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

export async function existUsername(username){
    const users = [];
    const docsRef = collection(database, 'people');
    const q = query(docsRef, where(username, '==', username));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        users.push(doc.data());
    });

    return users.length > 0 ? users[0].uid : null;
}

export async function registerNewUser(user){
    try{
        const collectionRef = collection(database, 'people');
        const docRef = doc(collectionRef, user.uid);
        await setDoc(docRef, user);
    }catch(error){

    }
}

export async function updateUser(user){
    try {
        const collectionRef= collection(database, 'people')
        const docRef = doc(collectionRef,user.uid)
        await setDoc(docRef, user)
    } catch (error) {
        
    }
}
export async function getUserInfo(uid){
    try {
        const docRef = doc(database, 'people', uid);
        const document = await getDoc(docRef)
        return document.data();
    } catch (error) {
        
    }
}

export async function setUserProfilePhoto(uid, file){
    try {
        const imageRef = ref(storage, `images/${uid}`);
        const resUpload = await uploadBytes(imageRef, file);
        return resUpload;
    } catch (error) {
        console.error(error);
    }
}

export async function getProfilePhotoUrl(profilePicture){
    try {
        const imageRef = ref(storage, profilePicture);
        
        const url = await getDownloadURL(imageRef);

        return url
    } catch (error) {
        console.error(error);
    }
}

export async function getUserPublicProfileInfo(uid){
    const profileInfo = await getUserInfo(uid);

    return {
        profileInfo: profileInfo,
    };
}