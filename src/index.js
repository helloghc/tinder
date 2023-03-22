import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Header from "./Components/Header";
import TinderCards from "./Components/TinderCards";
import SwipeButtons from "./Components/SwipeButtons";
import Chats from "./Views/Chats";
import ChatScreen from "./Views/ChatScreen";
import * as serviceWorker from './Components/serviceWorker.js';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginView from './routes/LoginView';
import ProfileView from './routes/ProfileView';
import SignOutView from './routes/SignOutView';
import PublicProfileView from './routes/PublicProfileView'
import ChooseUsernameView from './routes/ChooseUsernameView'

ReactDOM.render(
      <BrowserRouter>
        <Switch>
          <Route exact path="/chat/:person">
            <Header backButton="/chat" />
            <ChatScreen/>
          </Route>
          <Route exact path="/chat">
            <Header backButton="/" />
            <Chats />
          </Route>
          <Route exact path="/signout">
            <SignOutView/>
          </Route>
          <Route exact path="/profile">
            <Header backButton="/" />
            <ProfileView/>
          </Route>
          <Route path="/u/:username">
            <Header backButton="/" />
            <PublicProfileView/>
          </Route>
          <Route exact path="/choose-username">
            <ChooseUsernameView/>
          </Route>
          <Route path="/login">
            <LoginView/>
          </Route>
          <Route path="/">
            <TinderCards />
          </Route>
        </Switch>
      </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
