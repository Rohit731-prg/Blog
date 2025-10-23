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
import Protect_route from './Protected_route/Protect_route'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/otpcheck/:id' element={<OTPcheck />} />
          <Route path='/forgatePass' element={<ForgatePass />} />

          {/* Protected Routes */}
          <Route
            path='/profile/:id'
            element={
              <Protect_route>
                <Profile />
              </Protect_route>
            }
          />
          <Route
            path='/account/:id'
            element={
              <Protect_route>
                <Account />
              </Protect_route>
            }
          />
          <Route
            path='/blogs/:id'
            element={
              <Protect_route>
                <OwnBlogs />
              </Protect_route>
            }
          />
          <Route
            path='/blog/:id'
            element={
              <Protect_route>
                <Blog />
              </Protect_route>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
