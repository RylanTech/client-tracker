import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { UserProvider } from './context/userContext';
import { ClientContext, ClientProvider } from './context/clientContext';

ReactDOM.render(
  <React.StrictMode>
    <ClientProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
