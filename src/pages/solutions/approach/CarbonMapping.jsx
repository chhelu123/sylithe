import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowLeft } from "react-icons/hi";
import { motion } from 'framer-motion';

// Specific Image for Carbon Mapping
const pageImage = "https://images.unsplash.com/photo-1501854140884-074bf86ee91c?auto=format&fit=crop&q=80&w=2000";

const CarbonMapping = () => {
  return (
    <div className="min-h-screen bg-white pt-20 font-sans">
      
      {/* --- UNIQUE HERO FOR CARBON MAPPING --- */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0 z-0">
          <img src={pageImage} alt="Carbon Mapping" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[#A3E635] font-bold tracking-widest uppercase text-sm mb-4 block">
              SYLITHE SOLUTIONS
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Carbon Mapping
            </h1>
            <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">
              Algorithmic calculation of stocks with pixel-level precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- UNIQUE CONTENT FOR CARBON MAPPING --- */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Overview</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Our Carbon Mapping solution uses advanced satellite imagery and AI to create precise, pixel-level maps of forest carbon stocks. Unlike manual sampling, this provides a contiguous view of the entire project area.
            </p>
            <Link to="/" className="inline-flex items-center gap-2 text-[#0F172A] font-bold border-b-2 border-[#A3E635] hover:bg-[#A3E635]/10 px-2 py-1 transition-colors">
              <HiArrowLeft /> Back to Home
            </Link>
          </div>

          <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100">
            <h3 className="text-xl font-bold text-[#0F172A] mb-6">Key Capabilities</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><div className="mt-1 w-5 h-5 rounded-full bg-[#A3E635]"></div> Pixel-level accuracy</li>
              <li className="flex items-start gap-3"><div className="mt-1 w-5 h-5 rounded-full bg-[#A3E635]"></div> Historical biomass reconstruction</li>
              <li className="flex items-start gap-3"><div className="mt-1 w-5 h-5 rounded-full bg-[#A3E635]"></div> Automated species identification</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarbonMapping;