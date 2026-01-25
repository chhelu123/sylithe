import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- COMPONENTS ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';

// --- MAIN PAGES ---
import PlatformPage from './pages/PlatformPage';
import CarbonAccountingBlog from './pages/CarbonAccountingBlog';
import Signup from './pages/Signup';
import Login from './pages/Login';

// --- UPDATED IMPORTS (New Folder Structure) ---

// 1. Approach (formerly just 'solutions')
import CarbonMapping from './pages/solutions/approach/CarbonMapping';
import DynamicBaselines from './pages/solutions/approach/DynamicBaselines';
import LeakageMonitoring from './pages/solutions/approach/LeakageMonitoring';
import TransparentReporting from './pages/solutions/approach/TransparentReporting';

// 2. Methodology (Now inside 'solutions/methodology')
import LulcClassification from './pages/solutions/methodology/LulcClassification';
import ChmModel from './pages/solutions/methodology/ChmModel';
import DcabModel from './pages/solutions/methodology/DcabModel';
import AgbCalculation from './pages/solutions/methodology/AgbCalculation';

const Home = () => (
  <>
    <Navbar />
    <HeroSection />
  </>
);

function App() {
  return (
    <Router>
      <div className="relative min-h-screen w-full overflow-x-hidden font-sans bg-white flex flex-col">
        <div className="flex-grow">
          <Routes>
            {/* Global Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/platform" element={<PlatformPage />} />
            <Route path="/insights/carbon-accounting" element={<CarbonAccountingBlog />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* --- APPROACH ROUTES --- */}
            {/* These URLs stay the same, but they load files from the new 'approach' folder */}
            <Route path="/solutions/carbon-mapping" element={<CarbonMapping />} />
            <Route path="/solutions/dynamic-baselines" element={<DynamicBaselines />} />
            <Route path="/solutions/leakage-monitoring" element={<LeakageMonitoring />} />
            <Route path="/solutions/transparent-reporting" element={<TransparentReporting />} />

            {/* --- METHODOLOGY ROUTES --- */}
            {/* These load files from the new 'solutions/methodology' folder */}
            <Route path="/methodology/lulc" element={<LulcClassification />} />
            <Route path="/methodology/chm" element={<ChmModel />} />
            <Route path="/methodology/dcab" element={<DcabModel />} />
            <Route path="/methodology/agb" element={<AgbCalculation />} />

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;