import React, { useEffect, useState } from "react";
import "./PublicProfileView.css";
import { useParams } from "react-router-dom";
import { existUsername, getProfilePhotoUrl, getUserPublicProfileInfo } from "src/Api/firebase";
import { async } from "@firebase/util";

const PublicProfileView = () => {
  const params = useParams();
  const [profile, setProfile] = useState(null);
  const [url, setUrl] = useState("");
  const [state, setState] = useState(0);

  useEffect(() => {
    getProfile();

    async function getProfile(){
    
      const username = params.username; 
      console.log(username);
      try {
        const userUid = await existUsername(username);
        console.log(userUid);
        if (userUid) {
          const userInfo = await getUserPublicProfileInfo(userUid);
          setProfile(userInfo);
          

          const url = await getProfilePhotoUrl(userInfo.profileInfo.profilePicture);
          setUrl(url);
          console.log(userInfo);
        } else {
          setState(7);
        }
      } catch (error) {

      }
    }    
  }, [ params ]);

  if(state == 7){
    return <div>Username Doesn't exist</div>
  }

  return  <div className="profile">
            <div>
              <h2>Profile</h2>
            </div>
            <div className="profile-img">
              <img src={url} alt="" />
            </div>
            <div>
              <h2>username: {profile?.profileInfo.username}</h2>
              <p>displayName: </p>
            </div>
          </div>;
};

export default PublicProfileView;
