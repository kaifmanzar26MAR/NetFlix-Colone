import React from 'react'
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Navbar from './Components/Navbar'
import Fav from './pages/Fav'
import WatchLatter from './pages/WatchLatter'
import Movieview from './pages/Movieview'
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/fav' element={<Fav/>}/>
        <Route path='/watchlatter' element={<WatchLatter/>}/>
        <Route path='/movieview/:title' element={<Movieview/>}/>
      </Routes>
      
    </>
  )
}

export default App
