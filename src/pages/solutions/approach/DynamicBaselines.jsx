import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowLeft } from "react-icons/hi";
import { motion } from 'framer-motion';

const pageImage = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000";

const TransparentReporting = () => { // <--- FIXED NAME
  return (
    <div className="min-h-screen bg-white pt-20 font-sans">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0 z-0">
          <img src={pageImage} alt="Reporting" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <span className="text-[#A3E635] font-bold tracking-widest uppercase text-sm mb-4 block">
              SYLITHE SOLUTIONS
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Transparent Reporting
            </h1>
            <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">
              Interactive, audit-ready data.
            </p>
        </div>
      </section>
      
      <div className="p-12 text-center">
        <Link to="/" className="text-[#0F172A] font-bold hover:underline">Go Home</Link>
      </div>
    </div>
  );
};

export default TransparentReporting; // <--- FIXED EXPORT