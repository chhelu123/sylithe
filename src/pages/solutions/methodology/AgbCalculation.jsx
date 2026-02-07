import React, { useState, useEffect } from 'react';

const AgbCalculation = () => {
  const [activeSection, setActiveSection] = useState('equation');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['equation', 'wood-density', 'root-shoot', 'uncertainty'];
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 400) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full bg-white font-sans text-[#0F172A] pt-20">
      
      {/* HERO */}
      <section className="w-full bg-white border-b border-gray-100 py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl">
          <div className="inline-block px-3 py-1 bg-[#A3E635]/10 text-[#4d7c0f] rounded-md text-xs font-bold tracking-widest uppercase mb-6 border border-[#A3E635]/20">
            AGB Calculation
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.1] mb-8 text-[#0F172A]">
            Above Ground <br />
            <span className="text-gray-400">Biomass Dynamics.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed font-light">
            From height to volume, from volume to carbon. Sylithe creates the final link in the chain using localized, species-specific allometry.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-32 h-fit">
            <div className="space-y-10">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Contents</h3>
                <nav className="space-y-1 relative border-l border-gray-100">
                  {[
                    ['equation', 'The Conversion Logic'],
                    ['wood-density', 'Wood Density Maps'],
                    ['root-shoot', 'Below Ground (BGB)'],
                    ['uncertainty', 'Error Propagation']
                  ].map(([id, label]) => (
                    <button key={id} onClick={() => scrollToSection(id)} className={`block w-full text-left pl-6 py-2 text-sm font-medium transition-all duration-300 border-l-2 -ml-[2px] ${activeSection === id ? 'text-[#0F172A] border-[#A3E635]' : 'text-gray-400 hover:text-gray-600 border-transparent'}`}>
                      {label}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100">
                <h4 className="font-bold text-[#0F172A] mb-2">Equation Library</h4>
                <p className="text-sm text-gray-500 mb-6">Access our database of 12,000+ allometric equations.</p>
                <button className="w-full bg-[#0F172A] text-white font-bold py-3 rounded-lg hover:bg-[#A3E635] hover:text-[#064e3b] transition-all text-sm">Search Library</button>
              </div>
            </div>
          </aside>

          {/* ARTICLE */}
          <main className="lg:col-span-8 min-h-screen">
            <article className="prose prose-lg prose-slate max-w-none">
              
              <section id="equation" className="mb-24 scroll-mt-32">
                <h2 className="text-3xl font-bold text-[#0F172A] mb-8">The AGB Formula</h2>
                <p>Once we have the Canopy Height (CHM), we need to convert it to Biomass (AGB). Sylithe does not use a single global equation. We dynamically select equations based on the <strong>FAO Eco-Floristic Zone</strong> of the pixel.</p>
                <div className="bg-gray-900 text-gray-200 p-8 rounded-xl font-mono text-sm my-6 overflow-x-auto">
                  AGB = 0.0673 × (ρ × D² × H)^0.976
                  <br /><br />
                  <span className="text-gray-500">// Where:</span><br />
                  <span className="text-[#A3E635]">ρ (Rho)</span> = Wood Density (g/cm³)<br />
                  <span className="text-[#A3E635]">D</span> = Diameter at Breast Height (inferred)<br />
                  <span className="text-[#A3E635]">H</span> = Canopy Height (from Sylithe CHM)
                </div>
              </section>

              <section id="wood-density" className="mb-24 scroll-mt-32">
                <h2 className="text-3xl font-bold text-[#0F172A] mb-8">Wood Density Matters</h2>
                <p>A Balsa tree and an Ebony tree might be the same height, but the Ebony tree holds 4x more carbon. Standard models average this out. Sylithe uses <strong>Hyperspectral signals</strong> to identify dominant species groups and assign a specific Wood Density (ρ) value to each cluster.</p>
                <p>This "Weighted Density" approach reduces the error margin significantly compared to generic Tier 1 IPCC estimates.</p>
              </section>

              <section id="root-shoot" className="mb-24 scroll-mt-32">
                <h2 className="text-3xl font-bold text-[#0F172A] mb-8">Don't Forget the Roots (BGB)</h2>
                <p>Carbon isn't just in the trunk. The root system stores 20-25% of the tree's total carbon. Sylithe calculates Below Ground Biomass (BGB) using the <strong>Root-to-Shoot Ratio (R/S)</strong> appropriate for the soil moisture and rainfall of the region.</p>
                <p>In drier climates, trees invest more in roots. Our model adjusts the R/S ratio dynamically based on precipitation data (CHIRPS) to ensure we capture the hidden carbon correctly.</p>
              </section>

              <section id="uncertainty" className="mb-24 scroll-mt-32">
                <h2 className="text-3xl font-bold text-[#0F172A] mb-8">Monte Carlo Error Propagation</h2>
                <p>Every step introduces uncertainty. The Lidar has error. The equation has error. The wood density map has error. Sylithe runs a <strong>Monte Carlo simulation (10,000 runs)</strong> for every project to calculate the confidence interval.</p>
                <p>We don't just give you a number (e.g., "1 million tonnes"). We give you a range: "1 million tonnes ± 4.2% at 95% Confidence." This is the data buyers need to perform due diligence.</p>
              </section>

            </article>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AgbCalculation;