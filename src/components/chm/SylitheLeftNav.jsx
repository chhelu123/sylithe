import React from 'react';
import { Image as ImageIcon, Building2, MessageSquare, LogOut } from 'lucide-react';
import treeLogo from '../../assets/treee13.png';

export default function SylitheLeftNav({ activeSection, onSectionChange }) {
    return (
        <div className="w-[80px] h-screen bg-white border-r border-gray-200 flex flex-col items-center py-6 shrink-0 relative z-[60] shadow-sm">
            {/* Top Logo */}
            <div className="mb-8 cursor-pointer hover:opacity-80 transition-opacity">
                <img src={treeLogo} alt="Sylithe Logo" className="w-8 h-8 object-contain" />
            </div>

            {/* Navigation Icons */}
            <div className="flex flex-col gap-6">
                {/* Active Button for LULC (Assess Land) */}
                <button
                    onClick={() => onSectionChange('lulc')}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${activeSection === 'lulc' ? 'bg-[#344031] text-[#a4fca1] shadow-md' : 'bg-transparent text-gray-400 hover:bg-gray-100'
                        }`}
                    title="Land Suitability (LULC)"
                >
                    <span className="text-[12px] font-bold tracking-widest">LULC</span>
                </button>

                {/* Button for CHM (Canopy Heights) */}
                <button
                    onClick={() => onSectionChange('chm')}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${activeSection === 'chm' ? 'bg-[#344031] text-[#a4fca1] shadow-md' : 'bg-transparent text-gray-700 hover:bg-gray-100'
                        }`}
                    title="Canopy Height Model"
                >
                    <span className="text-[12px] font-bold tracking-widest">CHM</span>
                </button>

                {/* Placeholder disabled button */}
                <button className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all" title="Credit Projection">
                    <Building2 size={22} strokeWidth={1.5} />
                </button>
            </div>

            <div className="flex-1" />

            {/* Bottom Section */}
            <div className="flex flex-col gap-6 items-center">
                {/* Chat */}
                <button className="w-12 h-12 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all">
                    <MessageSquare size={20} strokeWidth={1.5} />
                </button>

                {/* Logout */}
                <button className="w-12 h-12 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all">
                    <LogOut size={20} strokeWidth={1.5} />
                </button>
            </div>
        </div>
    );
}