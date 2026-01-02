import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight, HiCheck } from "react-icons/hi";

// --- YOUR IMAGE IMPORTS ---
import heroMainImg from '../assets/tree4.jpg'; 
import satelliteImg from '../assets/tree5.jpg';
import graphImg from '../assets/tree9.jpg'; 
import indiaImg from '../assets/tree8.jpg'; 

// --- MOTION VARIANTS (Professional Animation Presets) ---

// 1. Container that triggers children one-by-one
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Time delay between each child animating
      delayChildren: 0.1,
    },
  },
};

// 2. Text floating up (The "Apple/Stripe" feel)
const textVariant = {
  hidden: { opacity: 0, y: 30 }, // Starts lower and invisible
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.25, 0.25, 0, 1] } // Custom easing for smoothness
  },
};

// 3. Image subtle zoom-in (Cinematic feel)
const imageVariant = {
  hidden: { opacity: 0, scale: 0.95, y: 40 }, // Starts slightly small and lower
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 1.0, ease: "easeOut" } 
  },
};


const HeroSection = () => {
  return (
    <div className="w-full bg-white overflow-hidden font-sans">
      
      {/* ================= 1. MAIN HERO ================= */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-24 w-full">
        <motion.div 
          className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants} // Staggers the entrance
        >
            
            {/* Left: Typography */}
            <div className="flex flex-col gap-6">
                <motion.h1 variants={textVariant} className="text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.1] font-bold text-[#0F172A] tracking-tight">
                  The carbon intelligence platform enabling <br />
                  <span className="text-[#84cc16]">confident climate action.</span>
                </motion.h1>
                
                <motion.p variants={textVariant} className="text-xl text-gray-600 max-w-lg leading-relaxed">
                  Measure, reduce, and remove your carbon emissions with Sylithe's science-backed carbon management solutions.
                </motion.p>
                
                <motion.div variants={textVariant} className="flex items-center gap-4 mt-2">
                    <button className="bg-[#0F172A] text-white px-8 py-4 rounded-full flex items-center gap-2 hover:bg-black transition-all shadow-lg active:scale-95 font-bold text-base">
                        Get started
                    </button>
                    <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-[#0F172A] hover:border-black transition-colors">
                        <HiOutlineArrowRight className="text-xl rotate-45" />
                    </button>
                </motion.div>
            </div>

            {/* Right: Hero Image */}
            <motion.div variants={imageVariant} className="flex justify-center lg:justify-end">
                <img 
                  src={heroMainImg} 
                  alt="Sylithe Platform" 
                  className="w-full h-auto max-h-[600px] object-contain mix-blend-multiply" 
                />
            </motion.div>
        </motion.div>
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
                <span className="text-gray-400 font-semibold text-sm uppercase tracking-wide">Benefits with Sylithe</span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mt-3 max-w-3xl leading-tight">
                    High-integrity carbon intelligence for every market participant.
                </h2>
            </motion.div>

            {/* Staggered Grid */}
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
                        <h3 className="text-xl font-bold text-[#0F172A]">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
      </section>


      {/* ================= 3. WHAT WE DO (Professional Staggered Sections) ================= */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
        
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
            <span className="text-[#84cc16] font-bold tracking-widest uppercase text-xs mb-4 block">
                WHAT WE DO
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] leading-tight">
                We measure, monitor, and justify carbon credits continuously — before they are sold.
            </h2>
        </motion.div>

        <div className="max-w-7xl mx-auto space-y-40">

            {/* --- ROW 1: SATELLITE --- */}
            <motion.div 
              className="grid lg:grid-cols-2 gap-16 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }} // Triggers when 150px into view
              variants={containerVariants}
            >
                <div className="order-1 flex flex-col gap-6">
                    <motion.h3 variants={textVariant} className="text-3xl font-bold text-[#0F172A]">
                        Satellite-native MRV
                    </motion.h3>
                    <motion.p variants={textVariant} className="text-lg text-gray-600 leading-relaxed">
                        We leverage multi-sensor fusion (Sentinel, Landsat, GEDI, LiDAR) to create a high-fidelity view of the earth. Our <strong>evidence-first approach</strong> moves from raw data to methodology to credit, ensuring high integrity.
                    </motion.p>
                    <motion.ul variants={containerVariants} className="space-y-3">
                        <motion.li variants={textVariant} className="flex items-center gap-3 text-[#0F172A] font-semibold">
                            <div className="w-2 h-2 rounded-full bg-[#84cc16]"></div> Evidence-first approach
                        </motion.li>
                        <motion.li variants={textVariant} className="flex items-center gap-3 text-[#0F172A] font-semibold">
                            <div className="w-2 h-2 rounded-full bg-[#84cc16]"></div> 3D Forest Reconstruction
                        </motion.li>
                    </motion.ul>
                    <motion.div variants={textVariant}>
                        <button className="text-[#0F172A] font-bold border-b-2 border-[#0F172A] pb-1 hover:text-[#84cc16] hover:border-[#84cc16] transition-colors mt-4">
                            Learn more
                        </button>
                    </motion.div>
                </div>
                <motion.div variants={imageVariant} className="order-2 flex justify-center">
                    <img src={satelliteImg} alt="Satellite MRV" className="w-full h-auto max-h-[500px] object-contain mix-blend-multiply" />
                </motion.div>
            </motion.div>


            {/* --- ROW 2: DYNAMIC BASELINES --- */}
            <motion.div 
              className="grid lg:grid-cols-2 gap-16 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={containerVariants}
            >
                {/* Image on Left */}
                <motion.div variants={imageVariant} className="order-2 lg:order-1 flex justify-center">
                    <img src={graphImg} alt="Dynamic Baselines" className="w-full h-auto max-h-[500px] object-contain mix-blend-multiply" />
                </motion.div>
                
                <div className="order-1 lg:order-2 flex flex-col gap-6">
                    <motion.h3 variants={textVariant} className="text-3xl font-bold text-[#0F172A]">
                        Dynamic Baselines & Risk
                    </motion.h3>
                    <motion.p variants={textVariant} className="text-lg text-gray-600 leading-relaxed">
                        We move beyond one-time assumptions. Using <strong>dynamic baselines</strong> and time-series analysis, we track project performance against real-world controls. This enables pre-issuance risk detection.
                    </motion.p>
                    <motion.ul variants={containerVariants} className="space-y-3">
                        <motion.li variants={textVariant} className="flex items-center gap-3 text-[#0F172A] font-semibold">
                            <div className="w-2 h-2 rounded-full bg-[#84cc16]"></div> Time-series analysis
                        </motion.li>
                        <motion.li variants={textVariant} className="flex items-center gap-3 text-[#0F172A] font-semibold">
                            <div className="w-2 h-2 rounded-full bg-[#84cc16]"></div> Pre-issuance risk detection
                        </motion.li>
                    </motion.ul>
                    <motion.div variants={textVariant}>
                        <button className="text-[#0F172A] font-bold border-b-2 border-[#0F172A] pb-1 hover:text-[#84cc16] hover:border-[#84cc16] transition-colors mt-4">
                            Explore Methodology
                        </button>
                    </motion.div>
                </div>
            </motion.div>


            {/* --- ROW 3: BUILT FOR INDIA --- */}
            <motion.div 
              className="grid lg:grid-cols-2 gap-16 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={containerVariants}
            >
                <div className="order-1 flex flex-col gap-6">
                    <motion.h3 variants={textVariant} className="text-3xl font-bold text-[#0F172A]">
                        Built for India
                    </motion.h3>
                    <motion.p variants={textVariant} className="text-lg text-gray-600 leading-relaxed">
                        Aligned with the Indian Carbon Market (ICM) and Verra standards. We don't just verify forests; our models cover <strong>multiple land-use types</strong> including agroforestry and wetlands.
                    </motion.p>
                    <motion.ul variants={containerVariants} className="space-y-3">
                        <motion.li variants={textVariant} className="flex items-center gap-3 text-[#0F172A] font-semibold">
                            <div className="w-2 h-2 rounded-full bg-[#84cc16]"></div> Continuous Monitoring
                        </motion.li>
                        <motion.li variants={textVariant} className="flex items-center gap-3 text-[#0F172A] font-semibold">
                            <div className="w-2 h-2 rounded-full bg-[#84cc16]"></div> Agroforestry & Wetlands
                        </motion.li>
                    </motion.ul>
                    <motion.div variants={textVariant}>
                        <button className="text-[#0F172A] font-bold border-b-2 border-[#0F172A] pb-1 hover:text-[#84cc16] hover:border-[#84cc16] transition-colors mt-4">
                            View Solutions
                        </button>
                    </motion.div>
                </div>
                <motion.div variants={imageVariant} className="order-2 flex justify-center">
                    <img src={indiaImg} alt="India Map" className="w-full h-auto max-h-[500px] object-contain mix-blend-multiply" />
                </motion.div>
            </motion.div>

        </div>
      </section>

    </div>
  );
};

export default HeroSection;