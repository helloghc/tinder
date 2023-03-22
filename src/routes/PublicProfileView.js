import React, { useEffect, useState } from "react";
import "./PublicProfileView.css";
import { useParams } from "react-router-dom";
import { existUsername, getProfilePhotoUrl, getUserPublicProfileInfo } from "src/Api/firebase";
import { async } from "@firebase/util";

const PublicProfileView = () => {
  const params = useParams();
  const [profile, setProfile] = useState(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    getProfile();

    async function getProfile(){
    
      const username = params.username; 
      console.log(username); 
      console.log(params , "adasdasd");
      console.log(profile, "no existe");
      try {
        const userUid = await existUsername(username);
        console.log(userUid);
        if (userUid) {
          const userInfo = await getUserPublicProfileInfo(userUid);
          setProfile(userInfo);
          

          const url = await getProfilePhotoUrl(userInfo.profileInfo.profilePicture);
          setUrl(url);
          console.log(userInfo);
        }
      } catch (error) {

      }
    }    
  }, [ params ]);

  return  <div className="profile">
            <div>
              <h2>Profile</h2>
            </div>
            <div className="profile-img">
              <img  />
            </div>
            <div>
              <h2>username</h2>
              <p>displayName</p>
            </div>
          </div>;
};

export default PublicProfileView;
