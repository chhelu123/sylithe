import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from "react-icons/fi"; // Install: npm install react-icons

// --- ASSETS ---
import logo from '../assets/treee13.png'; // Your Sylithe Logo

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] flex flex-col items-center justify-center px-4 font-sans">
      
      {/* 1. LOGO SECTION */}
      <div className="mb-8 flex flex-col items-center">
        <Link to="/">
            <img 
                src={logo} 
                alt="Sylithe Logo" 
                className="h-16 w-auto object-contain mb-6 hover:scale-105 transition-transform"
            />
        </Link>
        <h1 className="text-3xl font-bold text-[#1a1a1a] tracking-tight">
            Log in to Sylithe
        </h1>
      </div>

      {/* 2. FORM SECTION */}
      <div className="w-full max-w-[400px]">
        <form className="space-y-6">
            
            {/* Email Field */}
            <div className="space-y-2">
                <label className="block text-[15px] font-medium text-[#1a1a1a]">
                    Email
                </label>
                <input 
                    type="email" 
                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] transition-all shadow-sm"
                />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
                <label className="block text-[15px] font-medium text-[#1a1a1a]">
                    Password
                </label>
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"}
                        className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] transition-all shadow-sm pr-10"
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-left">
                <a href="#" className="text-[15px] text-[#059669] hover:text-[#047857] hover:underline font-medium">
                    Forgot password?
                </a>
            </div>

            {/* Login Button (Grey style as per image) */}
            <button className="w-full bg-[#A3A3A3] hover:bg-[#909090] text-white font-bold py-3 rounded-md transition-colors text-[15px]">
                Log in
            </button>

        </form>

        {/* 3. FOOTER LINKS */}
        <div className="mt-8 text-center space-y-4">
            <p className="text-[15px] text-[#1a1a1a]">
                Don't have an account? <Link to="/signup" className="text-[#059669] hover:text-[#047857] hover:underline">Request access</Link>
            </p>
            
            <p className="text-[15px] text-[#1a1a1a]">
                Need help? <a href="#" className="text-[#059669] hover:text-[#047857] hover:underline">Contact Support</a>
            </p>
        </div>
      </div>

    </div>
  );
};

export default Login;