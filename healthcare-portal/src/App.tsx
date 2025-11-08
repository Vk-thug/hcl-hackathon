import PrivacyPolicy from './pages/legalpages/PrivacyPolicy'
import TermsConditions from './pages/legalpages/TermsConditions'
import CookiePolicy from './pages/legalpages/CookiePolicy'
import './App.css'
import PortalNavbar from './pages/healthcareportal/PortalNavbar';
import Home from './pages/healthcareportal/Home';
import Footer from './components/ui/Footer';
import HealthTopics from './pages/healthcareportal/HealthTopics';
import Contact from './pages/healthcareportal/Contact';
import Services from './pages/healthcareportal/Services';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/pages/healthcareportal/home" element={<Home />} />
        <Route path="/footer" element={<Footer />} />

          {/* Legal pages */}
          <Route path="/pages/legalpages/cookies" element={<CookiePolicy />} />
          <Route path="/pages/legalpages/termsandconditions" element={<TermsConditions />} />
          <Route path="/pages/legalpages/privacypolicy" element={<PrivacyPolicy />} />

          {/* Optional: add a catch-all 404 route */}
          <Route
            path="*"
            element={
              <div className="p-8 text-center">
                <h2 className="text-2xl font-semibold">Page not found</h2>
              </div>
            }
          />
          {/* Healthcare Portal pages */}
          <Route path="/pages/healthcareportal/healthtopics" element={<HealthTopics />} />
          <Route path="/pages/healthcareportal/contact" element={<Contact />} />
          <Route path="/pages/healthcareportal/services" element={<Services />} />


      </Routes>
    </Router>
    
      {/* <PortalNavbar/>

      <PrivacyPolicy />
      <TermsConditions/>
      <CookiePolicy/> */}
    </>
  )
}

export default App
