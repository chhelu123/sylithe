import React from 'react';
import { HiCheck, HiArrowRight, HiGlobe, HiShieldCheck, HiChartBar } from "react-icons/hi";
import { motion } from 'framer-motion';

// --- IMAGE IMPORTS ---
import chmHeroImage from '../../../assets/tree.jpg';
import measurementGapImage from '../../../assets/tree22.png';
import solutionImage from '../../../assets/tree20.jpg';
import processImage from '../../../assets/lulc8.png';
import developersImage from '../../../assets/lulc1.png';
import buyersImage from '../../../assets/lulc4.png';
import accuracyImage from '../../../assets/Tree50.png';
import coverageImage from '../../../assets/tree9.jpg';
import testimonialImage from '../../../assets/tree8.jpg';

// --- EXACT STYLING FROM DCAB MODEL ---
const cdStyle = {
  color: '#08292F',
  headingFont: '"Inter", "Helvetica Neue", Arial, sans-serif',
  bodyFont: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  accentColor: '#84cc16',
  lightAccent: '#f7fce5',
};

// --- ANIMATION VARIANTS (From DCAB) ---
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

const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// --- COMPONENTS (From DCAB) ---

const CleanImage = ({ src, alt, className = "", priority = false }) => (
  <div className={`w-full h-full min-h-[400px] relative rounded-3xl overflow-hidden group ${className}`}>
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
    />
  </div>
);

const CDHeading = ({ children, className = "", as = "h2", size = "large" }) => {
  const Component = as;

  const sizeClasses = {
    hero: 'text-5xl md:text-6xl lg:text-7xl',
    section: 'text-4xl md:text-5xl',
    card: 'text-2xl md:text-3xl',
  };

  return (
    <Component
      className={`font-medium tracking-tight mb-6 ${sizeClasses[size]} ${className}`}
      style={{
        fontFamily: cdStyle.headingFont,
        color: cdStyle.color,
        lineHeight: '1.1',
        letterSpacing: '-0.02em',
      }}
    >
      {children}
    </Component>
  );
};

const CDBody = ({ children, className = "", large = false }) => (
  <p
    className={`${large ? 'text-xl md:text-2xl' : 'text-lg'} ${className}`}
    style={{
      fontFamily: cdStyle.bodyFont,
      fontSize: large ? '22px' : '18px',
      lineHeight: '1.5',
      color: cdStyle.color,
      opacity: 0.9,
    }}
  >
    {children}
  </p>
);

const PillOutlineButton = ({ children }) => (
  <button
    className="group relative px-8 py-4 rounded-full border-2 font-medium text-lg transition-all duration-300 active:scale-95 flex items-center gap-2 hover:bg-[#08292F] hover:text-white"
    style={{
      borderColor: cdStyle.color,
      color: cdStyle.color,
      fontFamily: cdStyle.bodyFont,
    }}
  >
    {children}
    <HiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
  </button>
);

