import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowLeft } from "react-icons/hi";
import { motion } from 'framer-motion';

const pageImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000";

const DynamicBaselines = () => {
  return (
    <div className="min-h-screen bg-white pt-20 font-sans">
      {/* DIFFERENT HERO LAYOUT EXAMPLE */}
      <section className="relative h-[50vh] flex items-center bg-[#064e3b]">
        <div className="relative z-10 px-6 md:px-12 lg:px-24 w-full">
           <h1 className="text-5xl font-bold text-white mb-4">Dynamic Baselines</h1>
           <p className="text-white/80 text-xl">Counterfactual control areas.</p>
        </div>
        <div className="absolute inset-0 z-0 opacity-20">
             <img src={pageImage} className="w-full h-full object-cover" />
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-24">
         <h2 className="text-3xl font-bold">Why Static Baselines Fail</h2>
         <p className="mt-4 text-gray-600">We abandon static baselines. Our Dynamic Baselines approach identifies real-world 'twin' control areas...</p>
         {/* You can design this page completely differently now */}
         <Link to="/" className="mt-8 block text-sylitheGreen font-bold">Go Back</Link>
      </section>
    </div>
  );
};

export default DynamicBaselines;