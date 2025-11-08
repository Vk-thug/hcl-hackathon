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
import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ModeToggle } from "./components/custom/mode-toggle";

// =============================================================================
// LAZY LOAD ALL COMPONENTS
// =============================================================================
const SignIn = lazy(() =>
  import("./pages").then((module) => ({ default: module.SignIn }))
);
const SignUp = lazy(() =>
  import("./pages").then((module) => ({ default: module.SignUp }))
);
const PatientProfile = lazy(() =>
  import("./pages").then((module) => ({ default: module.PatientProfile }))
);

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
    <Fragment>
      <Suspense fallback={<div>loading</div>}>
        <Routes>
          {/* =================================================================== */}
          {/* INFO PAGES (Public but in App Layout) */}
          {/* =================================================================== */}
          <Route
            path="/about"
            element={
              <div className="w-screen h-screen flex justify-center items-center mx-auto bg-background dark:bg-black dark:text-white">
                about
                <ModeToggle />
              </div>
            }
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<PatientProfile />} />

        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;