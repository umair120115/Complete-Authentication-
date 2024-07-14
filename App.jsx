import React from 'react';
import {Routes,Route, Navigate, BrowserRouter} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';



function Logout(){
  localStorage.clear()
  return <Navigate to="/Login"/>
}

function RegisterandLogout(){
  localStorage.clear()
  return <Register/>
}

function App() {
  

  return (
    
<BrowserRouter>
    
    
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute>
            <Home />

          </ProtectedRoute>} />
        
      
    
        
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<Register />} />



          <Route path='*' element={<NotFound />} />
        </Routes>



      </BrowserRouter>
    
  )
}

export default App
