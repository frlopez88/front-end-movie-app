
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LogIn } from './ScreenComponents/LogIn'
import { DashBoard } from './ScreenComponents/DashBoard'
import { useEffect, useState } from 'react'
import { Menu } from './Components/Menu'
import { Register } from './ScreenComponents/Register'
import { Earing } from './ScreenComponents/Earing'

function App() {
  
  const [isLogIn , setIsLogIn] = useState(false)

  let token = ""
  const baseUrl = import.meta.env.VITE_BASE_URL
  const endPoint = "validateSesion"

  const validateToken = async()=>{
      const newUrl = `${baseUrl}${endPoint}`
      const result = await fetch(newUrl, {
        method: "POST", 
        headers: {
            'Authorization' : token,
            'Content-Type' : 'application/json'
        }
      })

      if (result.ok) {
        setIsLogIn(true)
      }else {
        setIsLogIn(false)
      }

  }

  useEffect(()=>{

    token = window.localStorage.getItem('movie-credential')
    validateToken()

  }, [])

  return (
    <>
      <BrowserRouter>
        { isLogIn  ? <Menu/> : "" }
        <Routes>
          <Route path='/' element={<LogIn/>}/>
          { isLogIn ? <Route path='/dashboard' element={<DashBoard/>}/> : "" } 
          { isLogIn ? <Route path='/earnings' element={<Earing/>}/> : "" } 
          { !isLogIn ? <Route path='/register' element={<Register />} /> : ""  }
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
