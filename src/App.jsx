import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // 1. Import Footer
import HeroSection from './components/HeroSection';
import PlatformPage from './pages/PlatformPage';
import CarbonAccountingBlog from './pages/CarbonAccountingBlog';
import SolutionTemplate from './pages/SolutionTemplate';

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
        {/* Main Content Area */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/platform" element={<PlatformPage />} />
            <Route path="/insights/carbon-accounting" element={<CarbonAccountingBlog />} />
            
            {/* Dynamic Routes for Solutions & Methodologies */}
            <Route path="/solutions/:id" element={<SolutionTemplate />} />
            <Route path="/methodology/:id" element={<SolutionTemplate />} />
          </Routes>
        </div>

        {/* 2. Add Footer here - it stays at the bottom of ALL pages */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;