import React from 'react';
import { HiCheck, HiArrowRight, HiOutlineLightningBolt, HiOutlineDatabase, HiOutlineGlobeAlt, HiOutlineShieldCheck } from "react-icons/hi";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

// --- IMAGE IMPORTS ---
import heroDashboard from '../assets/dashboard.jpg';
import systemArch from '../assets/lulc10.png';
import dataFusion from '../assets/chm22.png';


// --- ANIMATION VARIANTS ---
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

// --- REUSABLE COMPONENTS ---
const CleanImage = ({ src, alt, className = "", priority = false }) => (
    <div className={`w-full h-full min-h-[400px] relative rounded-3xl overflow-hidden shadow-2xl group ${className}`}>
        <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
    </div>
);

const SectionHeading = ({ children, className = "" }) => (
    <h2 className={`text-4xl md:text-5xl font-bold text-[#0F172A] leading-tight mb-6 tracking-tight ${className}`}>
        {children}
    </h2>
);

const Platform = () => {
    // Shared Styles
    const bodyStyle = "text-base md:text-lg text-slate-600 leading-[1.7] mb-6 font-medium";
    const accentColor = "text-[#16a34a]";

    const capabilities = [
        {
            icon: <HiOutlineDatabase className="text-3xl text-[#16a34a]" />,
            title: "Multi-Sensor Ingestion",
            desc: "Native integration of Optical, SAR, LiDAR, and GEDI data streams continuously feeding into our models."
        },
        {
            icon: <HiOutlineLightningBolt className="text-3xl text-[#16a34a]" />,
            title: "AI-Driven Processing",
            desc: "Proprietary deep learning models that execute complex LULC, CHM, and DCAB derivations in real time."
        },
        {
            icon: <HiOutlineGlobeAlt className="text-3xl text-[#16a34a]" />,
            title: "Dynamic Baselines",
            desc: "Algorithmic generation of dynamic baselines allowing for highly precise additionality assessments."
        },
        {
            icon: <HiOutlineShieldCheck className="text-3xl text-[#16a34a]" />,
            title: "Automated MRV & Reporting",
            desc: "Generate Verra and ICM-aligned audit reports instantaneously, drastically reducing verification cycles."
        }
    ];

    return (
        <div className="w-full bg-[#F1F1F1] font-sans text-[#0F172A] pt-20 overflow-hidden">

            {/* ================= 1. HERO SECTION (Text Left | Image Right) ================= */}
            <section className="pt-12 pb-24 px-6 md:px-12 lg:px-24 bg-[#F1F1F1] border-b border-gray-200">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                    {/* Text Left */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}>
                        <span className={`${accentColor} font-bold tracking-widest uppercase text-xs mb-6 block`}>
                            The Sylithe Platform
                        </span>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0F172A] leading-[1.1] tracking-tight mb-8">
                            Continuous <br />
                            carbon <span className="text-[#16a34a]">intelligence.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 leading-[1.6] font-medium mb-10 max-w-[500px]">
                            The unified operating system for high-integrity nature-based solutions. From pixel to portfolio, we power the next generation of MRV.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-[#16a34a] text-white px-8 py-4 rounded-full font-bold text-base hover:bg-[#0F172A] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                                Request a Demo <HiArrowRight />
                            </button>
                        </div>
                    </motion.div>

                    {/* Image Right */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}>
                        <CleanImage src={heroDashboard} alt="Sylithe Platform Dashboard" priority={true} />
                    </motion.div>
                </div>
            </section>

            {/* ================= 2. CORE CAPABILITIES (Grid) ================= */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className={`${accentColor} font-bold tracking-widest uppercase text-xs mb-4 block`}>Platform Infrastructure</span>
                        <SectionHeading>Built for global scale and pixel-level precision.</SectionHeading>
                        <p className={bodyStyle}>Our architecture is entirely serverless, heavily parallelized, and built specifically to process petabytes of Earth observation data.</p>
                    </div>

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {capabilities.map((cap, idx) => (
                            <motion.div key={idx} variants={fadeInUp} className="bg-[#F1F1F1] p-8 rounded-3xl border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                                <h3 className="text-xl font-bold text-[#0F172A] mb-3">{cap.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed font-medium">{cap.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ================= 3. SYSTEM ARCHITECTURE (Image Left | Text Right) ================= */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#F1F1F1]">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

                    <motion.div className="lg:order-first" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}>
                        <CleanImage src={systemArch} alt="Sylithe System Architecture" className="min-h-[500px]" />
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}>
                        <span className={`${accentColor} font-bold tracking-widest uppercase text-xs mb-6 block`}>Unified Workflow</span>
                        <SectionHeading>End-to-end processing pipeline.</SectionHeading>
                        <p className={bodyStyle}>
                            Stop stitching together disparate GIS tools, spreadsheets, and manual scripts. The Sylithe platform unifies the entire MRV lifecycle into a single, cohesive interface.
                        </p>
                        <ul className="space-y-4 mt-8">
                            {['Upload standard project boundaries (KML/GeoJSON)', 'Automatically fetch historical satellite archives', 'Execute LULC stratification and disturbance checks', 'Generate audit-ready issuance reports in one click'].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                                    <HiCheck className="text-[#16a34a] text-xl shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* ================= 4. DATA FUSION (Text Left | Image Right) ================= */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-white border-y border-gray-200">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}>
                        <span className={`${accentColor} font-bold tracking-widest uppercase text-xs mb-6 block`}>Deep Integration</span>
                        <SectionHeading>Multi-source algorithmic fusion.</SectionHeading>
                        <p className={bodyStyle}>
                            Relying solely on optical data is no longer adequate for modern integrity standards. Sylithe's architecture natively fuses Optical indices with Synthetic Aperture Radar (SAR) and Spaceborne LiDAR.
                        </p>
                        <p className={bodyStyle}>
                            This tri-layered approach guarantees penetration through dense cloud cover and accurate above-ground biomass quantification, regardless of geographic location.
                        </p>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}>
                        <CleanImage src={dataFusion} alt="Multi-Sensor Fusion Engine" />
                    </motion.div>
                </div>
            </section>

            {/* ================= 5. BOTTOM CTA ================= */}
            <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#0F172A] text-white text-center relative overflow-hidden">
                {/* Abstract background blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full border border-white/5 rounded-[100%] scale-[2] pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-full border border-[#16a34a]/20 rounded-[100%] scale-[1.5] bg-[#16a34a]/5 pointer-events-none blur-3xl" />

                <motion.div
                    className="max-w-3xl mx-auto relative z-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Ready to integrate <br /> with Sylithe?</h2>
                    <p className="text-lg md:text-xl text-slate-300 font-medium mb-10">
                        Join the leading project developers and carbon registries using Sylithe to power the next generation of high-integrity carbon credits.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-[#16a34a] text-white px-10 py-4 rounded-full font-bold text-base hover:bg-white hover:text-[#0F172A] transition-all shadow-xl active:scale-95">
                            Schedule Demo
                        </button>
                        <button className="bg-transparent border border-white/20 text-white px-10 py-4 rounded-full font-bold text-base hover:bg-white/10 transition-all shadow-md active:scale-95">
                            Contact us
                        </button>
                    </div>
                </motion.div>
            </section>

        </div>
    );
};

export default Platform;
