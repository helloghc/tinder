import React from 'react';
import './index.css';
import Header from "./Components/Header";
import TinderCards from "./Components/TinderCards";
import Chats from "./Components/ChatApp/Chats";
import * as serviceWorker from './Components/serviceWorker.js';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginView from './routes/LoginView';
import ProfileView from './routes/ProfileView';
import PublicProfileView from './routes/PublicProfileView'
import Register from './routes/Register';
import Chat from './Components/ChatApp/Chat';
import ForgotPassword from './routes/ForgotPasswordView';
import AddPetView from './routes/AddPetView';

function App() {

  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/chat/:person">
            <Chat />
          </Route>
          <Route exact path="/chat">
            <Header backButton="/" />
            <Chats />
          </Route>
          <Route exact path="/profile">
            <Header backButton="/" />
            <ProfileView/>
          </Route>
          <Route path="/u/:username">
            <Header backButton="/" />
            <PublicProfileView/>
          </Route>
          <Route exact path="/add-pet">
            <AddPetView/> 
          </Route>
          <Route exact path="/registration">
            <Register/>
          </Route>
          <Route path="/login">
            <LoginView/>
          </Route>
          <Route path="/reset-password">
            <ForgotPassword/>
          </Route>
          <Route path="/">
            <TinderCards />
          </Route>
        </Switch>
    </BrowserRouter>
  );
};

export default App;
