

import { Routes, Route } from 'react-router-dom'
import Signin from './Pages/Signin'
import Signup from './Pages/Singup'
import Todos from './components/Todo/Todos'
import Todo from './components/Todo/Todo'


// Its a global access func to use in overall app so we use in it in APP.js 

function App() {

  


  
  return (
    <>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/todoapp' element={<Todos/>} />
      </Routes>


    </>
  )
}

export default App
