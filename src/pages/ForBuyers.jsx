import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiCheck, HiShieldCheck, HiChartBar, HiEye, HiLightningBolt } from 'react-icons/hi';

import satelliteImg from '../assets/chm22.png';
import graphImg from '../assets/DCAB30.png';
import dashboardImg from '../assets/dashboard.jpg';
import treeImg from '../assets/tree20.png';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const font = "font-[Telegraf_Bold,var(--font-sans)]";

const ForBuyers = () => (
  <div className="w-full bg-[#F1F1F1] text-[#0F172A] overflow-hidden">

    {/* ===== HERO ===== */}
    <section className="relative min-h-[85vh] flex items-center px-6 md:px-12 lg:px-24 py-32">
      <motion.div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center" initial="hidden" animate="visible" variants={stagger}>
        <div>
          <motion.span variants={fadeUp} className={`text-[#16a34a] ${font} font-bold text-xs uppercase tracking-widest mb-4 block`}>For Buyers & Investors</motion.span>
          <motion.h1 variants={fadeUp} className={`text-4xl md:text-5xl lg:text-6xl ${font} font-bold leading-[1.05] tracking-tight mb-6`}>
            Buy carbon credits with <span className="text-[#16a34a]">confidence</span>
          </motion.h1>
          <motion.p variants={fadeUp} className={`text-lg text-slate-600 ${font} font-normal leading-relaxed max-w-lg mb-8`}>
            Sylithe gives you pre-issuance MRV intelligence — so you can evaluate project quality, performance, and risk before you commit capital.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Link to="/platform" className={`bg-[#08292f] text-white px-8 py-3.5 rounded-full ${font} font-bold text-sm hover:bg-[#062125] transition-all`}>
              Explore platform
            </Link>
            <Link to="/methodology/dcab" className={`rounded-full border-2 border-[#0F172A] px-8 py-3 ${font} font-bold text-sm hover:bg-[#0F172A] hover:text-white transition-all`}>
              View methodology
            </Link>
          </motion.div>
        </div>
        <motion.div variants={fadeUp} className="flex justify-center">
          <img src={satelliteImg} alt="Satellite verification" className="max-h-[480px] object-contain mix-blend-multiply" />
        </motion.div>
      </motion.div>
    </section>

    {/* ===== THE PROBLEM ===== */}
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#08292F] text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-16">
          <motion.span variants={fadeUp} className={`text-[#a4fca1] ${font} font-bold text-xs uppercase tracking-widest mb-3 block`}>The Problem</motion.span>
          <motion.h2 variants={fadeUp} className={`text-3xl md:text-4xl ${font} font-bold leading-tight max-w-3xl`}>
            The carbon market has a trust deficit
          </motion.h2>
        </motion.div>
        <motion.div className="grid md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {[
            { stat: '40%+', label: 'of credits may be over-credited according to recent studies' },
            { stat: '$1.3B', label: 'in carbon credit value at risk from reversal and non-permanence' },
            { stat: '6–18 mo', label: 'typical delay between project activity and third-party verification' },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className={`text-4xl ${font} font-bold text-[#A3E635] mb-3`}>{item.stat}</p>
              <p className={`text-slate-300 ${font} font-medium text-sm leading-relaxed`}>{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ===== WHAT YOU GET ===== */}
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#E8E8E8]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-16">
          <motion.span variants={fadeUp} className={`text-[#16a34a] ${font} font-bold text-xs uppercase tracking-widest mb-3 block`}>What You Get</motion.span>
          <motion.h2 variants={fadeUp} className={`text-3xl md:text-4xl ${font} font-bold leading-tight max-w-3xl`}>
            Everything you need to evaluate carbon credits
          </motion.h2>
        </motion.div>
        <motion.div className="grid md:grid-cols-2 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {[
            { icon: <HiShieldCheck className="text-2xl" />, title: 'Pre-issuance verification', desc: 'Evaluate project integrity before credits are issued. Our models detect over-crediting, baseline inflation, and additionality gaps using satellite-derived biomass data.' },
            { icon: <HiChartBar className="text-2xl" />, title: 'Risk scoring & analytics', desc: 'Every project gets a multi-dimensional risk score covering permanence, leakage, baseline deviation, and land-use change — updated continuously.' },
            { icon: <HiEye className="text-2xl" />, title: 'Continuous monitoring', desc: 'No more static PDDs. Track canopy height, biomass change, and LULC shifts in near real-time across your entire portfolio.' },
            { icon: <HiLightningBolt className="text-2xl" />, title: 'Dynamic baselines (DCAB)', desc: 'Our counterfactual baseline model compares project areas against matched control sites — so you see real additionality, not assumptions.' },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="w-12 h-12 rounded-xl bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center mb-5">{item.icon}</div>
              <h3 className={`text-xl ${font} font-bold mb-3`}>{item.title}</h3>
              <p className={`text-slate-600 ${font} font-medium text-sm leading-relaxed`}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ===== HOW IT WORKS ===== */}
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#F1F1F1]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-16 text-center">
          <motion.span variants={fadeUp} className={`text-[#16a34a] ${font} font-bold text-xs uppercase tracking-widest mb-3 block`}>How It Works</motion.span>
          <motion.h2 variants={fadeUp} className={`text-3xl md:text-4xl ${font} font-bold leading-tight max-w-2xl mx-auto`}>
            From project discovery to confident purchase
          </motion.h2>
        </motion.div>
        <motion.div className="grid md:grid-cols-4 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {[
            { step: '01', title: 'Upload or select project', desc: 'Import a KML boundary or browse indexed REDD+ projects across India.' },
            { step: '02', title: 'Automated MRV analysis', desc: 'Sylithe runs CHM, LULC, AGB, and DCAB models on the project area.' },
            { step: '03', title: 'Review risk report', desc: 'Get a comprehensive risk score with permanence, leakage, and baseline metrics.' },
            { step: '04', title: 'Make informed decisions', desc: 'Buy credits backed by satellite evidence — not just paper documentation.' },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="relative">
              <span className={`text-6xl ${font} font-bold text-[#16a34a]/15 absolute -top-4 -left-2`}>{item.step}</span>
              <div className="pt-12">
                <h3 className={`text-lg ${font} font-bold mb-2`}>{item.title}</h3>
                <p className={`text-slate-600 ${font} font-medium text-sm leading-relaxed`}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ===== BEFORE vs AFTER ===== */}
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#E8E8E8]">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-16 text-center">
          <motion.h2 variants={fadeUp} className={`text-3xl md:text-4xl ${font} font-bold leading-tight`}>
            Before vs. after Sylithe
          </motion.h2>
        </motion.div>
        <motion.div className="grid md:grid-cols-2 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="bg-white/60 rounded-2xl p-8 border border-gray-200">
            <h3 className={`text-lg ${font} font-bold text-red-600 mb-6`}>Without Sylithe</h3>
            {['Rely on static PDDs and self-reported data', 'No visibility into baseline assumptions', '6–18 month verification lag', 'Reversal risk discovered after purchase', 'Manual due diligence across fragmented sources'].map((t, i) => (
              <p key={i} className={`flex items-start gap-3 mb-3 text-slate-600 ${font} font-medium text-sm`}>
                <span className="mt-1.5 w-2 h-2 rounded-full bg-red-400 shrink-0" />{t}
              </p>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} className="bg-[#08292F] rounded-2xl p-8 text-white">
            <h3 className={`text-lg ${font} font-bold text-[#A3E635] mb-6`}>With Sylithe</h3>
            {['Satellite-verified biomass and canopy data', 'Dynamic counterfactual baselines (DCAB)', 'Continuous near real-time monitoring', 'Pre-issuance risk detection and scoring', 'Single platform for discovery, analysis, and tracking'].map((t, i) => (
              <p key={i} className={`flex items-start gap-3 mb-3 text-slate-300 ${font} font-medium text-sm`}>
                <span className="mt-1.5 w-2 h-2 rounded-full bg-[#A3E635] shrink-0" />{t}
              </p>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* ===== PLATFORM PREVIEW ===== */}
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#F1F1F1]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.span variants={fadeUp} className={`text-[#16a34a] ${font} font-bold text-xs uppercase tracking-widest mb-3 block`}>Platform</motion.span>
          <motion.h2 variants={fadeUp} className={`text-3xl md:text-4xl ${font} font-bold leading-tight mb-6`}>
            See it in action
          </motion.h2>
          <motion.p variants={fadeUp} className={`text-slate-600 ${font} font-normal text-lg leading-relaxed mb-8 max-w-lg`}>
            Our CHM Verification Dashboard lets you visualize canopy height models, run biomass estimates, and assess project-level risk — all from your browser.
          </motion.p>
          <motion.ul variants={stagger} className="space-y-3 mb-8">
            {['Interactive map with pixel-level CHM data', 'KML upload for custom project boundaries', 'Exportable risk reports and metrics'].map((t, i) => (
              <motion.li key={i} variants={fadeUp} className={`flex items-center gap-3 ${font} font-semibold text-base`}>
                <HiCheck className="text-[#16a34a]" />{t}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div variants={fadeUp}>
            <Link to="/chm-verification" className={`bg-[#08292f] text-white px-8 py-3.5 rounded-full ${font} font-bold text-sm hover:bg-[#062125] transition-all inline-block`}>
              Try the dashboard
            </Link>
          </motion.div>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex justify-center">
          <img src={dashboardImg} alt="Dashboard preview" className="rounded-2xl shadow-2xl max-h-[420px] object-cover" />
        </motion.div>
      </div>
    </section>

    {/* ===== CTA ===== */}
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#08292F] text-white text-center">
      <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <motion.h2 variants={fadeUp} className={`text-3xl md:text-4xl ${font} font-bold leading-tight mb-6`}>
          Ready to buy carbon with confidence?
        </motion.h2>
        <motion.p variants={fadeUp} className={`text-slate-300 ${font} font-normal text-lg mb-10`}>
          Join the next generation of carbon buyers using satellite intelligence to de-risk their portfolios.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
          <Link to="/signup" className={`bg-[#A3E635] text-[#08292F] px-8 py-3.5 rounded-full ${font} font-bold text-sm hover:bg-[#bef264] transition-all`}>
            Get started
          </Link>
          <Link to="/about" className={`rounded-full border-2 border-white/30 px-8 py-3 text-white ${font} font-bold text-sm hover:bg-white/10 transition-all`}>
            Contact us
          </Link>
        </motion.div>
      </motion.div>
    </section>

  </div>
);

export default ForBuyers;
