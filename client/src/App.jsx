import React from 'react'
import LandingPage from './Routes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Component from './components/Component'
import FoodCards from './components/FoodCards'
import FoodForm from './components/FoodForm'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/navbar' element={<NavBar/>}/>
        <Route path='/entity' element={<Component/>}/>
        <Route path = '/foods' element={<FoodCards/>}/>
        <Route path = '/add-food' element={<FoodForm/>}/>
        <Route path = '/edit-food/:id' element={<FoodForm/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
