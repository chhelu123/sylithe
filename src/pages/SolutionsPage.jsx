import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { HiOutlineArrowRight, HiCheck, HiServer, HiGlobeAlt, HiChartBar, HiShieldCheck } from "react-icons/hi";
import { TbSatellite, TbTrees, TbAugmentedReality } from "react-icons/tb";

// --- CONTENT DATABASE (Extracted from Pachama PDF) ---
const approaches = {
  "carbon-mapping": {
    title: "Carbon Mapping",
    subtitle: "High-resolution biomass estimation using multi-sensor satellite fusion.",
    heroImage: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2500&auto=format&fit=crop",
    overview: "We replace manual, error-prone plot inventories with reproducible, algorithmic calculations. By fusing optical, radar, and lidar data, we create a contiguous 3D view of forest carbon stocks.",
    steps: [
      {
        title: "1. Multi-Sensor Data Ingestion",
        desc: "We ingest a massive stream of geospatial data, including GEDI (Spaceborne Lidar), Sentinel-2 (Optical), and ALOS-2 (Radar/SAR) to capture forest structure despite cloud cover.",
        icon: HiServer
      },
      {
        title: "2. Machine Learning Calibration",
        desc: "Our deep learning models are trained on millions of hectares of airborne lidar and field plot data to translate satellite signals into precise canopy height measurements.",
        icon: TbSatellite
      },
      {
        title: "3. Biomass Conversion",
        desc: "We apply region-specific allometric equations to convert canopy height (CHM) into Above Ground Biomass (AGB) and carbon stock estimates with pixel-level uncertainty.",
        icon: TbTrees
      },
      {
        title: "4. Continuous Monitoring",
        desc: "Unlike static reports, our maps are updated dynamically, allowing for the detection of degradation and growth at a quarterly cadence.",
        icon: HiChartBar
      }
    ]
  },
  "dynamic-baselines": {
    title: "Dynamic Baselines",
    subtitle: "Algorithmic counterfactuals that predict what would have happened without the project.",
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2500&auto=format&fit=crop",
    overview: "Static baselines often overcredit projects. We use Dynamic Control Area Baselines (DCAB) to algorithmically match project areas with 'twin' control areas that share identical characteristics.",
    steps: [
      {
        title: "1. Candidate Pool Selection",
        desc: "We scan the entire ecoregion and political jurisdiction to identify millions of potential control pixels that are not part of the carbon project.",
        icon: HiGlobeAlt
      },
      {
        title: "2. Covariate Matching",
        desc: "Our algorithm matches pixels based on key drivers of deforestation: distance to roads, slope, elevation, initial forest cover, and proximity to recent forest loss.",
        icon: HiChartBar
      },
      {
        title: "3. Synthetic Control Construction",
        desc: "We aggregate these matched pixels to create a 'Synthetic Control' that mirrors the project area's historical deforestation trends with >95% accuracy.",
        icon: TbAugmentedReality
      },
      {
        title: "4. Real-Time Comparison",
        desc: "We continuously compare the project's actual forest cover against this synthetic baseline. Credits are only issued for the *difference* in outcome.",
        icon: HiShieldCheck
      }
    ]
  },
  "leakage-monitoring": {
    title: "Leakage Monitoring",
    subtitle: "System-wide boundary monitoring to ensure net climate impact.",
    heroImage: "https://images.unsplash.com/photo-1569163139500-66446e2926ca?q=80&w=2500&auto=format&fit=crop",
    overview: "Protecting one forest shouldn't mean cutting down another. Our leakage monitoring system tracks activity across the entire jurisdiction to detect displaced emissions.",
    steps: [
      {
        title: "1. Jurisdictional Observation",
        desc: "We don't just look at the project boundary. We monitor forest cover changes across the entire surrounding region (leakage belt) and jurisdiction.",
        icon: HiGlobeAlt
      },
      {
        title: "2. Displacement Detection",
        desc: "If deforestation rates in the surrounding area spike above the baseline relative to the project start date, we flag this as potential activity shifting leakage.",
        icon: HiChartBar
      },
      {
        title: "3. Deduction Calculation",
        desc: "Using the equation `Net Credit = Project Benefit - Leakage`, we automatically deduct any detected displaced emissions from the total issuance.",
        icon: TbMathFunction
      },
      {
        title: "4. Market Harmonization",
        desc: "We cross-reference data with jurisdictional registries to prevent double-counting and ensure alignment with national inventories (Nestings).",
        icon: HiShieldCheck
      }
    ]
  },
  "transparent-reporting": {
    title: "Transparent Reporting",
    subtitle: "Moving from static PDFs to interactive, audit-ready digital visualizations.",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2500&auto=format&fit=crop",
    overview: "Trust requires transparency. We provide buyers, auditors, and regulators with direct, queryable access to the raw data and calculations behind every carbon credit.",
    steps: [
      {
        title: "1. Digital Digitization",
        desc: "We ingest all project design documents (PDDs) and digitize analog maps into queryable geospatial files (GeoJSON/Shapefiles).",
        icon: HiServer
      },
      {
        title: "2. Interactive Dashboards",
        desc: "Stakeholders can explore the project via our Digital MRV portal, toggling layers for biomass, deforestation, and baseline comparisons over time.",
        icon: TbAugmentedReality
      },
      {
        title: "3. Granular Audit Trails",
        desc: "Every issued credit is cryptographically linked to specific pixels and timeframes, allowing for a 'click-to-verify' audit process.",
        icon: HiShieldCheck
      },
      {
        title: "4. Third-Party Validation",
        desc: "We provide open APIs for independent rating agencies and validation bodies (VVBs) to run their own models against our data.",
        icon: HiCheck
      }
    ]
  }
};

