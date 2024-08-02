
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Registr from './pages/Registr'
import Home from './pages/Home'

function App() {
  const navigate = useNavigate();
  function ProtectedRoute({isAuthenticated , children}) {
    if (!isAuthenticated) {
      navigate('/')
    }
    return children;
  }
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/registr' element={<Registr></Registr>}></Route>
        <Route path='/' element={<ProtectedRoute ><Home isAuthenticated={false}></Home></ProtectedRoute>}></Route>
      </Routes>
    </div>
  )
}

export default App