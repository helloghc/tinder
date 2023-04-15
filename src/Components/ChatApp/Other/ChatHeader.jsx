import React, { useContext } from "react";
import "./ChatHeader.css";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link, useHistory } from "react-router-dom";
import { ChatContext } from "src/Api/Context/ChatContext";


function ChatHeader() {
  const { data } = useContext(ChatContext);
  
  return (
    <div className="ChatHeader">
        <div className="headerLinkOne">
          <Link to="/chat">
            <IconButton className="iconButton">
              <ArrowBackIosIcon className="header__icon" fontSize="large" />
            </IconButton>
          </Link>
        </div>
        <div className="headerLinkTwo"> 
            <Link to={`/u/${data.user?.username}`}>
                <div className="infoContainer">
                    <img className="userChat-img" src={data.user?.cardPicture} alt="" />
                    <span className="header__username">{data.user?.name} | ({data.user?.username})</span>
                </div>
            </Link> 
        </div>
    </div>
  );
}

export default ChatHeader;
