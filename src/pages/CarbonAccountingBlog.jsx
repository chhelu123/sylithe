import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { HiOutlineArrowRight } from "react-icons/hi";

const CarbonAccountingBlog = () => {
  // Ensure we start at the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll Helper Function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full bg-white font-sans text-sylitheDark">
      <Navbar />

      {/* --- Page Header --- */}
      <header className="pt-40 pb-16 px-6 md:px-12 lg:px-24 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
            <span className="text-sylitheGreen font-bold tracking-wider uppercase text-sm mb-4 block">Carbon Accounting</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#0F172A] mb-8">
                Carbon footprint data collection: Common challenges and how to solve them
            </h1>
        </div>
      </header>

      {/* --- Main Content Layout --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 grid lg:grid-cols-12 gap-12 relative">
        
        {/* === LEFT SIDEBAR (Sticky Navigation) === */}
        <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 space-y-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Jump to Section</h4>
                <nav className="flex flex-col gap-3 border-l border-gray-200 pl-4">
                    {['Key takeaways', 'The data collection conundrum', 'GHG reporting is a team effort', 'Simplifying the data collection process', 'How Carbon Direct can help'].map((item, index) => (
                        <button 
                            key={index}
                            onClick={() => scrollToSection(`section-${index}`)}
                            className="text-left text-sm font-medium text-gray-600 hover:text-sylitheDark hover:border-l-2 hover:border-sylitheGreen -ml-[17px] pl-4 py-1 transition-all"
                        >
                            {item}
                        </button>
                    ))}
                </nav>

                {/* Sidebar CTA */}
                <div className="pt-6">
                    <h5 className="font-bold text-lg mb-2">Go from climate goal to climate action</h5>
                    <button className="w-full bg-[#0F172A] text-white py-3 rounded-full font-bold text-sm hover:bg-black transition-colors">
                        Get started
                    </button>
                </div>
            </div>
        </aside>

        {/* === RIGHT CONTENT AREA === */}
        <article className="lg:col-span-9 max-w-3xl prose prose-lg prose-headings:font-bold prose-headings:text-[#0F172A] prose-p:text-gray-600">
            
            {/* 0. Key Takeaways */}
            <section id="section-0" className="bg-gray-50 p-8 rounded-xl border border-gray-100 mb-12 not-prose">
                <h3 className="text-xl font-bold mb-4">Key takeaways</h3>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-sylitheGreen mt-2 shrink-0"></div>
                        <span><strong>GHG emissions reporting is evolving</strong>, with regulations like SB 253 (California) and CSRD (Europe) increasing scope 3 disclosure requirements.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-sylitheGreen mt-2 shrink-0"></div>
                        <span><strong>Data collection remains the biggest challenge.</strong> According to the GHG Protocol, 83% of companies struggle to access accurate emissions data.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-sylitheGreen mt-2 shrink-0"></div>
                        <span><strong>Companies can improve data collection</strong> by engaging suppliers, standardizing methodologies, leveraging automation, and integrating data systems.</span>
                    </li>
                </ul>
            </section>

            <p className="text-xl leading-relaxed text-gray-800 font-medium mb-12">
                Greenhouse gas (GHG) emissions reporting, also known as carbon accounting, is rapidly evolving. The GHG Protocol is undergoing updates, and recent policies such as SB 253 in California and the Corporate Sustainability Reporting Directive (CSRD) in Europe are mandating scope 3 emissions disclosures for more businesses.
            </p>

            {/* 1. The data collection conundrum */}
            <section id="section-1" className="mb-16 scroll-mt-32">
                <h2 className="text-3xl mb-6">The data collection conundrum</h2>
                <p>Carbon accounting is an essential yet challenging exercise for organizations looking to move toward climate action. Accurate GHG emissions data is key for setting reduction targets, complying with regulations, and demonstrating reduction actions. However, nearly every organization struggles with data collection.</p>
                <p className="mt-4">A CDP report found that only 56% of suppliers provide emissions data to corporate customers. These challenges come from data availability, standardization, and verification complexities.</p>
                
                <div className="mt-8 space-y-8">
                    <div>
                        <h3 className="text-xl font-bold mb-2">1. Data availability & supplier engagement</h3>
                        <p>One of the greatest challenges is obtaining accurate data from suppliers. Many SMEs do not track emissions due to limited resources. Further complicating matters is the complexity of multi-tier supply chains.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">2. Standardization & data consistency</h3>
                        <p>The lack of uniform GHG emissions reporting complicates data collection. Suppliers use different calculation methods, making consistency difficult.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">3. Methodology discrepancies across the value chain</h3>
                        <p>Scope 3 emissions pose a whole separate host of challenges. Many organizations rely on industry-average emissions factors instead of actual supplier data.</p>
                    </div>
                </div>
            </section>

            {/* 2. GHG reporting is a team effort */}
            <section id="section-2" className="mb-16 scroll-mt-32">
                <h2 className="text-3xl mb-6">GHG reporting is a team effort</h2>
                <p>Beyond the data, there is the human challenge of knowing who to go to for certain information. Developing a comprehensive footprint requires information across your entire business. Simply put, sustainability is a team sport.</p>
                
                {/* --- TABLE 1 --- */}
                <div className="mt-8 border border-gray-200 rounded-xl overflow-hidden text-sm">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 font-bold text-gray-700">
                        Table 1: Where to find data within your organization
                    </div>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white border-b border-gray-200">
                                <th className="px-6 py-3 font-bold text-gray-900 w-1/3">Department</th>
                                <th className="px-6 py-3 font-bold text-gray-900 w-1/3">Data type</th>
                                <th className="px-6 py-3 font-bold text-gray-900 w-1/3">Emissions category</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr>
                                <td className="px-6 py-4 align-top"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">Finance</span> <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold ml-1">Procurement</span></td>
                                <td className="px-6 py-4 align-top"><span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700 block mb-1">Procurement of goods & services</span> <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700 block">Business travel</span></td>
                                <td className="px-6 py-4 align-top"><span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">Scope 3 Categories 1, 2, 6</span></td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 align-top"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">Operations</span> <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold ml-1">Facilities</span></td>
                                <td className="px-6 py-4 align-top">
                                    <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700 block mb-1">Fuel / energy usage</span>
                                    <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700 block mb-1">Electricity usage</span>
                                    <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700 block">Waste</span>
                                </td>
                                <td className="px-6 py-4 align-top">
                                    <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700 block mb-1">Scope 1</span>
                                    <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700 block mb-1">Scope 2</span>
                                    <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700 block">Scope 3 Category 5</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 align-top"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">Human Resources</span></td>
                                <td className="px-6 py-4 align-top"><span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">Employee commuting</span></td>
                                <td className="px-6 py-4 align-top"><span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">Scope 3 Category 7</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 3. Simplifying the process */}
            <section id="section-3" className="mb-16 scroll-mt-32">
                <h2 className="text-3xl mb-6">Simplifying the data collection process</h2>
                <p className="mb-6">As GHG reporting becomes more rigorous, companies need practical solutions. While the process may seem overwhelming, there are key strategies:</p>
                <ul className="list-disc pl-6 space-y-4 text-gray-700">
                    <li><strong>Avoid rigid data templates:</strong> Look for solutions that can accept data in multiple formats.</li>
                    <li><strong>Streamline communication:</strong> Ensure that your reporting platform has an integrated task management system.</li>
                    <li><strong>Leverage expert guidance:</strong> Hands-on guidance from carbon accounting experts ensures teams know what to gather.</li>
                    <li><strong>Automate utility data extraction:</strong> Automating this process simplifies scope 1 and 2 reporting.</li>
                </ul>
            </section>

            {/* 4. How Carbon Direct can help */}
            <section id="section-4" className="mb-16 scroll-mt-32 bg-[#0F172A] p-10 rounded-2xl text-white">
                <h2 className="text-3xl mb-4 text-white">How Sylithe can help</h2>
                <p className="text-gray-300 mb-6">
                    Navigating these challenges can be difficult, but the right partner can make all the difference. Sylithe's comprehensive GHG accounting platform is designed to simplify emissions tracking, improve data accuracy, and integrate seamlessly with existing systems.
                </p>
                <button className="bg-sylitheGreen text-sylitheDark px-6 py-3 rounded-full font-bold hover:bg-[#92d02e] transition-colors flex items-center gap-2">
                    Request a demo <HiOutlineArrowRight />
                </button>
            </section>

        </article>
      </div>
      
      {/* Simple Footer */}
      <footer className="bg-gray-50 py-12 text-center border-t border-gray-200 text-sm text-gray-500">
          &copy; 2025 Sylithe Inc. All rights reserved.
      </footer>
    </div>
  );
};

export default CarbonAccountingBlog;