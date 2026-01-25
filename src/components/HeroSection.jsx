import React from 'react';
import { motion } from 'framer-motion';
// --- ICON IMPORT ---
import { HiCheck } from "react-icons/hi"; 

// --- IMAGES ---
import treeRight from '../assets/Tree50.png'; 
import satelliteImg from '../assets/tree5.jpg';
import graphImg from '../assets/tree9.jpg'; 
import indiaImg from '../assets/tree22.jpg'; 

//chhelu //chhelu
// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const textVariant = {
  hidden: { opacity: 0, x: -30 }, 
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.9, x: 50, y: 50 }, 
  visible: { 
    opacity: 1, 
    scale: 1, 
    x: 0, 
    y: 0, 
    transition: { duration: 1.0, ease: "easeOut" } 
  },
};

const HeroSection = () => {
  return (
    <div className="w-full bg-white overflow-hidden font-sans text-[#0F172A]"> 
      
      {/* ================= 1. MAIN HERO SECTION ================= */}
      <section className="relative w-full h-screen flex items-center overflow-hidden bg-white"> 
        
        {/* UPDATED CONTAINER: Removed mx-auto and adjusted padding for left alignment */}
        <div className="relative z-10 w-full h-full grid lg:grid-cols-2 items-center px-6 md:px-12 lg:px-16">
            
            {/* --- LEFT COLUMN: Text --- */}
            <div className="flex justify-start"> 
                {/* UPDATED TEXT WRAPPER: Removed mt-16 for vertical centering and reduced max-width */}
                <motion.div 
                  className="max-w-3xl text-left" 
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                    {/* H1: Bold, Tight Tracking (Carbon Direct Style) */}
                    <motion.h1 variants={textVariant} className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold text-[#0F172A] leading-[1.1] mb-6 tracking-tight">
                      The carbon intelligence <br /> 
                      platform enabling <br />
                      <span className="text-[#84cc16]">confident</span> <br /> 
                      <span className="text-[#84cc16]">climate action.</span>
                    </motion.h1>
                    
                    {/* Paragraph */}
                    <motion.p variants={textVariant} className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl font-normal">
                      Measure, reduce, and remove your carbon emissions with Sylithe's science-backed carbon management solutions.
                    </motion.p>
                    
                    <motion.div variants={textVariant}>
                        <button className="bg-[#84cc16] text-[#064e3b] px-8 py-4 rounded-full font-bold text-base hover:bg-[#0F172A] hover:text-white transition-all shadow-lg active:scale-95">
                            Get started
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* --- RIGHT COLUMN: Tree Image --- */}
            <motion.div 
                className="flex justify-center lg:justify-end items-center h-full translate-y-32"
                variants={imageVariant}
                initial="hidden"
                animate="visible"
            >
                <img 
                    src={treeRight} 
                    alt="Sylithe Tree" 
                    className="w-full max-w-[700px] h-auto object-contain"
                />
            </motion.div>

        </div>
      </section>


      {/* ================= 2. BENEFITS SECTION ================= */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
                <span className="text-slate-500 font-bold text-sm uppercase tracking-wide">Benefits with Sylithe</span>
                {/* H2: Bold & Tight */}
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mt-3 max-w-3xl leading-tight tracking-tight">
                    High-integrity carbon intelligence for every market participant.
                </h2>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
            >
                {[
                    { title: "De-risk your portfolio", desc: "Uncover risks before you invest. Our pre-issuance detection flags reversal risks and leakage." },
                    { title: "Built for India (ICM)", desc: "Stay compliant with local regulations. Our models are aligned with the Indian Carbon Market and Verra." },
                    { title: "Science-first verification", desc: "Move beyond paper audits. We use multi-scale LiDAR and GEDI fusion to provide pixel-level biomass accuracy." },
                    { title: "Real-time intelligence", desc: "Accelerate time to issuance. Our continuous monitoring replaces static reports with live data." }
                ].map((item, index) => (
                    <motion.div key={index} variants={textVariant} className="flex flex-col gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#84cc16] flex items-center justify-center text-white shadow-sm">
                            <HiCheck className="text-xl" />
                        </div>
                        <h3 className="text-xl font-bold text-[#0F172A] tracking-tight">{item.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">{item.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
      </section>


      {/* ================= 3. WHAT WE DO (Full Page Scroll Layout) ================= */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        
        {/* SECTION HEADER */}
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#84cc16] font-bold tracking-widest uppercase text-xs mb-4 block">
            WHAT WE DO
          </span>
          {/* H2: Bold & Tight */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight tracking-tight">
            We measure, monitor, and justify carbon credits continuously before they are sold.
          </h2>
        </motion.div>

        <div className="max-w-7xl mx-auto">

          {/* ROW 1 — BUYERS (Min-Height Screen) */}
          <motion.div 
            className="min-h-screen grid lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={containerVariants}
          >
            <div className="flex flex-col items-start gap-0">
              {/* H3: Bold & Tight */}
              <motion.h3 
                variants={textVariant} 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] leading-[1.1] mb-5 tracking-tight"
              >
                High-quality carbon, backed by evidence
              </motion.h3>

              <motion.p variants={textVariant} className="text-lg text-slate-600 leading-relaxed max-w-lg mb-8 font-normal">
                Sylithe provides pre-issuance MRV intelligence so buyers can evaluate project quality, performance, and risk before purchasing credits.
              </motion.p>

              <motion.ul variants={containerVariants} className="space-y-4 mb-10">
                {[
                  "Tracks change as it unfolds",
                  "Detects deviation from expected outcomes",
                  "Surfaces risk early, not retrospectively"
                ].map((item, i) => (
                  <motion.li key={i} variants={textVariant} className="flex items-center gap-3 text-[#0F172A] font-semibold text-lg tracking-tight">
                    <span className="w-2 h-2 rounded-full bg-[#84cc16]" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.button 
                variants={textVariant}
                className="rounded-full border-2 border-[#0F172A] px-8 py-3 text-[#0F172A] font-bold text-sm hover:bg-[#0F172A] hover:text-white transition-all duration-300"
              >
                Learn more
              </motion.button>
            </div>

            <motion.div variants={imageVariant} className="flex justify-center">
              <img src={satelliteImg} className="max-h-[500px] object-contain mix-blend-multiply" alt="Satellite" />
            </motion.div>
          </motion.div>

          {/* ROW 2 — RISK (Min-Height Screen) */}
          <motion.div 
            className="min-h-screen grid lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={containerVariants}
          >
            <motion.div variants={imageVariant} className="order-2 lg:order-1 flex justify-center">
              <img src={graphImg} className="max-h-[500px] object-contain mix-blend-multiply" alt="Graph" />
            </motion.div>

            <div className="order-1 lg:order-2 flex flex-col items-start gap-0">
              <motion.h3 
                variants={textVariant} 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] leading-[1.1] mb-5 tracking-tight"
              >
                Dynamic baselines & risk
              </motion.h3>

              <motion.p variants={textVariant} className="text-lg text-slate-600 leading-relaxed max-w-lg mb-8 font-normal">
                We move beyond one-time assumptions. Using dynamic baselines and time-series analysis, we track project performance against real-world controls.
              </motion.p>

              <motion.ul variants={containerVariants} className="space-y-4 mb-10">
                {[
                  "Time-series performance analysis",
                  "Pre-issuance risk detection"
                ].map((item, i) => (
                  <motion.li key={i} variants={textVariant} className="flex items-center gap-3 text-[#0F172A] font-semibold text-lg tracking-tight">
                    <span className="w-2 h-2 rounded-full bg-[#84cc16]" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.button 
                variants={textVariant}
                className="rounded-full border-2 border-[#0F172A] px-8 py-3 text-[#0F172A] font-bold text-sm hover:bg-[#0F172A] hover:text-white transition-all duration-300"
              >
                Explore methodology
              </motion.button>
            </div>
          </motion.div>

          {/* ROW 3 — DEVELOPERS (Min-Height Screen) */}
          <motion.div 
            className="min-h-screen grid lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={containerVariants}
          >
            <div className="flex flex-col items-start gap-0">
              <motion.h3 
                variants={textVariant} 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] leading-[1.1] mb-5 tracking-tight"
              >
                Build carbon projects with continuous visibility
              </motion.h3>

              <motion.p variants={textVariant} className="text-lg text-slate-600 leading-relaxed max-w-lg mb-8 font-normal">
                Sylithe provides pre-issuance intelligence so developers can monitor performance, manage risk, and strengthen credibility before issuance.
              </motion.p>

              <motion.ul variants={containerVariants} className="space-y-4 mb-10">
                {[
                  "Continuous monitoring of performance",
                  "Baseline credibility signals",
                  "Permanence and reversal indicators"
                ].map((item, i) => (
                  <motion.li key={i} variants={textVariant} className="flex items-center gap-3 text-[#0F172A] font-semibold text-lg tracking-tight">
                    <span className="w-2 h-2 rounded-full bg-[#84cc16]" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.button 
                variants={textVariant}
                className="rounded-full border-2 border-[#0F172A] px-8 py-3 text-[#0F172A] font-bold text-sm hover:bg-[#0F172A] hover:text-white transition-all duration-300"
              >
                View solutions
              </motion.button>
            </div>

            <motion.div variants={imageVariant} className="flex justify-center">
              <img src={indiaImg} className="max-h-[500px] object-contain mix-blend-multiply" alt="India Landscape" />
            </motion.div>
          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default HeroSection;