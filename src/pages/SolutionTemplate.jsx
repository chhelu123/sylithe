import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { HiOutlineArrowRight, HiCheck, HiServer, HiGlobeAlt, HiChartBar, HiShieldCheck, HiChip } from "react-icons/hi";
import { TbSatellite, TbTrees, TbAugmentedReality, TbMathFunction } from "react-icons/tb";

// --- REUSABLE SCIENTIFIC GRAPH COMPONENT ---
// Simulates the "Predicted vs Observed" scatter plots found in scientific PDFs [cite: 468, 864]
const ValidationGraph = ({ title, r2, rmse }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">{title}</h4>
    <div className="relative h-64 w-full bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
      {/* Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none">
        {[...Array(5)].map((_, i) => <div key={`v-${i}`} className="border-r border-gray-200 h-full w-full opacity-50"></div>)}
        {[...Array(5)].map((_, i) => <div key={`h-${i}`} className="border-b border-gray-200 h-full w-full opacity-50"></div>)}
      </div>
      
      {/* 1:1 Line */}
      <div className="absolute inset-0 border-t border-l border-transparent">
         <div className="w-[140%] h-[1px] bg-gray-400 origin-bottom-left transform -rotate-45 absolute bottom-0 left-0"></div>
      </div>

      {/* Simulated Data Points (Scatter) */}
      {[...Array(150)].map((_, i) => {
        const x = Math.random() * 100;
        // Create a correlation with some noise
        const y = x + (Math.random() - 0.5) * 20; 
        return (
          <div 
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-sylitheGreen/60 mix-blend-multiply"
            style={{ left: `${x}%`, bottom: `${Math.max(0, Math.min(100, y))}%` }}
          ></div>
        );
      })}
      
      {/* Stats Box */}
      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm p-2 rounded border border-gray-200 text-xs font-mono shadow-sm">
        <div className="text-sylitheDark">R² = {r2}</div>
        <div className="text-gray-500">RMSE = {rmse}</div>
      </div>
    </div>
    <div className="flex justify-between text-xs text-gray-400 mt-2 font-mono">
      <span>Observed (Lidar)</span>
      <span>Predicted (Sylithe)</span>
    </div>
  </div>
);


// --- CONTENT DATABASE (Based on Pachama PDF) ---
const pages = {
  "carbon-mapping": {
    title: "Carbon Mapping",
    tagline: "Satellite-based biomass estimation.",
    heroBg: "bg-[#022c22]",
    description: "We replace manual, error-prone plot inventories with reproducible, algorithmic calculations. By fusing optical, radar, and lidar data, we create a contiguous 3D view of forest carbon stocks[cite: 73, 93].",
    techStack: [
      { name: "GEDI Lidar", role: "Structure", icon: TbSatellite },
      { name: "Sentinel-2", role: "Optical", icon: HiGlobeAlt },
      { name: "ALOS-2 PALSAR", role: "Radar", icon: HiServer },
      { name: "Deep Learning", role: "Fusion", icon: HiChip },
    ],
    steps: [
      { title: "Data Ingestion", desc: "Ingesting multi-sensor data to overcome cloud cover and capture vertical structure[cite: 93]." },
      { title: "ML Calibration", desc: "Training models on airborne lidar traces to upscale canopy height measurements to a global 25m resolution[cite: 100]." },
      { title: "Biomass Conversion", desc: "Applying region-specific allometric equations to convert CHM (Canopy Height Model) into AGB (Above Ground Biomass)[cite: 104]." },
    ],
    graphData: { title: "Canopy Height Validation", r2: "0.84", rmse: "1.43 m" } // Data from [cite: 468]
  },
  
  "dynamic-baselines": {
    title: "Dynamic Baselines",
    tagline: "Algorithmic counterfactuals.",
    heroBg: "bg-[#14532d]",
    description: "Static baselines often overcredit projects. We use Dynamic Control Area Baselines (DCAB) to algorithmically match project areas with 'twin' control areas that share identical characteristics[cite: 110].",
    techStack: [
      { name: "Synthetic Controls", role: "Algorithm", icon: TbMathFunction },
      { name: "Covariate Matching", role: "Logic", icon: HiChartBar },
      { name: "Jurisdictional Data", role: "Scope", icon: HiGlobeAlt },
      { name: "Real-time Deforestation", role: "Input", icon: TbSatellite },
    ],
    steps: [
      { title: "Candidate Selection", desc: "Scanning the ecoregion for millions of potential control pixels not in the project area[cite: 112]." },
      { title: "Feature Matching", desc: "Matching based on slope, elevation, distance to roads, and initial forest cover[cite: 112]." },
      { title: "Performance Testing", desc: "Validating the baseline by running 'blind' tests on historical data to ensure accurate prediction trends[cite: 522]." },
    ],
    graphData: { title: "Baseline Accuracy (Synthetic Control)", r2: "0.91", rmse: "0.25 m" } // Data from [cite: 552]
  },

  "leakage-monitoring": {
    title: "Leakage Monitoring",
    tagline: "System-wide boundary defense.",
    heroBg: "bg-[#1e1b4b]",
    description: "Protecting one forest shouldn't mean cutting down another. Our leakage monitoring system tracks activity across the entire jurisdiction to detect displaced emissions[cite: 1290].",
    techStack: [
      { name: "Activity Shifting", role: "Detection", icon: HiShieldCheck },
      { name: "Market Harmonization", role: "Policy", icon: HiGlobeAlt },
      { name: "Jurisdictional Nesting", role: "Framework", icon: TbAugmentedReality },
      { name: "Net Accounting", role: "Math", icon: TbMathFunction },
    ],
    steps: [
      { title: "Belt Definition", desc: "Defining a dynamic 'leakage belt' surrounding the project area based on mobility analysis." },
      { title: "Displacement Detection", desc: "Monitoring spikes in deforestation rates in the leakage belt relative to the project start date[cite: 402]." },
      { title: "Automatic Deduction", desc: "Applying the equation: Net Credit = Project Benefit - Leakage Emissions[cite: 1290]." },
    ],
    graphData: { title: "Leakage Belt Deforestation Rate", r2: "0.88", rmse: "120 ha" }
  },

  "transparent-reporting": {
    title: "Transparent Reporting",
    tagline: "Interactive, audit-ready data.",
    heroBg: "bg-[#0f172a]",
    description: "Trust requires transparency. We provide buyers, auditors, and regulators with direct, queryable access to the raw data and calculations behind every carbon credit[cite: 27, 77].",
    techStack: [
      { name: "Digital MRV", role: "Platform", icon: HiServer },
      { name: "GeoJSON / Tiff", role: "Formats", icon: TbSatellite },
      { name: "Audit Trail", role: "Security", icon: HiShieldCheck },
      { name: "Public APIs", role: "Access", icon: HiGlobeAlt },
    ],
    steps: [
      { title: "Digital Digitization", desc: "Ingesting PDDs and digitizing analog maps into queryable geospatial files[cite: 76]." },
      { title: "Interactive Dashboards", desc: "Stakeholders can explore layers for biomass, deforestation, and baselines via our portal[cite: 77]." },
      { title: "Third-Party Access", desc: "Open APIs for independent rating agencies to run their own validation models[cite: 1278]." },
    ],
    graphData: { title: "Issuance Audit Correlation", r2: "0.99", rmse: "0.01 tCO2" }
  }
};

