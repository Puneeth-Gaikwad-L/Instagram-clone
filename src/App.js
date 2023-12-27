import React from 'react';
import Signup from './Components/Signup';
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import "./App.css"

import { Route, Routes } from 'react-router-dom';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
