import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import OTPcheck from './Components/OTPcheck'
import ForgatePass from './Components/ForgatePass'
import Profile from './Components/Profile'
import Account from './Components/Account'

function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/otpcheck/:id' element={<OTPcheck />} />
            <Route path='/forgatePass' element={<ForgatePass />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/account/:id' element={<Account />} />
          </Routes>
        </Router>
    </>
  )
}

export default App