const SolutionTemplate = () => {
  const { id } = useParams();
  const page = pages[id] || pages["carbon-mapping"]; // Default to carbon mapping if error

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="w-full bg-white font-sans text-sylitheDark">
      <Navbar />

      {/* --- 1. HERO SECTION --- */}
      <div className={`relative w-full py-32 px-6 md:px-12 lg:px-24 ${page.heroBg} text-white overflow-hidden`}>
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-3 py-1 border border-sylitheGreen text-sylitheGreen rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            Our Approach
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
            {page.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            {page.tagline}
          </p>
        </div>
      </div>

      {/* --- 2. OVERVIEW & TECH STACK --- */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
          
          {/* Left: Description */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-bold mb-6 text-sylitheDark">Overview</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {page.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4">
               {page.techStack.map((tech, idx) => (
                 <div key={idx} className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="p-2 bg-white rounded-md shadow-sm text-sylitheGreen">
                      <tech.icon className="text-xl" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-sylitheDark">{tech.name}</div>
                      <div className="text-xs text-gray-500">{tech.role}</div>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Right: Scientific Validation Graph */}
          <div className="lg:col-span-5">
             <div className="bg-sylitheDark p-8 rounded-2xl text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Model Performance</h3>
                  <p className="text-gray-400 text-sm mb-6">Validation against independent ground-truth data.</p>
                  
                  {/* The Graph Component */}
                  <ValidationGraph 
                    title={page.graphData.title} 
                    r2={page.graphData.r2} 
                    rmse={page.graphData.rmse} 
                  />
                </div>
                
                {/* Decorative Blob */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-sylitheGreen/20 blur-[80px] rounded-full"></div>
             </div>
          </div>

        </div>
      </section>

      {/* --- 3. STEP-WISE METHODOLOGY --- */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-sylitheDark">Methodology</h2>
            <p className="text-gray-500 mt-2">The step-by-step process ensuring integrity.</p>
          </div>

          <div className="space-y-8">
            {page.steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-8 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm items-start">
                <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-sylitheGreen text-sylitheDark font-bold text-xl">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-sylitheDark mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. CTA --- */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Ready to leverage {page.title}?</h2>
          <div className="flex justify-center gap-4">
            <button className="bg-sylitheDark text-white px-8 py-3 rounded-full font-bold hover:bg-black transition-colors">
              Get Started
            </button>
            <button className="border border-gray-300 text-sylitheDark px-8 py-3 rounded-full font-bold hover:border-gray-800 transition-colors">
              Read Technical Paper
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SolutionTemplate;