const SolutionsPage = () => {
  const { id } = useParams();
  
  // Fallback if ID doesn't exist
  const data = approaches[id] || { 
    title: "Solution Not Found", 
    subtitle: "Please select a valid approach from the menu.", 
    heroImage: "", 
    steps: [] 
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="w-full bg-white font-sans text-sylitheDark">
      <Navbar />

      {/* --- 1. HERO SECTION (Immersive) --- */}
      <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img src={data.heroImage} alt={data.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-sylitheDark/60 mix-blend-multiply"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <span className="text-sylitheGreen font-bold tracking-widest uppercase text-sm mb-4 block">Our Approach</span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            {data.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed">
            {data.subtitle}
          </p>
        </div>
      </div>

      {/* --- 2. OVERVIEW & MAPPING VISUALIZATION --- */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Context */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-sylitheDark">The Science of {data.title}</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {data.overview}
            </p>
            <div className="flex gap-4">
              <button className="bg-sylitheDark text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-black transition-all">
                Read the methodology <HiOutlineArrowRight />
              </button>
            </div>
          </div>

          {/* Right: Map/Data Visualization Placeholder */}
          <div className="relative h-[400px] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 group">
            {/* Fake Map Interface */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
               <div className="bg-white/10 backdrop-blur-md text-xs text-white px-3 py-1 rounded-full border border-white/20">Satellite: Sentinel-2</div>
               <div className="bg-white/10 backdrop-blur-md text-xs text-sylitheGreen px-3 py-1 rounded-full border border-sylitheGreen/30">Live Data</div>
            </div>
            
            {/* Animated Grid Background to simulate scanning */}
            <div className="absolute inset-0 bg-[url('https://grain-s3.s3.amazonaws.com/grain-s3/grid.png')] opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-sylitheDark via-transparent to-transparent"></div>
            
            {/* Center Graphic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
               <div className="w-20 h-20 bg-sylitheGreen/20 rounded-full flex items-center justify-center animate-pulse mb-4 mx-auto">
                 <TbSatellite className="text-4xl text-sylitheGreen" />
               </div>
               <p className="text-gray-400 text-sm font-mono tracking-widest">ANALYZING {data.title.toUpperCase()}</p>
            </div>
          </div>

        </div>
      </section>

      {/* --- 3. STEP-WISE DETAILS (Zig-Zag Layout) --- */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-sylitheDark">How It Works</h2>
            <p className="text-gray-500 mt-2">A rigorous, step-by-step process to ensure integrity.</p>
          </div>

          <div className="space-y-12">
            {data.steps && data.steps.map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start hover:shadow-md transition-shadow">
                
                {/* Step Icon/Number */}
                <div className="shrink-0">
                  <div className="w-16 h-16 bg-sylitheGreen/10 rounded-xl flex items-center justify-center text-sylitheDark text-2xl">
                    {step.icon ? <step.icon /> : <HiCheck />}
                  </div>
                </div>

                {/* Step Content */}
                <div>
                  <h3 className="text-xl font-bold text-sylitheDark mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- 4. CTA FOOTER --- */}
      <section className="py-24 bg-sylitheDark text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Ready to see {data.title} in action?</h2>
          <p className="text-gray-400 mb-10">
            Join leading organizations using Sylithe's science-backed platform to measure and reduce their climate impact.
          </p>
          <div className="flex justify-center gap-6">
            <button className="bg-sylitheGreen text-sylitheDark px-8 py-4 rounded-full font-bold hover:bg-[#92d02e] transition-colors">
              Book a demo
            </button>
            <button className="border border-gray-600 text-white px-8 py-4 rounded-full font-bold hover:border-white transition-colors">
              Contact sales
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SolutionsPage;