import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, getDocs, doc, getDoc, query, where, setDoc } from 'firebase/firestore';
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
export const db = getFirestore();

export async function userExist(uid){
    const docRef = doc(database, 'people', uid);
    const res = await getDoc(docRef)
    console.log(res);
    return res.exists();
}

export async function userChatsExist(uid){
    const docRef = doc(database, 'userChats', uid);
    const res = await getDoc(docRef)
    return res.exists();
}

export async function existUsername(username){
    const users = [];
    const docsRef = collection(database, 'people');
    const q = query(docsRef, where('username', '==', username));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        users.push(doc.data());
    });

    return users.length > 0 ? users[0].uid : null;
}
// Buscar Interaccion ------------------------------------------------------------------
export async function existPaw(userUID, currentUserUID){
    const interactions = []; 
    const docsRef = collection(database, 'people', currentUserUID, 'interactions', 'sended', 'paw');
    const q = query(docsRef, where('UIDreceiver', '==', userUID));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        interactions.push(doc.data());
    });

    return interactions.length > 0 ? true : false;
}
export async function existBones(userUID, currentUserUID){
    const interactions = []; 
    const docsRef = collection(database, 'people', currentUserUID, 'interactions', 'sended', 'bones');
    const q = query(docsRef, where('UIDreceiver', '==', userUID));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        interactions.push(doc.data());
    });

    return interactions.length > 0 ? true : false;
}
export async function existWoof(userUID, currentUserUID){
    const interactions = []; 
    const docsRef = collection(database, 'people', currentUserUID, 'interactions', 'sended', 'woof');
    const q = query(docsRef, where('UIDreceiver', '==', userUID));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        interactions.push(doc.data());
    });

    return interactions.length > 0 ? true : false;
}
export async function existLike(userUID, currentUserUID){
    const interactions = []; 
    const docsRef = collection(database, 'people', currentUserUID, 'interactions', 'sended', 'like');
    const q = query(docsRef, where('UIDreceiver', '==', userUID));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        interactions.push(doc.data());
    });

    return interactions.length > 0 ? true : false;
}
//look for id interaction-----------------------------------------------------------------------------------------
export async function currentIdPaw(user, currentUser){
    const interactions = []; 
    var paws = "";
    const docsRef = collection(database, 'people', currentUser.uid, 'interactions', 'sended', 'paw');
    const q = query(docsRef, where('UIDreceiver', '==', user.uid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        interactions.push(`${doc.id}`);
        paws = interactions.join()
        console.log(paws)
    })
    
    return paws;
}
export async function userIdPaw(user, currentUser){
    const interactions = []; 
    var paws = "";
    const docsRef = collection(database, 'people', user.uid, 'interactions', 'received', 'paw');
    const q = query(docsRef, where('UIDsender', '==', currentUser.uid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        interactions.push(`${doc.id}`);
        paws = interactions.join()
        console.log(paws)
    })
    
    return paws;
}
export async function currentIdBones(user, currentUser){
    const interactions = []; 
    var bones = "";
    const docsRef = collection(database, 'people', currentUser.uid, 'interactions', 'sended', 'bones');
    const q = query(docsRef, where('UIDreceiver', '==', user.uid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        interactions.push(`${doc.id}`);
        bones = interactions.join()
        console.log(bones)
    })
    
    return bones;
}
export async function userIdBones(user, currentUser){
    const interactions = []; 
    var bones = "";
    const docsRef = collection(database, 'people', user.uid, 'interactions', 'received', 'bones');
    const q = query(docsRef, where('UIDsender', '==', currentUser.uid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        interactions.push(`${doc.id}`);
        bones = interactions.join()
        console.log(bones)
    })
    
    return bones;
}
export async function currentIdWoof(user, currentUser){
    const interactions = []; 
    var woof = "";
    const docsRef = collection(database, 'people', currentUser.uid, 'interactions', 'sended', 'woof');
    const q = query(docsRef, where('UIDreceiver', '==', user.uid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        interactions.push(`${doc.id}`);
        woof = interactions.join()
        console.log(woof)
    })
    
    return woof;
}
export async function userIdWoof(user, currentUser){
    const interactions = []; 
    var woof = "";
    const docsRef = collection(database, 'people', user.uid, 'interactions', 'received', 'woof');
    const q = query(docsRef, where('UIDsender', '==', currentUser.uid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        interactions.push(`${doc.id}`);
        woof = interactions.join()
        console.log(woof)
    })
    
    return woof;
}
export async function currentIdLike(user, currentUser){
    const interactions = []; 
    var like = "";
    const docsRef = collection(database, 'people', currentUser.uid, 'interactions', 'sended', 'like');
    const q = query(docsRef, where('UIDreceiver', '==', user.uid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        interactions.push(`${doc.id}`);
        like = interactions.join()
        console.log(like)
    })
    
    return like;
}
export async function userIdLike(user, currentUser){
    const interactions = []; 
    var like = "";
    const docsRef = collection(database, 'people', user.uid, 'interactions', 'received', 'like');
    const q = query(docsRef, where('UIDsender', '==', currentUser.uid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        interactions.push(`${doc.id}`);
        like = interactions.join()
        console.log(like)
    })
    
    return like;
}
// -----------------------------------------------------------------------------------------------------------------

