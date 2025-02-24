import React from 'react'
import LandingPage from './Routes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/navbar' element={<NavBar/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
