import React, {useState, useEffect} from "react";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import { paw, bones, woof, like, deletePaw, deleteBones, deleteLike, deleteWoof } from "./SwipeButtons";
import { existBones, existLike, existPaw, existWoof } from "src/Api/firebase";

  
export  function Paw({user, currentUser}) {
  const [isPaw, setIsPaw] = useState(false)
  useEffect(()=>{
    async function existInteraction(user, currentUser){
      const exist = await existPaw(user.uid, currentUser.uid);
      if (exist) {
        setIsPaw(true);
      }
    }
    existInteraction(user, currentUser)
  }, [user, currentUser])

  return (
    <section>
      {isPaw == true ? (
        <IconButton className="swipeButtons__repeat" onClick={()=>{setIsPaw(false); console.log("Dislike a " + user.username); deletePaw(user, currentUser)}}><DoneIcon/></IconButton>
      ) : (
        <IconButton className="swipeButtons__used" onClick={()=>{setIsPaw(true); console.log("Like a " + user.username); paw(user, currentUser)}}><DoneIcon/></IconButton>
      )}
    </section>
    
  );
}
export function Bones({user, currentUser}) {
  const [isBones, setIsBones] = useState(false)
  useEffect(()=>{
    async function existInteraction(user, currentUser){
      const exist = await existBones(user.uid, currentUser.uid);
      if (exist) {
        setIsBones(true);
      }
    }
    existInteraction(user, currentUser)
  }, [user, currentUser])

  return (
    <section>
      {isBones == true ? (
        <IconButton className="swipeButtons__left" onClick={()=>{setIsBones(false); console.log("Dislike a " + user.username); deleteBones(user, currentUser)}}><CloseIcon/></IconButton>
      ) : (
        <IconButton className="swipeButtons__used" onClick={()=>{setIsBones(true); console.log("Like a " + user.username); bones(user,currentUser)}}><CloseIcon/></IconButton>
      )}
    </section>
    
  );
}
export function Woof({user, currentUser}) {
  const [isWoof, setIsWoof] = useState(false)
  useEffect(()=>{
    async function existInteraction(user, currentUser){
      const exist = await existWoof(user.uid, currentUser.uid);
      if (exist) {
        setIsWoof(true);
      }
    }
    existInteraction(user, currentUser)
  }, [user, currentUser])

  return (
    <section>
      {isWoof == true ? (
        <IconButton className="swipeButtons__star" onClick={()=>{setIsWoof(false); console.log("Dislike a " + user.username); deleteWoof(user, currentUser)}}><StarRateIcon/></IconButton>
      ) : (
        <IconButton className="swipeButtons__used" onClick={()=>{setIsWoof(true); console.log("Like a " + user.username); woof(user,currentUser)}}><StarRateIcon/></IconButton>
      )}
    </section>
    
  );
}
export function Like({user, currentUser}) {
  const [isLike, setIsLike] = useState(false)
  useEffect(()=>{
    async function existInteraction(user, currentUser){
      const exist = await existLike(user.uid, currentUser.uid);
      if (exist) {
        setIsLike(true);
      }
    }
    existInteraction(user, currentUser)
  }, [user, currentUser])

  return (
    <section>
      {isLike == true ? (
        <IconButton className="swipeButtons__right" onClick={()=>{setIsLike(false); console.log("Dislike a " + user.username); deleteLike(user, currentUser)}}><FavoriteIcon/></IconButton>
      ) : (
        <IconButton className="swipeButtons__used" onClick={()=>{setIsLike(true); console.log("Like a " + user.username); like(user,currentUser)}}><FavoriteIcon/></IconButton>
      )}
    </section>
    
  );
}
