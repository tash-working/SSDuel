
import React from 'react'

import Login from './components/login/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/home/HomePage';
import Ranking from './components/ranking/Ranking';
import LoginPage from './components/loginPage/LoginPage';
import Profile from './components/profile/Profile';
import LoginForm from './components/access/LoginForm';

function App() {

  
  return (
 
  
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
              
                <Route path="/profile" element={<Profile/>} />
                <Route path="/ranking" element={<Ranking/>} />
                <Route path="/hotornot" element={<HomePage/>} />
               
        
            </Routes>
        </BrowserRouter>
 

  )
}

export default App