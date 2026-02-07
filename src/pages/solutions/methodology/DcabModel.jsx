import React from 'react';
import { HiArrowRight } from "react-icons/hi";
import { motion } from 'framer-motion';

// --- IMAGE IMPORTS ---
import dcabHeroImage from '../../../assets/dcab1.png';
import problemImage from '../../../assets/tree22.png';
import solutionImage from '../../../assets/tree22.png';
import processImage from '../../../assets/lulc8.png';
import developersImage from '../../../assets/lulc1.png';
import buyersImage from '../../../assets/lulc4.png';
import auditorsImage from '../../../assets/Tree50.png';
import methodologyImage from '../../../assets/tree9.jpg';
import forestImage from '../../../assets/tree8.jpg';

// --- EXACT CARBON DIRECT STYLING FROM SCREENSHOTS ---
// Headings: Dark Teal (#08292F), Medium Weight
// Body: Dark Teal (#08292F), Regular Weight, 18px
// Accent: Light Green (#84cc16)
const cdStyle = {
  color: '#08292F',
  headingFont: '"Inter", "Helvetica Neue", Arial, sans-serif', // Simulating Telegraf with Inter/Helvetica
  bodyFont: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  accentColor: '#84cc16', // The green from the "Upload" button
  lightAccent: '#f7fce5', // The pale green background from the form/cards
};

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

// --- COMPONENTS ---

// Clean Image Component
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

