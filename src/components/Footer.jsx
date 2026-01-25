import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight } from "react-icons/hi";
// Importing official brand icons
import { FaLinkedinIn, FaYoutube, FaXTwitter } from "react-icons/fa6"; 

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white pt-24 pb-12 px-6 md:px-12 lg:px-24 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
        
        {/* --- COLUMN 1: BRAND & SOCIAL --- */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-6 cursor-pointer">
            <div className="h-8 w-8 rounded-full border-[3px] border-l-[#84cc16] border-t-[#84cc16] border-r-gray-600 border-b-gray-600 rotate-45"></div>
            <span className="text-2xl font-bold tracking-tight text-white">Sylithe</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
            The carbon intelligence platform enabling confident climate action. We combine satellite-native MRV with dynamic baselines to ensure high-integrity carbon credits.
          </p>
          
          {/* Official Social Logos */}
          <div className="flex gap-4">
             <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all cursor-pointer">
                <FaLinkedinIn className="text-lg" />
             </a>
             <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border hover:border-white/20 transition-all cursor-pointer">
                <FaXTwitter className="text-lg" />
             </a>
             <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all cursor-pointer">
                <FaYoutube className="text-lg" />
             </a>
          </div>
        </div>

        {/* --- COLUMN 2: SOLUTIONS (Our Approach) --- */}
        <div>
          <h4 className="font-bold text-white mb-6 tracking-wide">Solutions</h4>
          <ul className="space-y-4 text-gray-400 text-sm font-medium">
            <li>
                <Link to="/solutions/carbon-mapping" className="hover:text-[#84cc16] transition-colors">Carbon Mapping</Link>
            </li>
            <li>
                <Link to="/solutions/dynamic-baselines" className="hover:text-[#84cc16] transition-colors">Dynamic Baselines</Link>
            </li>
            <li>
                <Link to="/solutions/leakage-monitoring" className="hover:text-[#84cc16] transition-colors">Leakage Monitoring</Link>
            </li>
            <li>
                <Link to="/solutions/transparent-reporting" className="hover:text-[#84cc16] transition-colors">Reporting & Audit</Link>
            </li>
          </ul>
        </div>

        {/* --- COLUMN 3: SCIENCE (Methodology) --- */}
        <div>
          <h4 className="font-bold text-white mb-6 tracking-wide">Science</h4>
          <ul className="space-y-4 text-gray-400 text-sm font-medium">
            <li>
                <Link to="/methodology/lulc" className="hover:text-[#84cc16] transition-colors">LULC Classification</Link>
            </li>
            <li>
                <Link to="/methodology/chm" className="hover:text-[#84cc16] transition-colors">Canopy Height Model</Link>
            </li>
            <li>
                <Link to="/methodology/dcab" className="hover:text-[#84cc16] transition-colors">DCAB Algorithms</Link>
            </li>
            <li>
                <Link to="/methodology/agb" className="hover:text-[#84cc16] transition-colors">Biomass (AGB)</Link>
            </li>
          </ul>
        </div>

        {/* --- COLUMN 4: COMPANY & ACTION --- */}
        <div>
          <h4 className="font-bold text-white mb-6 tracking-wide">Company</h4>
          <ul className="space-y-4 text-gray-400 text-sm font-medium mb-8">
            <li><Link to="/platform" className="hover:text-[#84cc16] transition-colors">The Platform</Link></li>
            <li><Link to="/insights/carbon-accounting" className="hover:text-[#84cc16] transition-colors">Blog & Insights</Link></li>
            <li><Link to="/" className="hover:text-[#84cc16] transition-colors">Contact Us</Link></li>
          </ul>
          
          <button className="w-full bg-[#84cc16] text-[#0F172A] px-5 py-3 rounded-full font-bold text-sm hover:bg-white transition-colors flex items-center justify-between group">
              Purchase Credits
              <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* --- BOTTOM BAR --- */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>&copy; 2026 Sylithe Inc. All rights reserved.</p>
        <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;