// --- MARQUEE (From DCAB) ---
const StandardsMarquee = () => {
  const standards = [
    { name: "Verra", subtext: "Verified Carbon Standard" },
    { name: "Gold Standard", subtext: "Certified Credits" },
    { name: "IC-VCM", subtext: "Integrity Council" },
    { name: "Science Based Targets", subtext: "Net Zero Standard" },
  ];

  const duplicated = [...standards, ...standards, ...standards, ...standards];

  return (
    <div className="relative w-full overflow-hidden bg-transparent py-12">
      <div className="flex animate-marquee">
        {duplicated.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center mx-12 min-w-[180px] opacity-60 hover:opacity-100 transition-opacity duration-300"
          >
            <span
              className="text-xl font-medium mb-1"
              style={{ fontFamily: cdStyle.headingFont, color: cdStyle.color }}
            >
              {item.name}
            </span>
            <span
              className="text-sm font-normal"
              style={{ fontFamily: cdStyle.bodyFont, color: 'rgba(8, 41, 47, 0.64)' }}
            >
              {item.subtext}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          width: fit-content;
          display: flex;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

const ChmModel = () => {
  return (
    <div
      className="w-full bg-white pt-20 overflow-hidden"
      style={{ fontFamily: cdStyle.bodyFont, color: cdStyle.color }}
    >

      {/* ================= 1. HERO SECTION ================= */}
      <section className="pt-12 pb-24 px-6 md:px-12 lg:px-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Text Left */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}>
            <span
              className="font-medium tracking-wide uppercase text-sm mb-6 block"
              style={{ color: cdStyle.accentColor, fontFamily: cdStyle.bodyFont }}
            >
              Sylithe Forest Intelligence
            </span>

            <CDHeading as="h1" size="hero" className="mb-8">
              See your forest carbon with <span style={{ color: cdStyle.accentColor }}>absolute clarity.</span>
            </CDHeading>

            <div style={{ maxWidth: '520px' }}>
              <CDBody large className="mb-10">
                Satellite-powered canopy height measurement calibrated by airborne LiDAR. Finally, know exactly how much carbon your forest is storing—without the cost and delay of manual field surveys.
              </CDBody>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="px-8 py-4 rounded-full font-medium text-lg transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 hover:opacity-90"
                style={{
                  backgroundColor: cdStyle.accentColor,
                  color: '#064e3b',
                  fontFamily: cdStyle.bodyFont,
                }}
              >
                <span>Request a demo</span>
                <HiArrowRight className="text-xl" />
              </button>
              <button
                className="px-8 py-4 rounded-full font-medium text-lg transition-all hover:bg-gray-50"
                style={{
                  color: cdStyle.color,
                  fontFamily: cdStyle.bodyFont,
                }}
              >
                View coverage map
              </button>
            </div>
          </motion.div>

          {/* Image Right */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}>
            <CleanImage src={chmHeroImage} alt="Canopy Height Model Visualization" priority={true} className="min-h-[500px]" />
          </motion.div>
        </div>
      </section>

      {/* ================= 2. THE MEASUREMENT GAP (Problem) ================= */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <CDHeading as="h2" size="section" className="mb-6">
              Traditional forest carbon estimates leave you exposed.
            </CDHeading>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <p
                className="text-xl text-gray-600 leading-relaxed"
                style={{ fontFamily: cdStyle.bodyFont }}
              >
                Whether you're issuing credits or buying them, unreliable biomass estimates create regulatory and reputational risk. Ground surveys are expensive and infrequent. Satellite indices alone lack validation. And static carbon maps miss the changes that matter.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerStagger}
          >
            {[
              {
                title: "Expensive & Slow",
                desc: "Manual field surveys cost thousands per site and take months to complete.",
                img: measurementGapImage
              },
              {
                title: "Unreliable Indices",
                desc: "Optical greenness confuses crops for forests and misses degradation entirely.",
                img: solutionImage
              },
              {
                title: "Outdated Maps",
                desc: "Static biomass estimates can't detect the disturbances that threaten permanence.",
                img: processImage
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemFade}
                className="flex flex-col items-start bg-white border border-gray-200 rounded-lg p-10 h-full hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-8 h-24 flex items-center justify-start">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-auto object-contain rounded-md"
                  />
                </div>

                <h3
                  className="text-2xl font-bold mb-4 text-[#08292F]"
                  style={{ fontFamily: cdStyle.headingFont, lineHeight: '1.2' }}
                >
                  {item.title}
                </h3>

                <p
                  className="text-lg text-gray-600 leading-relaxed flex-grow"
                  style={{ fontFamily: cdStyle.bodyFont }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= 3. WHAT WE OFFER (Solution) ================= */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          {/* Image Left */}
          <motion.div className="lg:order-first" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}>
            <CleanImage src={solutionImage} alt="Accurate Canopy Height Measurement" className="min-h-[500px]" />
          </motion.div>

          {/* Text Right */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}>
            <CDHeading as="h2" size="section" className="mb-8">
              Canopy height measurement you can bank on.
            </CDHeading>

            <CDBody large className="mb-6">
              We combine satellite imagery with spaceborne and airborne LiDAR to deliver annual canopy height maps at 10-meter resolution.
            </CDBody>

            <CDBody className="mb-8">
              This isn't theoretical modeling—these are measurements validated against actual laser scans of the forest. Understand forest structure from 2000 to present, anywhere in the world, with uncertainty quantified for every hectare.
            </CDBody>


          </motion.div>
        </div>
      </section>

      {/* ================= 4. HOW IT WORKS (Process) ================= */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white border-y" style={{ borderColor: 'rgba(8, 41, 47, 0.06)' }}>
        <div className="max-w-7xl mx-auto">

          <motion.div className="text-center max-w-4xl mx-auto mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <span
              className="font-medium tracking-widest uppercase text-sm mb-4 block"
              style={{ color: 'rgba(8, 41, 47, 0.5)', fontFamily: cdStyle.bodyFont }}
            >
              The Process
            </span>
            <CDHeading as="h2" size="section">From raw signal to structural certainty.</CDHeading>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Process Steps */}
            <motion.div
              className="space-y-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerStagger}
            >
              {[
                { step: "01", title: "Ingest", desc: "We pull multi-source satellite data—optical, radar, and LiDAR—for your specific area of interest." },
                { step: "02", title: "Calibrate", desc: "Our AI models learn from millions of GEDI and airborne LiDAR measurements to ground-truth the satellite signals." },
                { step: "03", title: "Measure", desc: "Generate annual canopy height maps showing precise tree growth and structural change year-over-year." },
                { step: "04", title: "Validate", desc: "Every pixel carries confidence intervals. We quantify uncertainty so you can defend your numbers in any audit." }
              ].map((item, idx) => (
                <motion.div key={idx} variants={itemFade} className="flex gap-8">
                  <span
                    className="text-5xl font-medium"
                    style={{ color: 'rgba(132, 204, 22, 0.4)', fontFamily: cdStyle.headingFont, lineHeight: '1' }}
                  >
                    {item.step}
                  </span>
                  <div>
                    <CDHeading as="h3" size="card" className="mb-2">{item.title}</CDHeading>
                    <CDBody className="mb-0">{item.desc}</CDBody>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Visual */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}>
              <CleanImage src={processImage} alt="Data Fusion Process" className="min-h-[600px]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 5. BUILT FOR CARBON MARKETS (Use Cases) ================= */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center max-w-4xl mx-auto mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <span
              className="font-medium tracking-widest uppercase text-sm mb-4 block"
              style={{ color: 'rgba(8, 41, 47, 0.5)', fontFamily: cdStyle.bodyFont }}
            >
              Use Cases
            </span>
            <CDHeading as="h2" size="section">High-integrity intelligence for every market participant.</CDHeading>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerStagger}
          >
            {[
              {
                icon: HiChartBar,
                title: "For Project Developers",
                desc: "Accelerate issuance timelines. Provide buyers with pre-issuance monitoring data that proves additionality before credits hit the market.",
                img: developersImage
              },
              {
                icon: HiShieldCheck,
                title: "For Corporate Buyers",
                desc: "De-risk your portfolio. Verify that purchased credits represent real biomass growth, not spreadsheet fantasy.",
                img: buyersImage
              },
              {
                icon: HiGlobe,
                title: "For Investors",
                desc: "Due diligence at scale. Screen hundreds of sites simultaneously for carbon potential and permanence risk.",
                img: coverageImage
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemFade}
                className="group rounded-3xl border overflow-hidden hover:shadow-xl transition-all duration-300 bg-white"
                style={{ borderColor: 'rgba(8, 41, 47, 0.08)' }}
              >
                <div className="h-64 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: cdStyle.lightAccent, color: cdStyle.accentColor }}
                  >
                    <item.icon className="text-2xl" />
                  </div>
                  <CDHeading as="h3" size="card" className="mb-3">{item.title}</CDHeading>
                  <CDBody className="mb-0">{item.desc}</CDBody>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= 6. THE ACCURACY ADVANTAGE (Dark Section) ================= */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#08292F] text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16">
            <span
              className="font-medium tracking-widest uppercase text-sm mb-4 block"
              style={{ color: cdStyle.accentColor, fontFamily: cdStyle.bodyFont }}
            >
              Why Canopy Height
            </span>
            <CDHeading as="h2" size="section" className="!text-white max-w-3xl">
              Why canopy height beats traditional biomass proxies
            </CDHeading>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Direct Measurement", desc: "We measure physical tree height, not spectral greenness—which often confuses crops for mature forests." },
              { title: "LiDAR-Calibrated", desc: "Every pixel is grounded in actual laser measurements from GEDI and airborne surveys, not modeling assumptions." },
              { title: "Uncertainty Transparent", desc: "We tell you exactly how confident we are in every measurement—critical for audit trails and risk management." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemFade}
                className="border-t border-white/20 pt-8"
              >
                <h3
                  className="text-2xl font-medium mb-4"
                  style={{ fontFamily: cdStyle.headingFont }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: cdStyle.bodyFont }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 7. GLOBAL COVERAGE (Capability) ================= */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Text Left */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}>
            <CDHeading as="h2" size="section" className="mb-8">
              From the Amazon to your backyard.
            </CDHeading>

            <CDBody large className="mb-6">
              Historical analysis back to 2015 (extending to 2000), covering tropical rainforests, temperate woodlands, and plantation projects. If it has canopy, we can measure it.
            </CDBody>

            {/* <div className="grid grid-cols-3 gap-8 mt-12">
                  <div 
                    className="p-8 rounded-2xl"
                    style={{ backgroundColor: cdStyle.lightAccent }}
                  >
                      <div 
                        className="text-5xl font-medium mb-2"
                        style={{ color: cdStyle.accentColor, fontFamily: cdStyle.headingFont }}
                      >
                        100+
                      </div>
                      <div 
                        className="text-lg font-medium"
                        style={{ color: cdStyle.color, fontFamily: cdStyle.bodyFont }}
                      >
                        Countries
                      </div>
                  </div>
                  <div 
                    className="p-8 rounded-2xl"
                    style={{ backgroundColor: cdStyle.lightAccent }}
                  >
                      <div 
                        className="text-5xl font-medium mb-2"
                        style={{ color: cdStyle.accentColor, fontFamily: cdStyle.headingFont }}
                      >
                        10m
                      </div>
                      <div 
                        className="text-lg font-medium"
                        style={{ color: cdStyle.color, fontFamily: cdStyle.bodyFont }}
                      >
                        Native Resolution
                      </div>
                  </div>
                  <div 
                    className="p-8 rounded-2xl"
                    style={{ backgroundColor: cdStyle.lightAccent }}
                  >
                      <div 
                        className="text-5xl font-medium mb-2"
                        style={{ color: cdStyle.accentColor, fontFamily: cdStyle.headingFont }}
                      >
                        Annual
                      </div>
                      <div 
                        className="text-lg font-medium"
                        style={{ color: cdStyle.color, fontFamily: cdStyle.bodyFont }}
                      >
                        Updates
                      </div> */}
            {/* </div> */}
            {/* </div> */}
          </motion.div>

          {/* Image Right */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}>
            <CleanImage src={coverageImage} alt="Global Coverage Map" className="min-h-[500px]" />
          </motion.div>
        </div>
      </section>

      {/* ================= 8. SEAMLESS INTEGRATION (Marquee) ================= */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50 border-y" style={{ borderColor: 'rgba(8, 41, 47, 0.06)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-8">
            <CDHeading as="h3" size="card" className="mb-2">Works with your existing workflow</CDHeading>
          </motion.div>
          <StandardsMarquee />
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-8 text-center text-lg max-w-3xl mx-auto"
            style={{ color: 'rgba(8, 41, 47, 0.64)', fontFamily: cdStyle.bodyFont }}
          >
            Export data directly to major carbon accounting platforms. Our canopy height layers integrate with VM0047 methodologies and align with emerging IC-VCM integrity guidelines.
          </motion.p>
        </div>
      </section>

      {/* ================= 9. TRUSTED BY LEADERS (Testimonial) ================= */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="rounded-3xl p-12 md:p-16 relative overflow-hidden"
            style={{ backgroundColor: cdStyle.lightAccent }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="relative z-10 grid md:grid-cols-3 gap-12 items-center">
              <div className="md:col-span-2">
                <span
                  className="font-medium tracking-widest uppercase text-sm mb-4 block"
                  style={{ color: cdStyle.accentColor, fontFamily: cdStyle.bodyFont }}
                >
                  Testimonial
                </span>
                <CDHeading as="h2" size="card" className="mb-6">
                  Trusted by industry leaders
                </CDHeading>
                <blockquote
                  className="text-2xl md:text-3xl font-normal leading-relaxed mb-8"
                  style={{ color: cdStyle.color, fontFamily: cdStyle.bodyFont }}
                >
                  "Sylithe's canopy data gave us the confidence to invest in a 50,000-hectare reforestation project. We knew the biomass potential before we broke ground."
                </blockquote>
                <div>
                  <div
                    className="font-bold text-lg"
                    style={{ color: cdStyle.color, fontFamily: cdStyle.headingFont }}
                  >
                    Director of Carbon
                  </div>
                  <div
                    className="text-gray-600"
                    style={{ fontFamily: cdStyle.bodyFont }}
                  >
                    Major Investment Firm
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <img src={testimonialImage} alt="Client" className="rounded-2xl shadow-lg w-full object-cover h-64" />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#84cc16]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          </motion.div>
        </div>
      </section>

      {/* ================= 10. CLOSING CTA ================= */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <CDHeading as="h1" size="hero" className="mb-8">
              Stop estimating.<br />
              <span style={{ color: cdStyle.accentColor }}>Start measuring.</span>
            </CDHeading>
            <div className="max-w-2xl mx-auto mb-10">
              <CDBody large>
                Get a sample canopy height analysis for your project area and see the difference that validated measurement makes.
              </CDBody>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => window.location.href = '/chm-verification'}
                className="px-10 py-4 rounded-full font-medium text-lg transition-all shadow-xl active:scale-95 hover:opacity-90"
                style={{ backgroundColor: cdStyle.accentColor, color: '#064e3b', fontFamily: cdStyle.bodyFont }}
              >
                Launch Dashboard
              </button>
              <PillOutlineButton>Talk to our science team</PillOutlineButton>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ChmModel;