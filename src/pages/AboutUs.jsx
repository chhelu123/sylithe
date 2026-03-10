import React from 'react';
import { motion } from 'framer-motion';
import ScrollExpandMedia from '../components/ui/scroll-expansion-hero';
import { WorldMap } from '../components/ui/map';
import { BackgroundGlow } from '../components/ui/background-glow';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const staggerChildren = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const AboutUs = () => {
    return (
        <div className="bg-[#081C15] text-white font-sans w-full">
            <ScrollExpandMedia
                mediaType="video"
                mediaSrc="https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1"
                posterSrc="https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg"
                bgImageSrc="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop"
                title="Rooted in ecology, driven by intelligence."
                date="Sylithe"
                scrollToExpand="Scroll to explore"
                textBlend={false}
            >
                {/* 
          ========================================================================
          MAIN CONTENT WITH GLOW BACKGROUND
          ========================================================================
        */}
                <BackgroundGlow glowColor="#84cc16" glowOpacity={0.08} glowPosition="center 10%">
                    <section className="py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full relative z-10">
                        {/* Introductory Statement */}
                        <motion.div
                            className="max-w-4xl mb-24"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeUp}
                        >
                            <h2 className="text-[#84cc16] text-sm font-bold uppercase tracking-widest mb-6">
                                About Sylithe
                            </h2>
                            <h3 className="text-4xl md:text-6xl font-[Telegraf_Bold,var(--font-sans)] font-bold text-white leading-tight">
                                We are bridging the gap between <span className="text-gray-400">ecological reality</span> and the <span className="text-gray-400">carbon economy</span>.
                            </h3>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                            {/* Visual Side — Animated World Map */}
                            <motion.div
                                className="relative flex flex-col gap-6"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={fadeUp}
                            >
                                <div className="rounded-2xl overflow-hidden shadow-2xl">
                                    <WorldMap
                                        showLabels={true}
                                        dots={[
                                            { start: { lat: 5.3600, lng: -4.0083, label: "Côte d'Ivoire" }, end: { lat: -1.2921, lng: 36.8219, label: "Kenya" } },
                                            { start: { lat: -1.2921, lng: 36.8219, label: "Kenya" }, end: { lat: -15.7975, lng: -47.8919, label: "Brazil" } },
                                            { start: { lat: -15.7975, lng: -47.8919, label: "Brazil" }, end: { lat: 4.3947, lng: 114.0000, label: "Borneo" } },
                                            { start: { lat: 4.3947, lng: 114.0000, label: "Borneo" }, end: { lat: 51.5074, lng: -0.1278, label: "London" } },
                                            { start: { lat: 51.5074, lng: -0.1278, label: "London" }, end: { lat: 28.6139, lng: 77.2090, label: "New Delhi" } },
                                            { start: { lat: 28.6139, lng: 77.2090, label: "New Delhi" }, end: { lat: -33.8688, lng: 151.2093, label: "Sydney" } },
                                        ]}
                                    />
                                </div>

                                {/* Italic callout below map */}
                                <p className="text-sm text-gray-400 italic leading-relaxed">
                                    By combining advanced satellite intelligence, geospatial analytics, and machine learning, <span className="text-white not-italic">Sylithe continuously monitors ecosystems</span> to transform static reporting into a living verification engine.
                                </p>

                            </motion.div>

                            {/* Content Side */}
                            <motion.div
                                className="text-lg text-gray-300 leading-relaxed font-light flex flex-col justify-center h-full"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={fadeUp}
                            >

                                <div className="mb-12">
                                    <p className="text-2xl text-white font-[Telegraf_Bold,var(--font-sans)] leading-relaxed mb-6">
                                        The global carbon market is built on a vital resource: <span className="text-[#84cc16]">Trust</span>. Yet, the legacy systems used to measure forest carbon remain frustratingly fragmented.
                                    </p>
                                    <p className="text-gray-400">
                                        Forests act as Earth's most powerful carbon sinks, but determining their true storage capacity requires understanding complex variables like structure, biomass, and disturbance history. Traditional monitoring relies heavily on limited field surveys and infrequent reporting. This creates dangerous blind spots between what forests actually store and what the market assumes.
                                    </p>
                                </div>





                            </motion.div>
                        </div>
                    </section>

                    {/* 
          ========================================================================
          VERIFICATION PIPELINE FLOW SECTION
          ========================================================================
        */}
                    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full">
                        <motion.div
                            className="mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeUp}
                        >
                            <h2 className="text-[#84cc16] text-sm font-bold uppercase tracking-widest mb-4">
                                The Pipeline
                            </h2>
                            <h3 className="text-3xl md:text-5xl font-[Telegraf_Bold,var(--font-sans)] font-bold text-white leading-tight">
                                How Sylithe verifies forests,<br className="hidden md:block" /> step by step.
                            </h3>
                            <p className="text-gray-400 mt-4 max-w-2xl">
                                Every analysis starts from a single project boundary and flows through our full-stack environmental intelligence engine.
                            </p>
                        </motion.div>

                        {/* Vertical Flow Steps */}
                        <div className="flex flex-col relative">
                            {[
                                {
                                    step: "01",
                                    label: "Import Project",
                                    sublabel: "KML / Boundary",
                                    desc: "Define the forest area of interest by uploading a KML project file with precise geographic boundaries. This anchors the entire analysis to your specific site.",
                                    img: "/src/assets/Importkml.png",
                                },
                                {
                                    step: "02",
                                    label: "LULC",
                                    sublabel: "Land Use & Land Cover",
                                    desc: "Classify land use and land cover using multi-source satellite imagery to detect deforestation, degradation, agricultural conversion, and land-use change events.",
                                    img: "/src/assets/lulc1.png",
                                },
                                {
                                    step: "03",
                                    label: "CHM",
                                    sublabel: "Canopy Height Model",
                                    desc: "Build a precise canopy height model across the entire forest boundary to understand vertical structure, tree density, and above-ground biomass potential.",
                                    img: "/src/assets/chm11.png",
                                },
                                {
                                    step: "04",
                                    label: "DCAB",
                                    sublabel: "Disturbance & Carbon Adjustment Baseline",
                                    desc: "Apply historical disturbance data — including wildfires, selective logging, and land-use shifts — to dynamically adjust the carbon adjustment baseline for accurate reporting.",
                                    img: "/src/assets/dcab-new.png",
                                },
                                {
                                    step: "05",
                                    label: "AGB",
                                    sublabel: "Above Ground Biomass",
                                    desc: "Calculate the total above-ground biomass to derive verified carbon stock estimates. The results are ready for third-party validation and carbon market reporting.",
                                    img: "/src/assets/agb-chart-nobg.png",
                                },
                            ].map((item, idx, arr) => (
                                <motion.div
                                    key={item.step}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-50px" }}
                                    variants={fadeUp}
                                >
                                    {/* Step Row */}
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center py-10">
                                        {/* Step Number */}
                                        <div className="lg:col-span-2 flex-shrink-0">
                                            <span className="font-[Telegraf_Bold,var(--font-sans)] text-7xl md:text-8xl font-black leading-none text-[#84cc16]/25 select-none">
                                                {item.step}
                                            </span>
                                        </div>

                                        {/* Text Content */}
                                        <div className="lg:col-span-6">
                                            <h4 className="text-white font-[Telegraf_Bold,var(--font-sans)] text-3xl md:text-4xl font-bold mb-2">
                                                {item.label}
                                            </h4>
                                            <p className="text-[#84cc16] text-xs font-bold uppercase tracking-widest mb-4">
                                                {item.sublabel}
                                            </p>
                                            <p className="text-gray-400 leading-relaxed max-w-xl">
                                                {item.desc}
                                            </p>
                                        </div>

                                        {/* Image OR Custom Component */}
                                        <div className="lg:col-span-4 flex justify-center items-center">
                                            <div className="group w-full flex justify-center">
                                                {item.customComponent ? (
                                                    item.customComponent
                                                ) : (
                                                    <img
                                                        src={item.img}
                                                        alt={item.label}
                                                        className="max-w-full h-auto max-h-56 object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Animated Arrow between steps */}
                                    {idx < arr.length - 1 && (
                                        <div className="flex items-center gap-3 pl-4 lg:pl-16 py-2">
                                            <div className="flex items-center gap-2 animate-arrow-float">
                                                {[0, 1, 2].map(i => (
                                                    <svg
                                                        key={i}
                                                        width="20" height="20" viewBox="0 0 24 24" fill="none"
                                                        className="text-[#84cc16]"
                                                        style={{ opacity: 0.3 + i * 0.3, transform: `translateX(${i * 4}px)` }}
                                                    >
                                                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#84cc16]/30 to-transparent"></div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* 
          ========================================================================
          THE IDEA BEHIND SYLITHE SECTION (REDESIGNED)
          ========================================================================
        */}
                    <section className="py-16 md:py-32 px-6 md:px-12 lg:px-24 mb-24 max-w-7xl mx-auto w-full relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                            {/* Content Side */}
                            <motion.div
                                className="order-2 lg:order-1 text-lg text-gray-300 leading-relaxed font-light flex flex-col justify-center h-full"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={fadeUp}
                            >

                                <div className="mb-12">
                                    <h2 className="text-[#84cc16] text-sm font-bold uppercase tracking-widest mb-6">
                                        The Philosophy
                                    </h2>
                                    <h3 className="text-4xl md:text-5xl font-[Telegraf_Bold,var(--font-sans)] font-bold text-white leading-tight mb-8">
                                        A foundation built on <br className="hidden md:block" />ecological truth.
                                    </h3>
                                    <p className="text-gray-400 mb-6">
                                        The name <strong className="text-white font-medium">Sylithe</strong> is a direct reflection of our core philosophy.
                                    </p>
                                    <p className="text-gray-400">
                                        It exists at the exact intersection of deep ecology, satellite intelligence, and climate technology. We are building the definitive system where forests can be continuously monitored, objectively verified, and profoundly understood with rigorous scientific clarity.
                                    </p>
                                </div>

                                {/* Manifesto Quote — plain and simple */}
                                <div className="mt-2">
                                    <p className="text-gray-400 leading-relaxed">
                                        Together, the name represents our singular guiding principle:
                                    </p>
                                    <p className="mt-3 text-xl text-white font-[Telegraf_Bold,var(--font-sans)] font-medium leading-snug">
                                        Building a solid foundation of <span className="text-[#84cc16]">trust</span> for forests and the new carbon economy.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Visual Side with Name Breakdown */}
                            <motion.div
                                className="order-1 lg:order-2 relative group h-full"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={fadeUp}
                            >

                                {/* Main Image */}
                                <div className="relative h-[600px] w-full flex justify-center items-center">
                                    <img
                                        src="/src/assets/tree22.png"
                                        alt="The Philosophy of Sylithe"
                                        className="w-full max-h-[500px] object-contain drop-shadow-2xl transform scale-105 transition-transform duration-700 group-hover:scale-100"
                                    />
                                </div>

                                {/* Syl+lithe Details Card (Bottom Right) */}
                                <div className="absolute -right-12 xl:-right-32 -bottom-12 xl:-bottom-24 z-20 bg-black/20 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-2xl font-[Telegraf_Bold,var(--font-sans)] w-full max-w-sm">
                                    <div className="flex flex-col gap-4">
                                        <div className="border-b border-white/10 pb-4">
                                            <p className="text-[#84cc16] text-xs font-sans tracking-widest uppercase mb-1">Origin 1</p>
                                            <p className="text-white text-3xl font-black tracking-tight">“Sylva”</p>
                                            <p className="text-sm text-gray-400 font-sans font-light mt-1 max-w-[250px]">Latin for forest; Earth’s most powerful natural carbon sink.</p>
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-[#84cc16] text-xs font-sans tracking-widest uppercase mb-1">Origin 2</p>
                                            <p className="text-white text-3xl font-black tracking-tight">“Lith”</p>
                                            <p className="text-sm text-gray-400 font-sans font-light mt-1 max-w-[250px]">A foundation; something solid and intrinsically reliable.</p>
                                        </div>
                                    </div>
                                </div>

                            </motion.div>
                        </div>
                    </section>
                </BackgroundGlow>
            </ScrollExpandMedia>
        </div>
    );
};

export default AboutUs;
