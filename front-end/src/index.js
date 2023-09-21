import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { UserProvider } from './context/userContext';
import { ClientContext, ClientProvider } from './context/clientContext';
import { GigProvider } from './context/gigContext';

ReactDOM.render(
  <React.StrictMode>
    <GigProvider>
      <ClientProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ClientProvider>
    </GigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
