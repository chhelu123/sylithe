import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { HiOutlineArrowRight } from "react-icons/hi";
import { motion } from 'framer-motion';

// --- Component for the new Platform Hero Section ---
const PlatformHero = () => {
  return (
    <section className="w-full pt-36 pb-20 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Text Content */}
        <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 text-left"
        >
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-sylitheDark leading-tight tracking-tight">
            The Sylithe Carbon Intelligence Platform
          </h1>
          
          {/* Sub-headline with Green accent */}
          <h2 className="text-2xl md:text-3xl font-bold text-sylitheDark">
            Powered by software. <span className="text-sylitheGreen">Backed by science.</span>
          </h2>
          
          {/* Paragraph Text */}
          <p className="text-lg text-gray-600 leading-relaxed max-w-xl font-medium">
            Sylithe combines advanced geospatial data, machine learning, and deep carbon expertise to provide the most accurate carbon intelligence. Manage your portfolio, assess risks, and confidentially invest in high-quality climate projects with a platform built for rigorous scientific standards.
          </p>

          {/* Request Demo Button */}
          <div className="mt-4">
            <button className="bg-sylitheDark text-white px-8 py-4 rounded-full flex items-center gap-3 hover:bg-black transition-all shadow-lg active:scale-95 font-bold text-lg">
                Request a demo
                <HiOutlineArrowRight className="text-xl" />
            </button>
          </div>
        </motion.div>

        {/* Right Image Placeholder */}
        <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="w-full h-[400px] md:h-[500px] bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden"
        >
            {/* --- IMAGE INSTRUCTIONS ---
               1. Put your image in src/assets/
               2. Import it at the top: import platformImg from '../assets/your-image.png';
               3. Uncomment the img tag below and remove the placeholder text div.
            */}
            {/* <img src={platformImg} alt="Platform Interface" className="w-full h-full object-cover" /> */}
            
            <div className="text-gray-400 font-bold text-xl">
              PUT YOUR IMAGE HERE
            </div>
        </motion.div>

      </div>
    </section>
  );
};

// --- Placeholder Components for scrolling content ---
const FeatureSection = ({ title, bgColor = "bg-white" }) => (
  <section className={`w-full py-24 px-6 md:px-12 lg:px-24 ${bgColor}`}>
    <div className="max-w-7xl mx-auto text-left">
      <h2 className="text-3xl font-bold text-sylitheDark mb-6">{title}</h2>
      <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
      </p>
      <div className="mt-12 grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map(item => (
              <div key={item} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <div className="h-12 w-12 bg-sylitheGreen/20 rounded-lg mb-6"></div>
                  <h3 className="text-xl font-bold mb-2">Feature Detail {item}</h3>
                  <p className="text-gray-600">Detailed explanation of this specific platform capability goes here.</p>
              </div>
          ))}
      </div>
    </div>
  </section>
);


// --- The Main Page Component Assembler ---
const PlatformPage = () => {
  // Ensure page scrolls to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-white">
      {/* Reusing the existing Navbar */}
      <Navbar />
      
      {/* The new Hero Section corresponding to the image request */}
      <PlatformHero />

      {/* Scrolling Content Sections */}
      <FeatureSection title="Precise Carbon Measurement" bgColor="bg-gray-50" />
      <FeatureSection title="Risk Assessment & Due Diligence" bgColor="bg-white" />
      <FeatureSection title="Portfolio Management & Reporting" bgColor="bg-gray-50" />
      
      {/* Simple Footer Placeholder */}
      <footer className="bg-sylitheDark text-white py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to take action?</h2>
          <button className="bg-sylitheGreen text-sylitheDark px-8 py-3 rounded-full font-bold hover:bg-[#92d02e] transition-colors">
              Get started today
          </button>
      </footer>
    </div>
  );
};

export default PlatformPage;