import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'
import ResultsPage from './pages/ResultPage'

function App() {

  return (
    <Router>
      <Navbar/>

      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/results' element={<ResultsPage/>} />
      </Routes>
      
    </Router>
  )
}

export default App
