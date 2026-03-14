import React, { useState } from 'react';
import { HiArrowRight, HiChevronDown } from "react-icons/hi";
import {
  TbBuilding, TbCoin, TbPlant2, TbBuildingBank,
  TbChartBar, TbShieldCheck, TbFileReport, TbCloudStorm,
  TbTruckDelivery, TbMap2, TbSearch, TbChartPie,
  TbBriefcase, TbSatellite, TbCertificate, TbDeviceAnalytics,
  TbTrees, TbLeaf, TbAtom, TbAlertTriangle,
  TbWorld
} from "react-icons/tb";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const cdStyle = {
  color: '#08292F',
  headingFont: '"Inter", "Helvetica Neue", Arial, sans-serif',
  bodyFont: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  accentColor: '#16a34a',
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

// --- Solution Card with expand/collapse ---
const SolutionCard = ({ icon: Icon, title, description, features, outputs }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={itemFade}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-8 flex items-start gap-5"
      >
        <div className="p-3 bg-[#f0fdf4] rounded-xl shrink-0">
          <Icon className="text-2xl text-[#16a34a]" />
        </div>
        <div className="flex-1 min-w-0">
          <h4
            className="text-xl font-bold mb-2"
            style={{ color: cdStyle.color, fontFamily: cdStyle.headingFont }}
          >
            {title}
          </h4>
          <p className="text-gray-500 text-[15px] leading-relaxed" style={{ fontFamily: cdStyle.bodyFont }}>
            {description}
          </p>
        </div>
        <HiChevronDown className={`text-xl text-gray-400 shrink-0 mt-1 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 pt-0 grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Features</p>
                <ul className="space-y-2">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-[14px] text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mt-[7px] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Outputs</p>
                <ul className="space-y-2">
                  {outputs.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-[14px] text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#08292F] mt-[7px] shrink-0" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Stakeholder Section ---
const StakeholderSection = ({ id, icon: Icon, label, title, subtitle, problems, solutions, dark = false }) => {
  const bg = dark ? 'bg-[#08292F]' : 'bg-[#F1F1F1]';
  const textColor = dark ? 'text-white' : 'text-[#08292F]';
  const subtextColor = dark ? 'text-gray-300' : 'text-gray-500';
  const pillBg = dark ? 'bg-white/10' : 'bg-[#f0fdf4]';
  const pillText = dark ? 'text-[#a4fca1]' : 'text-[#16a34a]';
  const problemBg = dark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200';
  const problemText = dark ? 'text-gray-300' : 'text-gray-600';

  return (
    <section id={id} className={`py-24 px-6 md:px-12 lg:px-24 ${bg}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${pillBg} mb-6`}>
            <Icon className={`text-lg ${pillText}`} />
            <span className={`text-xs font-bold uppercase tracking-widest ${pillText}`}>{label}</span>
          </div>
          <h2
            className={`text-4xl md:text-5xl font-bold ${textColor} leading-tight mb-4`}
            style={{ fontFamily: cdStyle.headingFont, letterSpacing: '-0.02em' }}
          >
            {title}
          </h2>
          <p className={`text-lg ${subtextColor} max-w-2xl leading-relaxed`} style={{ fontFamily: cdStyle.bodyFont }}>
            {subtitle}
          </p>
        </motion.div>

        {/* Problems */}
        <motion.div
          className="mb-16"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        >
          <p className={`text-[11px] font-bold uppercase tracking-widest mb-4 ${subtextColor}`}>Key Challenges</p>
          <div className="flex flex-wrap gap-3">
            {problems.map((p, i) => (
              <span key={i} className={`px-4 py-2 rounded-full border text-[13px] font-medium ${problemBg} ${problemText}`}>
                {p}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        >
          {solutions.map((s, i) => (
            <SolutionCard key={i} {...s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// --- Stakeholder quick-nav pill ---
const stakeholders = [
  { id: 'corporates', label: 'Corporates', icon: TbBuilding },
  { id: 'buyers', label: 'Buyers & Investors', icon: TbCoin },
  { id: 'developers', label: 'Project Developers', icon: TbPlant2 },
  { id: 'governments', label: 'Governments', icon: TbBuildingBank },
];

const WhatWeOffer = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full bg-[#F1F1F1] pt-20 overflow-hidden" style={{ fontFamily: cdStyle.bodyFont, color: cdStyle.color }}>

      {/* ===== HERO ===== */}
      <section className="pt-16 pb-24 px-6 md:px-12 lg:px-24 bg-[#F1F1F1] border-b border-gray-200">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}>
            <span className="text-[#16a34a] font-bold tracking-widest uppercase text-xs mb-6 block">
              Platform Offerings
            </span>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-8"
              style={{ fontFamily: cdStyle.headingFont, color: cdStyle.color, letterSpacing: '-0.02em' }}
            >
              Climate intelligence for{' '}
              <span className="text-[#16a34a]">every</span> stakeholder.
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-[520px] mb-10" style={{ fontFamily: cdStyle.bodyFont }}>
              Sylithe combines satellite data, AI models, and geospatial analytics to measure environmental impact, verify carbon projects, and deliver climate risk intelligence — tailored to your role.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="px-8 py-4 rounded-full font-bold text-lg text-white transition-all shadow-lg active:scale-95 flex items-center gap-2 hover:bg-[#08292f]"
                style={{ backgroundColor: '#062125' }}
              >
                Request a demo <HiArrowRight />
              </button>
              <button
                onClick={() => scrollTo('corporates')}
                className="px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-gray-100"
                style={{ color: cdStyle.color }}
              >
                Explore offerings
              </button>
            </div>
          </motion.div>

          {/* Right — Stakeholder cards */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            {stakeholders.map((s) => (
              <motion.button
                key={s.id}
                variants={itemFade}
                onClick={() => scrollTo(s.id)}
                className="group bg-white p-6 rounded-2xl border border-gray-200 text-left hover:shadow-xl hover:border-[#16a34a]/30 transition-all duration-300"
              >
                <div className="p-3 bg-[#f0fdf4] rounded-xl w-fit mb-4 group-hover:bg-[#16a34a]/20 transition-colors">
                  <s.icon className="text-2xl text-[#16a34a]" />
                </div>
                <h3 className="font-bold text-[#08292F] text-lg mb-1">{s.label}</h3>
                <div className="flex items-center gap-1 text-[#16a34a] text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <HiArrowRight />
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== STICKY NAV ===== */}
      <div className="sticky top-20 z-40 bg-[#F1F1F1]/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex gap-2 py-3 overflow-x-auto scrollbar-hide">
          {stakeholders.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-[13px] font-bold text-gray-600 hover:bg-[#08292F] hover:text-white hover:border-[#08292F] transition-all whitespace-nowrap shrink-0"
            >
              <s.icon className="text-base" />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* ===== 1. CORPORATES ===== */}
      <StakeholderSection
        id="corporates"
        icon={TbBuilding}
        label="For Corporates"
        title="Measure, manage, and reduce your environmental impact."
        subtitle="Comply with ESG regulations, verify carbon offsets, assess climate risks, and monitor supply chains — all from one platform."
        problems={[
          'Scope 1, 2, 3 emission measurement',
          'Unreliable carbon offset verification',
          'Manual ESG reporting',
          'Climate risk to supply chains',
          'Increasing regulatory pressure'
        ]}
        solutions={[
          {
            icon: TbChartBar,
            title: 'Carbon Footprint Dashboard',
            description: 'Measure total corporate emissions across all scopes with real-time visualization and reduction planning.',
            features: ['Scope 1, 2, 3 emission calculation', 'Carbon footprint visualization', 'Emission trend tracking', 'Reduction planning tools'],
            outputs: ['Corporate carbon footprint reports', 'Net-zero progress tracking']
          },
          {
            icon: TbShieldCheck,
            title: 'Carbon Offset Verification',
            description: 'Verify carbon credits before purchasing using satellite-based project monitoring and biomass analysis.',
            features: ['Satellite-based project verification', 'Forest health monitoring', 'Deforestation detection', 'Carbon stock analysis'],
            outputs: ['Verified carbon credit validation reports', 'Risk analysis for offset projects']
          },
          {
            icon: TbFileReport,
            title: 'ESG Reporting Automation',
            description: 'Automatically generate investor-ready ESG and sustainability reports with integrated compliance tracking.',
            features: ['ESG metrics dashboard', 'Compliance reports for regulators', 'Sustainability KPI tracking', 'Automated data integration'],
            outputs: ['Investor-ready ESG reports', 'Sustainability disclosures']
          },
          {
            icon: TbCloudStorm,
            title: 'Climate Risk Intelligence',
            description: 'Assess flood, heat, drought, and wildfire risks to business operations and infrastructure.',
            features: ['Flood risk analysis', 'Heat risk mapping', 'Drought monitoring', 'Wildfire risk predictions'],
            outputs: ['Risk reports for infrastructure', 'Climate risk maps']
          },
          {
            icon: TbTruckDelivery,
            title: 'Supply Chain Environmental Monitoring',
            description: 'Track environmental impact and deforestation alerts across your entire supply chain.',
            features: ['Supplier land-use monitoring', 'Deforestation alerts', 'Environmental compliance tracking'],
            outputs: ['Sustainable supply chain reports']
          }
        ]}
      />

      {/* ===== 2. BUYERS & INVESTORS ===== */}
      <StakeholderSection
        id="buyers"
        icon={TbCoin}
        label="For Buyers & Investors"
        title="Identify high-quality projects. Avoid fraudulent credits."
        subtitle="Discover verified carbon projects, independently validate credits, evaluate investment risks, and manage your carbon portfolio."
        dark
        problems={[
          'Low market transparency',
          'Difficulty verifying project impact',
          'Lack of reliable environmental data',
          'Risk of fake carbon credits'
        ]}
        solutions={[
          {
            icon: TbMap2,
            title: 'Carbon Project Discovery Platform',
            description: 'Discover and explore verified carbon projects worldwide with impact metrics and investment opportunities.',
            features: ['Interactive map of global carbon projects', 'Project impact metrics', 'Carbon credit availability', 'Investment opportunities'],
            outputs: ['Verified project listings']
          },
          {
            icon: TbSearch,
            title: 'Carbon Credit Verification Engine',
            description: 'Independent satellite-based verification of carbon credits with continuous monitoring and impact validation.',
            features: ['Satellite monitoring of project sites', 'Biomass and carbon estimation', 'Land use change detection', 'Continuous monitoring'],
            outputs: ['Carbon credit verification score', 'Impact validation reports']
          },
          {
            icon: TbAlertTriangle,
            title: 'Investment Risk Analysis',
            description: 'Evaluate environmental integrity, project longevity, and fraud risk before committing capital.',
            features: ['Environmental integrity score', 'Project longevity analysis', 'Fraud detection algorithms'],
            outputs: ['Investment risk reports']
          },
          {
            icon: TbChartPie,
            title: 'Carbon Portfolio Management',
            description: 'Track carbon credit investments, offset impact, and credit retirement in a unified portfolio dashboard.',
            features: ['Portfolio dashboard', 'Carbon offset impact tracking', 'Credit retirement monitoring'],
            outputs: ['Portfolio analytics reports']
          }
        ]}
      />

      {/* ===== 3. PROJECT DEVELOPERS ===== */}
      <StakeholderSection
        id="developers"
        icon={TbPlant2}
        label="For Project Developers"
        title="Create, monitor, and verify carbon projects."
        subtitle="From reforestation to blue carbon — plan projects, run continuous MRV, and accelerate credit issuance with satellite intelligence."
        problems={[
          'Expensive carbon verification',
          'Manual MRV processes',
          'Slow credit certification',
          'Lack of monitoring tools'
        ]}
        solutions={[
          {
            icon: TbBriefcase,
            title: 'Project Development Tools',
            description: 'Assess land suitability, estimate carbon potential, and model environmental impact before breaking ground.',
            features: ['Land suitability analysis', 'Carbon potential estimation', 'Environmental impact modeling'],
            outputs: ['Project feasibility reports']
          },
          {
            icon: TbSatellite,
            title: 'Continuous MRV',
            description: 'Monitor project performance continuously with satellite-based forest growth tracking and biomass estimation.',
            features: ['Satellite monitoring', 'Forest growth tracking', 'Biomass estimation', 'Land use monitoring'],
            outputs: ['Continuous MRV reports']
          },
          {
            icon: TbCertificate,
            title: 'Carbon Credit Issuance Support',
            description: 'Automate carbon stock calculations and compliance reporting to accelerate credit certification.',
            features: ['Carbon stock calculations', 'Compliance with carbon standards', 'Automated reporting'],
            outputs: ['Carbon credit documentation']
          },
          {
            icon: TbDeviceAnalytics,
            title: 'Project Monitoring Dashboard',
            description: 'Real-time satellite imagery updates, environmental change detection, and degradation alerts.',
            features: ['Satellite imagery updates', 'Environmental change detection', 'Alerts for deforestation or degradation'],
            outputs: ['Project monitoring analytics']
          }
        ]}
      />

      {/* ===== 4. GOVERNMENTS ===== */}
      <StakeholderSection
        id="governments"
        icon={TbBuildingBank}
        label="For Governments"
        title="Monitor ecosystems. Enforce policy. Meet climate commitments."
        subtitle="National-scale land use monitoring, forest health tracking, carbon accounting, compliance enforcement, and climate policy decision support."
        dark
        problems={[
          'Difficulty monitoring forests at scale',
          'Lack of real-time environmental data',
          'Inefficient climate policy enforcement',
          'Limited transparency in carbon projects'
        ]}
        solutions={[
          {
            icon: TbWorld,
            title: 'National Land Use Monitoring',
            description: 'Track LULC changes, deforestation, urban expansion, and agricultural land across the entire country.',
            features: ['LULC classification', 'Deforestation detection', 'Urban expansion monitoring', 'Agricultural land tracking'],
            outputs: ['National land use reports']
          },
          {
            icon: TbTrees,
            title: 'Forest & Biodiversity Monitoring',
            description: 'Track forest cover, biodiversity indicators, and habitat change detection at ecosystem scale.',
            features: ['Forest cover monitoring', 'Biodiversity indicators', 'Habitat change detection'],
            outputs: ['Forest health reports']
          },
          {
            icon: TbLeaf,
            title: 'Carbon Accounting Infrastructure',
            description: 'Track national carbon emissions and sinks with satellite-derived carbon stock estimation.',
            features: ['Carbon stock estimation', 'Emission tracking', 'Climate mitigation analysis'],
            outputs: ['National carbon inventory']
          },
          {
            icon: TbAlertTriangle,
            title: 'Environmental Compliance Monitoring',
            description: 'Detect illegal deforestation, unauthorized mining, and protected area violations in real time.',
            features: ['Illegal deforestation detection', 'Mining activity monitoring', 'Protected area surveillance'],
            outputs: ['Enforcement alerts']
          },
          {
            icon: TbAtom,
            title: 'Climate Policy Decision Support',
            description: 'Scenario modeling, environmental impact forecasts, and policy simulation tools for informed decision-making.',
            features: ['Climate scenario modeling', 'Environmental impact forecasts', 'Policy simulation tools'],
            outputs: ['Policy decision dashboards']
          }
        ]}
      />

      {/* ===== CORE CAPABILITIES ===== */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#F1F1F1] border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          >
            <span className="text-[#16a34a] font-bold tracking-widest uppercase text-xs mb-4 block">Platform Infrastructure</span>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: cdStyle.headingFont, color: cdStyle.color, letterSpacing: '-0.02em' }}
            >
              Built on satellite data + AI climate models.
            </h2>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            {[
              { icon: TbSatellite, title: 'Satellite Image Processing', desc: 'Multi-source ingestion of optical, SAR, and LiDAR data streams.' },
              { icon: TbTrees, title: 'Biomass & Carbon Modeling', desc: 'LiDAR-calibrated canopy height and above-ground biomass estimation.' },
              { icon: TbWorld, title: 'LULC Classification', desc: 'Time-series land use and land cover analysis at 10m resolution.' },
              { icon: TbCloudStorm, title: 'Climate Risk Analytics', desc: 'Flood, drought, heat, and wildfire risk assessment and forecasting.' },
            ].map((cap, i) => (
              <motion.div
                key={i}
                variants={itemFade}
                className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-3 bg-[#f0fdf4] rounded-xl w-fit mb-5">
                  <cap.icon className="text-2xl text-[#16a34a]" />
                </div>
                <h3 className="text-lg font-bold text-[#08292F] mb-2" style={{ fontFamily: cdStyle.headingFont }}>{cap.title}</h3>
                <p className="text-gray-500 text-[14px] leading-relaxed" style={{ fontFamily: cdStyle.bodyFont }}>{cap.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#08292F] text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-full border border-[#16a34a]/20 rounded-[100%] scale-[1.5] bg-[#16a34a]/5 pointer-events-none blur-3xl" />
        <motion.div
          className="max-w-3xl mx-auto relative z-10"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8" style={{ fontFamily: cdStyle.headingFont, letterSpacing: '-0.02em' }}>
            Ready to build with<br /><span className="text-[#16a34a]">Sylithe?</span>
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto" style={{ fontFamily: cdStyle.bodyFont }}>
            Whether you're a corporate, investor, developer, or government — Sylithe delivers the climate intelligence you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#16a34a] text-white px-10 py-4 rounded-full font-bold text-base hover:bg-white hover:text-[#08292F] transition-all shadow-xl active:scale-95">
              Schedule Demo
            </button>
            <button className="bg-transparent border border-white/20 text-white px-10 py-4 rounded-full font-bold text-base hover:bg-white/10 transition-all active:scale-95">
              Contact Us
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default WhatWeOffer;
