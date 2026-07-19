import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ApplicationForm from './pages/ApplicationForm'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ThankYou from './pages/ThankYou'

function App() {
  return (
    <>
      <div className="noise-overlay" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/apply" element={<ApplicationForm />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </>
  )
}

export default App
