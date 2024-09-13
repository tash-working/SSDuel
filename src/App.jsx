
import React from 'react'

import Login from './components/login/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/home/HomePage';
import Ranking from './components/ranking/Ranking';
import LoginPage from './components/loginPage/LoginPage';

function App() {

  
  return (
 
  
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/id" element={<HomePage />} />
        
            </Routes>
        </BrowserRouter>
 

  )
}

export default App