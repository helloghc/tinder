import React, {useState, useEffect} from "react";
import { currentIdPaw, database, userIdPaw, currentIdBones, userIdBones, currentIdWoof, userIdWoof, currentIdLike, userIdLike } from "src/Api/firebase";
import { collection, doc } from 'firebase/firestore'
import { serverTimestamp } from "firebase/firestore";


  export async function paw(userInteract, currentUser){
    
    console.log("Paw")
    console.log(currentUser.username + " Interactua con " + (userInteract.username))
    database.collection('people').doc(currentUser.uid).collection('interactions').doc('sended').collection('paw').add({
        Date: serverTimestamp(),
        UIDsender:currentUser.uid,
        type:"paw",
        USERsender: currentUser.username,
        UIDreceiver: userInteract.uid,
        USERreceiver: userInteract.username,

  })
    database.collection('people').doc(userInteract.uid).collection('interactions').doc('received').collection('paw').add({
      Date: serverTimestamp(),
      UIDsender:currentUser.uid,
      type:"paw",
      USERsender:currentUser.username,
      UIDreceiver:userInteract.uid,
      USERreceiver: userInteract.username,
    })     

  }

  export async function bones(userInteract, currentUser){
    console.log("bones")
    console.log(currentUser.username + " Interactua con " + (userInteract.username))
    database.collection('people').doc(currentUser.uid).collection('interactions').doc('sended').collection('bones').add({
        Date: serverTimestamp(),
        UIDsender:currentUser.uid,
        type:"bones",
        USERsender: currentUser.username,
        UIDreceiver: userInteract.uid,
        USERreceiver: userInteract.username,

  })
    database.collection('people').doc(userInteract.uid).collection('interactions').doc('received').collection('bones').add({
      Date: serverTimestamp(),
      UIDsender:currentUser.uid,
      type:"bones",
      USERsender:currentUser.username,
      UIDreceiver:userInteract.uid,
      USERreceiver: userInteract.username,
    })
  }

  export async function woof(userInteract, currentUser){
    console.log("woof")
    console.log(currentUser.username + " Interactua con " + (userInteract.username))
    database.collection('people').doc(currentUser.uid).collection('interactions').doc('sended').collection('woof').add({
        Date: serverTimestamp(),
        UIDsender:currentUser.uid,
        type:"woof",
        USERsender: currentUser.username,
        UIDreceiver: userInteract.uid,
        USERreceiver: userInteract.username,

  })
    database.collection('people').doc(userInteract.uid).collection('interactions').doc('received').collection('woof').add({
      Date: serverTimestamp(),
      UIDsender:currentUser.uid,
      type:"woof",
      USERsender:currentUser.username,
      UIDreceiver:userInteract.uid,
      USERreceiver: userInteract.username,
    })
  }

  export async function like(userInteract, currentUser){
    console.log("like")
    console.log(currentUser.username + " Interactua con " + (userInteract.username))
    database.collection('people').doc(currentUser.uid).collection('interactions').doc('sended').collection('like').add({
        Date: serverTimestamp(),
        UIDsender:currentUser.uid,
        type:"like",
        USERsender: currentUser.username,
        UIDreceiver: userInteract.uid,
        USERreceiver: userInteract.username,

  })
    database.collection('people').doc(userInteract.uid).collection('interactions').doc('received').collection('like').add({
      Date: serverTimestamp(),
      UIDsender:currentUser.uid,
      type:"like",
      USERsender:currentUser.username,
      UIDreceiver:userInteract.uid,
      USERreceiver: userInteract.username,
    })    
  }
  

//Delete-----------------------------------------------------------------------------------------------------------

export async function deletePaw(user, currentUser){
  var currentId = await currentIdPaw(user, currentUser);
  var userId = await userIdPaw(user, currentUser);
  const currentRef = database.collection('people').doc(currentUser.uid).collection('interactions').doc('sended').collection('paw').doc(currentId)
  const userRef = database.collection('people').doc(user.uid).collection('interactions').doc('received').collection('paw').doc(userId)
  currentRef.delete().catch(error => console.log(error));
  userRef.delete().catch(error => console.log(error));
}
export async function deleteBones(user, currentUser){
  var currentId = await currentIdBones(user, currentUser);
  var userId = await userIdBones(user, currentUser);
  const currentRef = database.collection('people').doc(currentUser.uid).collection('interactions').doc('sended').collection('bones').doc(currentId)
  const userRef = database.collection('people').doc(user.uid).collection('interactions').doc('received').collection('bones').doc(userId)
  currentRef.delete().catch(error => console.log(error));
  userRef.delete().catch(error => console.log(error));
}
export async function deleteWoof(user, currentUser){
  var currentId = await currentIdWoof(user, currentUser);
  var userId = await userIdWoof(user, currentUser);
  const currentRef = database.collection('people').doc(currentUser.uid).collection('interactions').doc('sended').collection('woof').doc(currentId)
  const userRef = database.collection('people').doc(user.uid).collection('interactions').doc('received').collection('woof').doc(userId)
  currentRef.delete().catch(error => console.log(error));
  userRef.delete().catch(error => console.log(error));
}
export async function deleteLike(user, currentUser){
  var currentId = await currentIdLike(user, currentUser);
  var userId = await userIdLike(user, currentUser);
  const currentRef = database.collection('people').doc(currentUser.uid).collection('interactions').doc('sended').collection('like').doc(currentId)
  const userRef = database.collection('people').doc(user.uid).collection('interactions').doc('received').collection('like').doc(userId)
  currentRef.delete().catch(error => console.log(error));
  userRef.delete().catch(error => console.log(error));
}