import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc"; 
import { FaMicrosoft } from "react-icons/fa";

// --- FIXED IMPORT ---
// We changed this from 'tree21.jpg' (which was missing) to 'tree23.png' (your dark wave bg)
import authBg from '../assets/tree23.png'; 
import logo from '../assets/treee13.png'; // Your Logo

const Signup = () => {
  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      
      {/* ================= LEFT SIDE: VISUAL & BRANDING ================= */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#0F172A]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <img 
                src={authBg} 
                alt="Background" 
                className="w-full h-full object-cover opacity-60"
            />
            {/* Green gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-16 flex flex-col justify-between h-full text-white">
            <div className="flex items-center gap-2">
                <img src={logo} alt="Sylithe" className="h-8 w-auto mix-blend-screen" />
                <span className="text-xl font-bold tracking-tight">Sylithe</span>
            </div>

            <div className="mb-10">
                <h2 className="text-4xl font-bold leading-tight mb-6">
                    Start your journey to <br/>
                    <span className="text-[#A3E635]">confident climate action.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                    Join leading organizations using Sylithe's science-backed platform to measure, reduce, and report carbon emissions with satellite precision.
                </p>
                
                <div className="mt-8 flex gap-2">
                    <div className="h-1 w-12 bg-[#A3E635] rounded-full"></div>
                    <div className="h-1 w-2 bg-white/20 rounded-full"></div>
                    <div className="h-1 w-2 bg-white/20 rounded-full"></div>
                </div>
            </div>
        </div>
      </div>


      {/* ================= RIGHT SIDE: SIGNUP FORM ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="max-w-md w-full">
            
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#0F172A] mb-2">Create your account</h2>
                <p className="text-gray-500">
                    Get started with a 14-day free trial. No credit card required.
                </p>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <button className="flex items-center justify-center gap-2 border border-gray-200 p-3 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700">
                    <FcGoogle className="text-xl" /> Google
                </button>
                <button className="flex items-center justify-center gap-2 border border-gray-200 p-3 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700">
                    <FaMicrosoft className="text-xl text-[#00a4ef]" /> Microsoft
                </button>
            </div>

            <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                </div>
            </div>

            {/* Form */}
            <form className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Work Email</label>
                    <input 
                        type="email" 
                        placeholder="name@company.com" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#A3E635] focus:border-transparent outline-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                    <input 
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#A3E635] focus:border-transparent outline-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                    <input 
                        type="password" 
                        placeholder="••••••••" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#A3E635] focus:border-transparent outline-none transition-all"
                    />
                    <p className="text-xs text-gray-400 mt-1">Must be at least 8 characters.</p>
                </div>

                <div className="flex items-center gap-2">
                    <input type="checkbox" id="terms" className="w-4 h-4 text-[#A3E635] border-gray-300 rounded focus:ring-[#A3E635]" />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to the <a href="#" className="underline hover:text-black">Terms</a> and <a href="#" className="underline hover:text-black">Privacy Policy</a>.
                    </label>
                </div>

                <button className="w-full bg-[#0F172A] text-white py-3.5 rounded-lg font-bold hover:bg-[#A3E635] hover:text-[#0F172A] transition-all shadow-lg active:scale-95">
                    Create Account
                </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-8">
                Already have an account? <Link to="/login" className="font-bold text-[#0F172A] hover:underline">Log in</Link>
            </p>

        </div>
      </div>

    </div>
  );
};

export default Signup;