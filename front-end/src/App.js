import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage';
import Login from './pages/Loginpage';
import CreateAccount from './pages/CreateAccount';
import Clients from './pages/Clients';
import ClientsPage from './pages/Clientpage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/create-account' element={<CreateAccount/>}/>
      <Route path='/clients' element={<Clients/>}/>
      <Route path='/client/:id' element={<ClientsPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;