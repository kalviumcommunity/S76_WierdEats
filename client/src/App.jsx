import React from 'react'
import LandingPage from './Routes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Component from './components/Component'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/navbar' element={<NavBar/>}/>
        <Route path='/entity' element={<Component/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
