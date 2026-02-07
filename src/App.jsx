import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

// --- COMPONENTS ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';

// --- MAIN PAGES ---
import Signup from './pages/Signup';
import Login from './pages/Login';

// --- APPROACH PAGES ---
import CarbonMapping from './pages/solutions/approach/CarbonMapping';
import DynamicBaselines from './pages/solutions/approach/DynamicBaselines';
import LeakageMonitoring from './pages/solutions/approach/LeakageMonitoring';
import TransparentReporting from './pages/solutions/approach/TransparentReporting';

// --- METHODOLOGY PAGES ---
import LulcClassification from './pages/solutions/methodology/LulcClassification';
import ChmModel from './pages/solutions/methodology/ChmModel';
import DcabModel from './pages/solutions/methodology/DcabModel';
import AgbCalculation from './pages/solutions/methodology/AgbCalculation';
import ChmDashboard from './pages/solutions/methodology/ChmDashboard';

// --- HOME ---
const Home = () => <HeroSection />;

/* --------------------------------------------------
   Layout wrapper (controls Navbar / Footer visibility)
--------------------------------------------------- */
function Layout({ children }) {
  const location = useLocation();

  // Routes where Navbar & Footer must be hidden
  const isFullScreenApp =
    location.pathname === '/chm-verification';

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-sans bg-white flex flex-col">
      {!isFullScreenApp && <Navbar />}

      <div className="flex-grow">
        {children}
      </div>

      {!isFullScreenApp && <Footer />}
    </div>
  );
}

/* --------------------------------------------------
   APP
--------------------------------------------------- */
function App() {
  return (
    <Router>
      <Layout>
        <Routes>

          {/* --- GLOBAL ROUTES --- */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* --- APPROACH ROUTES --- */}
          <Route path="/solutions/carbon-mapping" element={<CarbonMapping />} />
          <Route path="/solutions/dynamic-baselines" element={<DynamicBaselines />} />
          <Route path="/solutions/leakage-monitoring" element={<LeakageMonitoring />} />
          <Route path="/solutions/transparent-reporting" element={<TransparentReporting />} />

          {/* --- METHODOLOGY ROUTES --- */}
          <Route path="/methodology/lulc" element={<LulcClassification />} />
          <Route path="/methodology/chm" element={<ChmModel />} />
          <Route path="/methodology/dcab" element={<DcabModel />} />
          <Route path="/methodology/agb" element={<AgbCalculation />} />

          {/* --- FULLSCREEN CHM DASHBOARD --- */}
          <Route path="/chm-verification" element={<ChmDashboard />} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
