
import React from 'react'

import Login from './components/login/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/home/HomePage';
import Ranking from './components/ranking/Ranking';

function App() {

  
  return (
 
  
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/id" element={<HomePage />} />
                <Route path="/r" element={<Ranking/>} />
                
            </Routes>
        </BrowserRouter>
 

  )
}

export default App