import './App.css'
import { Dashboard } from './pages/dashboard'
import { Singin } from './pages/Signin'
import { Singup } from './pages/Signup'
import { BrowserRouter, Routes,Route } from 'react-router-dom'



function App() {

  return(
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Singup/>}/>
            <Route path='/signup' element={<Singup/>}/>
            <Route path='/signin' element={<Singin/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/share/:shareId' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>

    </>
  )
  
}

export default App
