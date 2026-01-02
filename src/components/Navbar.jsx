import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- 1. IMPORT YOUR PNG LOGO HERE ---
// Make sure your file is named 'sylithe-logo.png' and is in the 'src/assets' folder
import sylitheLogo from '../assets/tree13.png'; 

// Icons for the menu items
import { RiMapPin2Line, RiBarChartGroupedLine, RiGlobalLine, RiFileList3Line } from "react-icons/ri"; 
import { TbTrees, TbSatellite, TbMathFunction, TbBrandCarbon } from "react-icons/tb"; 

const Navbar = () => {
  const [hoveredNav, setHoveredNav] = useState(null);

  // --- Reusable Dropdown Link Item ---
  const DropdownLinkItem = ({ title, description, to, icon: Icon }) => {
    const content = (
      <div className="flex gap-4 items-start">
        {Icon && (
          <div className="mt-1 p-2 bg-sylitheGreen/10 rounded-lg text-sylitheDark shrink-0">
             <Icon className="text-xl" />
          </div>
        )}
        <div>
          <h3 className="font-bold text-[#0F172A] group-hover/item:text-sylitheGreen transition-colors text-base">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed text-left">
            {description}
          </p>
        </div>
      </div>
    );

    const classes = "block group/item p-3 -mx-3 rounded-xl hover:bg-gray-50 transition-colors text-left";

    if (to) return <Link to={to} className={classes}>{content}</Link>;
    return <a href="#" className={classes}>{content}</a>;
  };


  // --- PLATFORM MENU CONTENT ---
  const platformDropdownContent = (
    <div className="w-[900px] bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden grid grid-cols-5">
      <div className="col-span-3 p-8 flex flex-col justify-between">
        <div className="space-y-6">
          <DropdownLinkItem 
            title="The Sylithe Platform"
            description="Carbon management software for achievable climate action."
            to="/platform"
          />
          <DropdownLinkItem 
            title="Request a custom demo"
            description="Meet one-on-one with an expert to explore the full Sylithe Platform."
          />
          <DropdownLinkItem 
            title="Take a self-guided tour"
            description="Experience the Platform's Carbon Measurement solution."
          />
        </div>
        <div className="mt-10 pt-6 border-t border-gray-100 flex items-center gap-6 text-sm font-bold text-sylitheGreen">
          <Link to="/contact" className="hover:underline">Contact us</Link>
          <div className="h-4 w-[1px] bg-gray-300"></div>
          <Link to="/purchase" className="hover:underline">Purchase carbon credits</Link>
        </div>
      </div>
      <div className="col-span-2 bg-gray-50 p-8 border-l border-gray-100">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-left">Featured Insight</h4>
        <Link to="/insights/carbon-accounting" className="block bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group/card text-left">
          <div className="h-40 bg-gray-200">
             {/* You can replace this image later */}
             <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000&auto=format&fit=crop" alt="Blog" className="w-full h-full object-cover" />
          </div>
          <div className="p-5">
            <span className="text-xs font-bold text-sylitheGreen uppercase tracking-wider">Carbon Accounting</span>
            <h3 className="font-bold text-[#0F172A] mt-2 leading-tight group-hover/card:text-sylitheGreen transition-colors">
              Carbon footprint data collection: Common challenges
            </h3>
            <div className="flex items-center gap-2 text-sylitheGreen font-bold text-sm mt-4 group/link">
              Read the blog <HiOutlineArrowRight />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );

  // --- SOLUTIONS MENU CONTENT ---
  const solutionsDropdownContent = (
    <div className="w-[850px] bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden grid grid-cols-2">
      <div className="p-8 border-r border-gray-100">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 text-left border-b border-gray-100 pb-2">
          Our Approach
        </h4>
        <div className="space-y-2">
          <DropdownLinkItem title="Carbon Mapping" description="Algorithmic calculation of stocks." to="/solutions/carbon-mapping" icon={RiMapPin2Line} />
          <DropdownLinkItem title="Dynamic Baselines" description="Counterfactual control areas." to="/solutions/dynamic-baselines" icon={RiBarChartGroupedLine} />
          <DropdownLinkItem title="Leakage Monitoring" description="Accounting for displaced emissions." to="/solutions/leakage-monitoring" icon={RiGlobalLine} />
          <DropdownLinkItem title="Transparent Reporting" description="Interactive, audit-ready data." to="/solutions/transparent-reporting" icon={RiFileList3Line} />
        </div>
      </div>
      <div className="p-8 bg-gray-50">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 text-left border-b border-gray-200 pb-2">
          Methodology
        </h4>
        <div className="space-y-4">
          <DropdownLinkItem title="LULC Classification" description="Land Use & Land Cover suitability." to="/methodology/lulc" icon={TbTrees} />
          <DropdownLinkItem title="CHM Model" description="Canopy Height Model using Lidar." to="/methodology/chm" icon={TbSatellite} />
          <DropdownLinkItem title="DCAB Model" description="Dynamic Control Area Baseline." to="/methodology/dcab" icon={TbMathFunction} />
          <DropdownLinkItem title="AGB Calculation" description="Biomass conversion equations." to="/methodology/agb" icon={TbBrandCarbon} />
        </div>
      </div>
    </div>
  );


  // --- Main Nav Item Logic ---
  const NavItem = ({ title, id, hasDropdown, children }) => {
    const isHovered = hoveredNav === id;
    return (
      <div 
        className="relative h-full flex items-center"
        onMouseEnter={() => setHoveredNav(id)}
        onMouseLeave={() => setHoveredNav(null)}
      >
        <div className={`cursor-pointer flex items-center gap-1 font-medium transition-colors px-4 py-3
            ${isHovered ? 'text-[#0F172A]' : 'text-gray-600'}`}>
          {title}
          {hasDropdown && (
            <IoIosArrowDown className={`text-sm transition-transform duration-300 ${isHovered ? '-rotate-180 text-[#0F172A]' : 'text-gray-400'}`} />
          )}
        </div>
        <AnimatePresence>
          {hasDropdown && isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 pt-4 z-50 w-max"
              style={{ left: id === 'solutions' ? '-200px' : '-100px' }} 
            >
               <div className="absolute -top-4 left-0 w-full h-8 bg-transparent"></div>
               {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <nav className="w-full h-20 px-6 md:px-12 lg:px-24 flex items-center justify-between bg-white/95 backdrop-blur-md fixed top-0 z-50 border-b border-gray-100">
        
        {/* --- 2. UPDATED LOGO SECTION --- */}
        <Link to="/" className="flex-shrink-0 cursor-pointer flex items-center gap-3 group">
            {/* The Image Logo */}
            <img 
              src={sylitheLogo} 
              alt="Sylithe Logo" 
              className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
            />
            
            {/* The Text Logo next to it */}
            <span className="text-2xl font-bold text-[#0F172A] tracking-tight">
              Sylithe
            </span>
        </Link>

        <div className="hidden lg:flex items-center relative h-full">
            <NavItem title="Platform" id="platform" hasDropdown={true}>
              {platformDropdownContent}
            </NavItem>
            <NavItem title="Ratings" id="ratings" hasDropdown={false} />
            <NavItem title="Solutions" id="solutions" hasDropdown={true}>
               {solutionsDropdownContent}
            </NavItem>
            <NavItem title="Insights" id="insights" hasDropdown={true}>
                 <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200 text-left">Insights Content Placeholder</div>
            </NavItem>
            <NavItem title="Pricing" id="pricing" hasDropdown={false} />
            <NavItem title="Company" id="company" hasDropdown={true}>
                 <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200 text-left">Company Content Placeholder</div>
            </NavItem>
        </div>

        <div className="flex items-center gap-6 font-medium flex-shrink-0">
            <button className="hidden md:block text-gray-700 hover:text-black transition-colors">Login</button>
            <button className="bg-sylitheGreen text-sylitheDark px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#92d02e] transition-all shadow-sm hover:shadow-md active:scale-95 font-bold">
                Get free access <HiOutlineArrowRight className="text-lg" />
            </button>
        </div>
    </nav>
  );
};

export default Navbar;