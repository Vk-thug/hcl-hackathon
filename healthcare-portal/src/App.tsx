import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PatientDashboard from './pages/PatientDashboard'
import HealthCareProviderDashboard from './pages/HealthCareProviderDashboard'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientDashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/provider" element={<HealthCareProviderDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
