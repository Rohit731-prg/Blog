// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Signup from './Components/Signup'
import Login from './Components/Login'
import OTPcheck from './Components/OTPcheck'
import ForgatePass from './Components/ForgatePass'
import Profile from './Components/Profile'
import Account from './Components/Account'
import OwnBlogs from './Components/OwnBlogs'
import Blog from './Components/Blog'
import ProtectedRoute from './Protected_route/Auth_providor'

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/home' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
    </Router>
  )
}

export default App