// Styled Heading Component (Matching Screenshot Typography)
const CDHeading = ({ children, className = "", as = "h2", size = "large" }) => {
  const Component = as;
  
  // Sizes based on the screenshots provided
  const sizeClasses = {
    hero: 'text-5xl md:text-6xl lg:text-7xl', // Main Hero Title
    section: 'text-4xl md:text-5xl',           // Section Titles (e.g., "Advisory services")
    card: 'text-2xl md:text-3xl',              // Card Titles
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

// Styled Body Text Component (Matching Screenshot Typography)
const CDBody = ({ children, className = "", large = false }) => (
  <p 
    className={`${large ? 'text-xl md:text-2xl' : 'text-lg'} ${className}`}
    style={{
      fontFamily: cdStyle.bodyFont,
      fontSize: large ? '22px' : '18px', // Explicit 18px as requested
      lineHeight: '1.5',
      color: cdStyle.color,
      opacity: 0.9, // Slight soften for body text
    }}
  >
    {children}
  </p>
);

// Styled Button Component (Pill Outline)
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

// --- MARQUEE ---
const StandardsMarquee = () => {
  const standards = [
    { name: "Verra", subtext: "Verified Carbon Standard" },
    { name: "IC-VCM", subtext: "Integrity Council" },
    { name: "ABACUS", subtext: "High-Integrity Label" },
    { name: "Gold Standard", subtext: "Certified Credits" },
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

const DcabModel = () => {
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
                  Sylithe Baseline Confidence
                </span>
                
                <CDHeading as="h1" size="hero" className="mb-8">
                  Baselines rooted in <span style={{ color: cdStyle.accentColor }}>reality</span>, not assumptions.
                </CDHeading>
                
                <div style={{ maxWidth: '520px' }}> 
                  <CDBody large className="mb-10">
                    Our Dynamic Control Area Baseline (DCAB) proves your reforestation project is truly additional by comparing it to matched real-world controls that aren't part of any carbon program.
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
               </div>
            </motion.div>

            {/* Image Right */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}>
                <CleanImage src={dcabHeroImage} alt="Dynamic Baseline" priority={true} className="min-h-[500px]" />
            </motion.div>
        </div>
      </section>

      {/* ================= 2. THE CHALLENGE (Carbon Direct Style) ================= */}
<section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
  <div className="max-w-7xl mx-auto">
    
    {/* Header - Matching Carbon Direct "Our carbon removal options" style */}
    <motion.div 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      variants={fadeInUp} 
      className="text-center mb-16"
    >
      <CDHeading as="h2" size="section" className="mb-6">
        The challenge with current baselines
      </CDHeading>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <p 
          className="text-xl text-gray-600 leading-relaxed"
          style={{ fontFamily: cdStyle.bodyFont }}
        >
          Carbon markets currently suffer from inflated credit issuance because static projections often assume zero background reforestation—even when trees would have grown anyway.
        </p>
      </div>
    </motion.div>

    {/* Two Cards Grid - Exact Carbon Direct Layout */}
    <motion.div 
      className="grid md:grid-cols-2 gap-8"
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      variants={containerStagger}
    >
      {[
        { 
          title: "Phantom Credits Risk", 
          desc: "Static projections create non-additional credits that damage market integrity and expose buyers to greenwashing accusations.",
          cta: "Learn about additionality",
          img: problemImage
        },
        { 
          title: "Regulatory Exposure", 
          desc: "Emerging IC-VCM standards and buyer due diligence are increasingly rejecting projects with weak, assumption-based baselines.",
          cta: "Explore compliance standards",
          img: solutionImage
        }
      ].map((item, index) => (
        <motion.div 
          key={index} 
          variants={itemFade} 
          className="flex flex-col items-start bg-white border border-gray-200 rounded-lg p-10 h-full hover:shadow-lg transition-shadow duration-300"
        >
          {/* Small Image Top (Not Full Width) */}
          <div className="mb-8 h-24 flex items-center justify-start">
            <img 
              src={item.img} 
              alt={item.title} 
              className="h-full w-auto object-contain rounded-md" 
            />
          </div>

          {/* Title - Bold, Dark */}
          <h3 
            className="text-2xl font-bold mb-4 text-[#08292F]"
            style={{ fontFamily: cdStyle.headingFont, lineHeight: '1.2' }}
          >
            {item.title}
          </h3>

          {/* Description - Gray, Comfortable Reading */}
          <p 
            className="text-lg text-gray-600 leading-relaxed mb-8 flex-grow"
            style={{ fontFamily: cdStyle.bodyFont }}
          >
            {item.desc}
          </p>

          {/* Link - Forest Green with Arrow */}
          <a 
            href="#" 
            className="inline-flex items-center gap-2 font-bold text-lg transition-all hover:gap-3 mt-auto"
            style={{ 
              color: '#15803d', // Forest green like Carbon Direct
              fontFamily: cdStyle.bodyFont 
            }}
          >
            {item.cta} 
            <HiArrowRight className="text-xl" />
          </a>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>
      {/* ================= 3. THE DCAB SOLUTION ================= */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            {/* Image Left */}
            <motion.div className="lg:order-first" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}>
               <CleanImage src={solutionImage} alt="Control Areas" className="min-h-[500px]" />
            </motion.div>

            {/* Text Right */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}>
               <CDHeading as="h2" size="section" className="mb-8">
                 Observe the counterfactual. Count only the difference.
               </CDHeading>
               
               <CDBody large className="mb-6">
                  Instead of guessing what would have happened to your land, we find actual land that matches yours—same soil, same climate, same starting conditions.
               </CDBody>
               
               <CDBody>
                  The difference between your forest growth and the control's growth? That's your real, additional climate impact.
               </CDBody>
               
               
            </motion.div>
         </div>
      </section>

      {/* ================= 4. HOW IT WORKS ================= */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white border-y" style={{ borderColor: 'rgba(8, 41, 47, 0.06)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center max-w-4xl mx-auto mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <span 
              className="font-medium tracking-widest uppercase text-sm mb-4 block"
              style={{ color: 'rgba(8, 41, 47, 0.5)', fontFamily: cdStyle.bodyFont }}
            >
              The Process
            </span>
            <CDHeading as="h2" size="section">From matching to verification.</CDHeading>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <motion.div 
                className="space-y-12"
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={containerStagger}
             >
                {[
                    { step: "01", title: "Match", desc: "We algorithmically match your project to statistically similar non-project lands based on historical canopy height." },
                    { step: "02", title: "Monitor", desc: "We track both your project and the control area annually using canopy height models." },
                    { step: "03", title: "Compare", desc: "We calculate the difference in carbon accumulation between project and control." },
                    { step: "04", title: "Credit", desc: "You earn credits only for additional carbon removed above the dynamic baseline." }
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

             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}>
                <CleanImage src={processImage} alt="Process" className="min-h-[600px]" />
             </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 5. BUILT FOR CARBON MARKETS ================= */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
            <motion.div className="text-center max-w-4xl mx-auto mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <span 
                  className="font-medium tracking-widest uppercase text-sm mb-4 block"
                  style={{ color: 'rgba(8, 41, 47, 0.5)', fontFamily: cdStyle.bodyFont }}
                >
                  Use Cases
                </span>
                <CDHeading as="h2" size="section">Empirical evidence for every stakeholder.</CDHeading>
            </motion.div>

            <motion.div 
                className="grid md:grid-cols-3 gap-8"
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={containerStagger}
            >
                {[
                    { title: "Project Developers", desc: "Originate higher-integrity projects. Pre-issuance baseline certainty helps secure upfront financing.", img: developersImage },
                    { title: "Corporate Buyers", desc: "Eliminate reputational risk. Know your retired credits represent real, additional removal.", img: buyersImage },
                    { title: "Auditors & Verifiers", desc: "Access data-driven evidence of additionality. Streamline validation with standardized outputs.", img: auditorsImage }
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
                            <CDHeading as="h3" size="card" className="mb-3">{item.title}</CDHeading>
                            <CDBody className="mb-0">{item.desc}</CDBody>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
      </section>

      {/* ================= 6. WHY DYNAMIC ================= */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#08292F] text-white">
         <div className="max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16">
                <span 
                  className="font-medium tracking-widest uppercase text-sm mb-4 block"
                  style={{ color: cdStyle.accentColor, fontFamily: cdStyle.bodyFont }}
                >
                  Why Dynamic Baselines
                </span>
                <CDHeading as="h2" size="section" className="!text-white max-w-3xl">
                  Static guesses can't capture reality. Observation can.
                </CDHeading>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12">
                {[
                    { title: "Empirically Tested", desc: "Validate matching using 'pseudo-projects'—random non-project areas where we prove the method works." },
                    { title: "Annually Updated", desc: "Captures changing commodity prices, policy shifts, and climate events that static projections miss." },
                    { title: "Standards Aligned", desc: "Compliant with VM0047 for Afforestation & Reforestation. Recognized by IC-VCM." }
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

      {/* ================= 7. METHODOLOGY ================= */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}>
               <CDHeading as="h2" size="section" className="mb-8">
                 The science of statistical matching.
               </CDHeading>
               
               <CDBody large className="mb-6">
                  DCAB relies on the principle of causal inference: if two plots of land are statistically identical at the start, their divergence can be attributed to the intervention.
               </CDBody>
               
               <CDBody className="mb-8">
                  Our methodology employs k-Nearest Neighbor matching on canopy height trajectories.
               </CDBody>
               
               <div className="grid grid-cols-2 gap-6">
                  <div className="p-8 rounded-2xl" style={{ backgroundColor: cdStyle.lightAccent }}>
                      <div className="text-5xl font-medium mb-2" style={{ color: cdStyle.accentColor, fontFamily: cdStyle.headingFont }}>
                        &lt;1m
                      </div>
                      <div className="text-lg font-medium" style={{ color: cdStyle.color, fontFamily: cdStyle.bodyFont }}>
                        Target Uncertainty
                      </div>
                  </div>
                  <div className="p-8 rounded-2xl" style={{ backgroundColor: cdStyle.lightAccent }}>
                      <div className="text-5xl font-medium mb-2" style={{ color: cdStyle.accentColor, fontFamily: cdStyle.headingFont }}>
                        95%
                      </div>
                      <div className="text-lg font-medium" style={{ color: cdStyle.color, fontFamily: cdStyle.bodyFont }}>
                        Confidence Intervals
                      </div>
                  </div>
               </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}>
               <CleanImage src={methodologyImage} alt="Methodology" className="min-h-[500px]" />
            </motion.div>
         </div>
      </section>

      {/* ================= 8. STANDARDS MARQUEE ================= */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50 border-y" style={{ borderColor: 'rgba(8, 41, 47, 0.06)' }}>
         <div className="max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-8">
               <CDHeading as="h3" size="card" className="mb-2">Aligns with major crediting standards</CDHeading>
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
               DCAB outputs integrate directly with Verra's VCS program and satisfy IC-VCM requirements.
            </motion.p>
         </div>
      </section>

      {/* ================= 9. SYLITHE APPROACH ================= */}
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
                       Our Philosophy
                     </span>
                     <CDHeading as="h2" size="card" className="mb-6">
                       Integrity through observation.
                     </CDHeading>
                     <CDBody large className="mb-6">
                        Sylithe is built on the belief that carbon markets deserve measurement systems as rigorous as financial auditing.
                     </CDBody>
                     <CDBody className="mb-0">
                        By treating additionality as an empirical question, we restore confidence in nature-based carbon removal.
                     </CDBody>
                  </div>
                  <div className="hidden md:block">
                     <img src={forestImage} alt="Forest" className="rounded-2xl shadow-lg w-full object-cover h-64" />
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
                 Eliminate baseline risk from<br/>
                 <span style={{ color: cdStyle.accentColor }}>your portfolio.</span>
               </CDHeading>
               <div className="max-w-2xl mx-auto mb-10">
                 <CDBody large>
                   Get a dynamic baseline analysis for your ARR project and issue credits with confidence.
                 </CDBody>
               </div>
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                    className="px-10 py-4 rounded-full font-medium text-lg transition-all shadow-xl active:scale-95 hover:opacity-90"
                    style={{ backgroundColor: cdStyle.accentColor, color: '#064e3b', fontFamily: cdStyle.bodyFont }}
                  >
                     Assess your baseline
                  </button>
                  <PillOutlineButton>Talk to our team</PillOutlineButton>
               </div>
            </motion.div>
         </div>
      </section>
    </div>
  );
};

export default DcabModel;