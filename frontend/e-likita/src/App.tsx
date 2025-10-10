import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Navbar from './components/NavBar'
import Index from './pages/Index'
import DashboardLayout from './pages/DashboardLayout'
import NotFound from './pages/NotFound'
import Consultations from './pages/Consultations'
import Profile from './pages/Profile'
import Consultation from './pages/Consultation'
import ConsultationForm from './pages/ConsultationForm'
import SignUp from './pages/SignUp'
import TermsOfService from '@/pages/TermsOfService'
import NAuth from './components/NAuth'
import Auth from './components/Auth'
import { Toaster } from 'react-hot-toast'
import PasswordRequestPage from './pages/PasswordRequest'
import ResetPassword from './pages/ResetPassword'

function App() {

  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Home />} />
          <Route path="login" element={<NAuth><Login /></NAuth>} />
          <Route path="signup" element={<NAuth><SignUp /></NAuth>} />
          <Route path="password-request" element={<NAuth><PasswordRequestPage /></NAuth>} />
          <Route path="reset-password/:token" element={<NAuth><ResetPassword /></NAuth>} />
          <Route path="contact" element={<Contact />} />
          <Route path="termsofservice" element={<TermsOfService />} />
          <Route path="portal" element={<Auth><DashboardLayout /></Auth>}>
            <Route index element={<Consultations />} />
            <Route path='consultationform' element={<ConsultationForm />} />
            <Route path='consultations/:id' element={<Consultation />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
