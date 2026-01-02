// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import Profile from './Components/Profile'
import OwnBlogs from './Components/OwnBlogs'
import Blog from './Components/Blog'
import ProtectedRoute from './Protected_route/Auth_providor'
import Login from './Components/Auth/Login'
import Signup from './Components/Auth/Signup'
import NewPost from "./Components/NewPost"
import OTPcheck from "./Components/Auth/OTPcheck";
import Account from './Components/Account'
import Save from './Components/Save'

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/otp' element={<OTPcheck />} />

          <Route path='/home' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/my-posts' element={<ProtectedRoute><OwnBlogs /></ProtectedRoute>} />
          <Route path='/new-post' element={<ProtectedRoute><NewPost /></ProtectedRoute>} />
          <Route path='/blog' element={<ProtectedRoute><Blog /></ProtectedRoute>} />
          <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path='/save' element={<ProtectedRoute><Save /></ProtectedRoute>} />
        </Routes>
    </Router>
  )
}

export default App