export async function existEmail(email){
    const users = [];
    const docsRef = collection(database, 'people');
    const q = query(docsRef, where('email', '==', email));

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
        console.log(error)
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
export async function updateUserChats(user){
    try {
        const collectionRef= collection(database, 'userChats')
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
        const imageRef = ref(storage, `images/${uid}/ProfilePhoto`);
        const resUpload = await uploadBytes(imageRef, file);
        return resUpload;
    } catch (error) {
        console.error(error);
    }
}

export async function uploadPetImages1(uid, file, petName){
    try {
        const imageRef = ref(storage, `images/${uid}/pet/${petName}/1`);
        const resUpload = await uploadBytes(imageRef, file);
        return resUpload;
    } catch (error) {
        console.error(error);
    }
}
export async function uploadPetImages2(uid, file, petName){
    try {
        const imageRef = ref(storage, `images/${uid}/pet/${petName}/2`);
        const resUpload = await uploadBytes(imageRef, file);
        return resUpload;
    } catch (error) {
        console.error(error);
    }
}
export async function uploadPetImages3(uid, file, petName){
    try {
        const imageRef = ref(storage, `images/${uid}/pet/${petName}/3`);
        const resUpload = await uploadBytes(imageRef, file);
        return resUpload;
    } catch (error) {
        console.error(error);
    }
}
export async function uploadPetImages4(uid, file, petName){
    try {
        const imageRef = ref(storage, `images/${uid}/pet/${petName}/4`);
        const resUpload = await uploadBytes(imageRef, file);
        return resUpload;
    } catch (error) {
        console.error(error);
    }
}
export async function uploadPetImages5(uid, file, petName){
    try {
        const imageRef = ref(storage, `images/${uid}/pet/${petName}/5`);
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
export async function getPetPhotoUrl1(uid, petName){
    try {
        const imageRef = ref(storage, `images/${uid}/pet/${petName}/1`);
        const url = await getDownloadURL(imageRef);

        return url
    } catch (error) {
        console.error(error);
    }
    
}
export async function getPetPhotoUrl2(uid, petName){
    try {
        const imageRef = ref(storage, `images/${uid}/pet/${petName}/2`);
        const url = await getDownloadURL(imageRef);

        return url
    } catch (error) {
        console.error(error);
    }
    
}
export async function getPetPhotoUrl3(uid, petName){
    try {
        const imageRef = ref(storage, `images/${uid}/pet/${petName}/3`);
        const url = await getDownloadURL(imageRef);

        return url
    } catch (error) {
        console.error(error);
    }
    
}
export async function getPetPhotoUrl4(uid, petName){
    try {
        const imageRef = ref(storage, `images/${uid}/pet/${petName}/4`);
        const url = await getDownloadURL(imageRef);

        return url
    } catch (error) {
        console.error(error);
    }
    
}
export async function getPetPhotoUrl5(uid, petName){
    try {
        const imageRef = ref(storage, `images/${uid}/pet/${petName}/5`);
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

export  function logout(){
    auth.signOut();
}
