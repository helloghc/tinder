import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './Components/serviceWorker.js';
import { AuthContextProvider } from "./Api/Context/authProvider";
import { ChatContextProvider } from "./Api/Context/ChatContext";
import AuthProvider from './Api/Context/authProvider';

ReactDOM.render(
      <AuthProvider>
        <ChatContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ChatContextProvider>
      </AuthProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
