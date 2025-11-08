import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PatientDashboard from './pages/PatientDashboard'
import HealthCareProviderDashboard from './pages/HealthCareProviderDashboard'
import './App.css'
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
    <Router>
      <Routes>
        <Route path="/" element={<PatientDashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/provider" element={<HealthCareProviderDashboard />} />
      </Routes>
    </Router>
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