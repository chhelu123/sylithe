import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

// --- 1. IMPORT YOUR PNG LOGO HERE ---
// Make sure your file is named 'sylithe-logo.png' and is in the 'src/assets' folder
import sylitheLogo from '../assets/treee13.png';

// Icons for the menu items
import { RiMapPin2Line, RiBarChartGroupedLine, RiGlobalLine, RiFileList3Line } from "react-icons/ri";
import { TbTrees, TbSatellite, TbMathFunction, TbBrandCarbon } from "react-icons/tb";

const Navbar = () => {
  const [hoveredNav, setHoveredNav] = useState(null);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    // Hide if scrolling down and we aren't at the absolute top
    if (latest > previous && latest > 50) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

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
    <div className="w-[900px] bg-[#F1F1F1] rounded-2xl shadow-xl border border-gray-200 overflow-hidden grid grid-cols-5">
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
        <Link to="/insights/carbon-accounting" className="block bg-[#F1F1F1] rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group/card text-left">
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

  // --- SOLUTIONS DROP DOWN CONTENT ---
  const solutionsDropdownContent = (
    <div className="w-[380px] bg-[#F1F1F1] rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col p-6 text-left">
      <h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-widest mb-4 border-b border-gray-100 pb-3">Our Methodology</h4>
      <div className="space-y-5">
        <Link to="/methodology/lulc" className="block group cursor-pointer group-hover:bg-transparent">
          <h5 className="font-bold text-[#0F172A] group-hover:text-sylitheGreen transition-colors mb-1">LULC Classification</h5>
          <p className="text-sm text-gray-500 leading-snug">Land Use & Land Cover suitability and analysis.</p>
        </Link>
        <Link to="/methodology/chm" className="block group cursor-pointer group-hover:bg-transparent">
          <h5 className="font-bold text-[#0F172A] group-hover:text-sylitheGreen transition-colors mb-1">CHM Model</h5>
          <p className="text-sm text-gray-500 leading-snug">Canopy Height Model using comprehensive Lidar data.</p>
        </Link>
        <Link to="/methodology/dcab" className="block group cursor-pointer group-hover:bg-transparent">
          <h5 className="font-bold text-[#0F172A] group-hover:text-sylitheGreen transition-colors mb-1">DCAB Model</h5>
          <p className="text-sm text-gray-500 leading-snug">Dynamic Control Area Baseline for accurate reporting.</p>
        </Link>
        <Link to="/methodology/agb" className="block group cursor-pointer group-hover:bg-transparent">
          <h5 className="font-bold text-[#0F172A] group-hover:text-sylitheGreen transition-colors mb-1">AGB Calculation</h5>
          <p className="text-sm text-gray-500 leading-snug">Above Ground Biomass conversion equations and verified stock.</p>
        </Link>
      </div>

      {/* Bottom Action Bar */}
      <div className="-mx-6 -mb-6 mt-6 bg-gray-50 border-t border-gray-100 p-4 px-6 flex items-center text-sm font-bold text-sylitheGreen">
        <Link to="/contact" className="hover:underline">Contact us</Link>
      </div>
    </div>
  );


  // --- Main Nav Item Logic ---
  const NavItem = ({ title, id, hasDropdown, children, to }) => {
    const isHovered = hoveredNav === id;

    // The clickable core of the item
    const NavContent = () => (
      <div className={`cursor-pointer flex items-center gap-1 font-medium transition-colors px-4 py-3
          ${isHovered ? 'text-[#0F172A]' : 'text-gray-600'}`}>
        {title}
        {hasDropdown && (
          <IoIosArrowDown className={`text-sm transition-transform duration-300 ${isHovered ? '-rotate-180 text-[#0F172A]' : 'text-gray-400'}`} />
        )}
      </div>
    );

    return (
      <div
        className="relative h-full flex items-center"
        onMouseEnter={() => setHoveredNav(id)}
        onMouseLeave={() => setHoveredNav(null)}
      >
        {to ? (
          <Link to={to} className="h-full flex items-center">
            <NavContent />
          </Link>
        ) : (
          <NavContent />
        )}
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
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="w-full h-20 px-6 md:px-12 lg:px-24 flex items-center justify-between bg-[#F1F1F1]/95 backdrop-blur-md fixed top-0 z-50 border-b border-gray-100"
    >

      {/* --- LOGO SECTION --- */}
      <Link to="/" className="flex-shrink-0 cursor-pointer flex items-center gap-3 group">
        <img
          src={sylitheLogo}
          alt="Sylithe Logo"
          className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        />

        <span className="text-[28px] font-[Telegraf_Bold,var(--font-sans)] font-black text-[#08292F] mt-1 tracking-wide">
          Sylithe
        </span>
      </Link>

      <div className="hidden lg:flex items-center relative h-full">
        <NavItem title="Home" id="home" hasDropdown={false} to="/" />
        <NavItem title="Solutions" id="solutions" hasDropdown={true}>
          {solutionsDropdownContent}
        </NavItem>
        <NavItem title="About Us" id="about" hasDropdown={false} to="/about" />
        <NavItem title="Platform" id="platform" hasDropdown={false} to="/platform" />
      </div>

      <div className="flex items-center gap-6 font-medium flex-shrink-0">
        {/* UPDATED: Link to Login Page */}
        <Link to="/login">
          <button className="hidden md:block text-gray-700 hover:text-black transition-colors">Login</button>
        </Link>

        {/* UPDATED: Link to Signup Page */}
        <Link to="/signup">
          <button className="bg-[#08292f] text-white px-6 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#062125] transition-all shadow-sm hover:shadow-md active:scale-95 font-bold">
            Get started<HiOutlineArrowRight className="text-lg" />
          </button>
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;