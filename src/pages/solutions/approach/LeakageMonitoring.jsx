import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowLeft } from "react-icons/hi";
import { motion } from 'framer-motion';

const pageImage = "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=2000";

const LeakageMonitoring = () => {
  return (
    <div className="min-h-screen bg-white pt-20 font-sans">
      
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0 z-0">
          <img src={pageImage} alt="Leakage Monitoring" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[#A3E635] font-bold tracking-widest uppercase text-sm mb-4 block">
              SYLITHE SOLUTIONS
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Leakage Monitoring
            </h1>
            <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">
              Accounting for displaced emissions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Overview</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Protecting a forest shouldn't just move deforestation elsewhere. We monitor a wide buffer zone around your project to detect and account for activity shifting, ensuring net-positive climate impact.
            </p>
            <Link to="/" className="inline-flex items-center gap-2 text-[#0F172A] font-bold border-b-2 border-[#A3E635] hover:bg-[#A3E635]/10 px-2 py-1 transition-colors">
              <HiArrowLeft /> Back to Home
            </Link>
          </div>

          <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100">
            <h3 className="text-xl font-bold text-[#0F172A] mb-6">Key Capabilities</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><div className="mt-1 w-5 h-5 rounded-full bg-[#A3E635]"></div> Activity shifting detection</li>
              <li className="flex items-start gap-3"><div className="mt-1 w-5 h-5 rounded-full bg-[#A3E635]"></div> Market leakage modeling</li>
              <li className="flex items-start gap-3"><div className="mt-1 w-5 h-5 rounded-full bg-[#A3E635]"></div> Wide-area buffer monitoring</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeakageMonitoring;