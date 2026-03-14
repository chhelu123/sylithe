import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiArrowLeft } from 'react-icons/hi';

import authBg from '../assets/tree23.png';
import logo from '../assets/treee13.png';

const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#A3E635] focus:border-transparent outline-none transition-all text-[#0F172A]";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";
const selectClass = "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#A3E635] focus:border-transparent outline-none transition-all text-[#0F172A] appearance-none";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: '', email: '', mobile: '',
    companyName: '', designation: '', primaryActivity: '',
    companySize: '', interestArea: '', hearAbout: '', message: '',
  });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted:', form);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F1F1F1] font-sans">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0 z-0">
          <img src={authBg} alt="Background" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] via-transparent to-transparent" />
        </div>
        <div className="relative z-10 p-16 flex flex-col justify-between h-full text-white">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Sylithe" className="h-8 w-auto mix-blend-screen" />
            <span className="text-xl font-bold tracking-tight">Sylithe</span>
          </div>
          <div className="mb-10">
            <h2 className="text-4xl font-bold leading-tight mb-6">
              Start your journey to <br />
              <span className="text-[#A3E635]">confident climate action.</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Join leading organizations using Sylithe's science-backed platform to measure, reduce, and report carbon emissions with satellite precision.
            </p>
            {/* Step indicator */}
            <div className="mt-8 flex gap-2">
              <div className={`h-1 w-12 rounded-full transition-all ${step === 1 ? 'bg-[#A3E635]' : 'bg-[#F1F1F1]/20'}`} />
              <div className={`h-1 w-12 rounded-full transition-all ${step === 2 ? 'bg-[#A3E635]' : 'bg-[#F1F1F1]/20'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="max-w-md w-full">

          {step === 1 && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#0F172A] mb-2">Create your account</h2>
                <p className="text-gray-500">Tell us a bit about yourself to get started.</p>
              </div>

              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input type="text" placeholder="Your name" value={form.fullName} onChange={update('fullName')} className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Work Email</label>
                  <input type="email" placeholder="name@company.com" value={form.email} onChange={update('email')} className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Mobile Number</label>
                  <input type="tel" placeholder="+91 98765 43210" value={form.mobile} onChange={update('mobile')} className={inputClass} required />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="terms" className="w-4 h-4 text-[#A3E635] border-gray-300 rounded focus:ring-[#A3E635]" required />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the <Link to="/terms-of-service" className="underline hover:text-black">Terms</Link> and <Link to="/privacy-policy" className="underline hover:text-black">Privacy Policy</Link>.
                  </label>
                </div>

                <button type="submit" className="w-full bg-[#08292f] text-white py-3.5 rounded-lg font-bold hover:bg-[#062125] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                  Continue <HiArrowRight />
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#0F172A] mb-2">Tell us about your work</h2>
                <p className="text-gray-500">This helps us tailor the platform to your needs.</p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className={labelClass}>Company / Organisation Name</label>
                  <input type="text" placeholder="Acme Corp" value={form.companyName} onChange={update('companyName')} className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Your Designation</label>
                  <input type="text" placeholder="e.g. Sustainability Lead, CTO, Analyst" value={form.designation} onChange={update('designation')} className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>What does your organisation primarily do?</label>
                  <select value={form.primaryActivity} onChange={update('primaryActivity')} className={selectClass} required>
                    <option value="" disabled>Select one</option>
                    <option value="carbon_buyer">Buy carbon credits</option>
                    <option value="project_developer">Develop carbon / forestry projects</option>
                    <option value="investor">Invest in carbon / climate assets</option>
                    <option value="government">Government / regulatory body</option>
                    <option value="consultancy">Sustainability consultancy</option>
                    <option value="corporate_sustainability">Corporate sustainability / ESG</option>
                    <option value="research">Research / academia</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Company Size</label>
                  <select value={form.companySize} onChange={update('companySize')} className={selectClass} required>
                    <option value="" disabled>Select one</option>
                    <option value="1-10">1–10 employees</option>
                    <option value="11-50">11–50 employees</option>
                    <option value="51-200">51–200 employees</option>
                    <option value="201-1000">201–1,000 employees</option>
                    <option value="1000+">1,000+ employees</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>What are you most interested in?</label>
                  <select value={form.interestArea} onChange={update('interestArea')} className={selectClass} required>
                    <option value="" disabled>Select one</option>
                    <option value="pre_issuance_mrv">Pre-issuance MRV & verification</option>
                    <option value="risk_analysis">Credit risk analysis & scoring</option>
                    <option value="portfolio_monitoring">Portfolio monitoring</option>
                    <option value="project_development">Project development tools</option>
                    <option value="biomass_mapping">Biomass & canopy mapping</option>
                    <option value="compliance">ICM / Verra compliance</option>
                    <option value="exploring">Just exploring</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>How did you hear about Sylithe?</label>
                  <select value={form.hearAbout} onChange={update('hearAbout')} className={selectClass}>
                    <option value="" disabled>Select one</option>
                    <option value="search">Search engine</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="referral">Referral / word of mouth</option>
                    <option value="event">Conference / event</option>
                    <option value="news">News / media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-gray-300 font-bold text-gray-700 hover:bg-gray-50 transition-all">
                    <HiArrowLeft /> Back
                  </button>
                  <button type="submit" className="flex-1 bg-[#08292f] text-white py-3.5 rounded-lg font-bold hover:bg-[#062125] transition-all shadow-lg active:scale-95">
                    Sign Up
                  </button>
                </div>
              </form>
            </>
          )}

          <p className="text-center text-sm text-gray-600 mt-8">
            Already have an account? <Link to="/login" className="font-bold text-[#0F172A] hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
