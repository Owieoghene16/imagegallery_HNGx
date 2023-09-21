import SignIn from './Components/SignIn'
import './App.css';
import { AuthProvider } from './Components/Context/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
 
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<SignIn />}></Route>
            <Route path='/home' element={<PrivateRoute />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
