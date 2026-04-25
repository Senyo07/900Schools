import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Hero section */}
            <div className="relative h-screen overflow-hidden">
                {/* Video Background */}
                <video
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    autoPlay
                    muted
                    loop
                    playsInline
                    src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4"
                />

                {/* Content wrapper */}
                <div className="relative h-full flex flex-col z-10">
                    {/* Navigation Bar */}
                    <nav className="max-w-7xl w-full mx-auto px-8 py-6 flex justify-between items-center relative z-20">
                        <div className="text-2xl font-semibold text-gray-900">
                            SkyElite
                        </div>
                        
                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {['Start', 'Story', 'Rates', 'Benefits', 'FAQ'].map((item) => (
                                <a 
                                    key={item} 
                                    href={`#${item.toLowerCase()}`} 
                                    className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
                                >
                                    {item}
                                </a>
                            ))}
                            <div className="flex items-center gap-4 ml-4">
                                <Link to="/auth" className="px-5 py-2.5 rounded-full bg-blue-900/10 hover:bg-blue-900/20 text-gray-900 border border-blue-900/10 transition-all font-medium text-sm flex items-center gap-2">
                                    Sign In
                                </Link>
                                <Link to="/auth" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-white hover:opacity-90 transition-opacity font-medium text-sm shadow-[0_0_20px_rgba(59,130,246,0.4)] text-blue-950">
                                    Get Started
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                            className="md:hidden text-gray-900"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </nav>

                    {/* Mobile Dropdown */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden absolute top-24 left-8 right-8 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 z-40">
                            <div className="flex flex-col space-y-4">
                                {['Start', 'Story', 'Rates', 'Benefits', 'FAQ'].map((item) => (
                                    <a 
                                        key={item} 
                                        href={`#${item.toLowerCase()}`} 
                                        className="text-gray-900 hover:text-gray-700 transition-colors text-lg font-medium"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item}
                                    </a>
                                ))}
                                <hr className="border-gray-200" />
                                <Link to="/auth" className="text-gray-900 hover:text-blue-600 transition-colors text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                                    Sign In
                                </Link>
                                <Link to="/auth" className="text-blue-600 hover:text-blue-700 transition-colors text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Main content area */}
                    <div className="flex-1 flex items-center justify-center relative z-10">
                        <div className="flex flex-col items-center text-center -mt-80">
                            {/* Label */}
                            <div className="text-sm font-semibold text-gray-600 tracking-wider mb-4 uppercase">
                                PRIVATE JETS
                            </div>

                            {/* Heading */}
                            <div className="flex flex-col items-center mb-6">
                                <h1 className="text-6xl md:text-7xl lg:text-8xl font-normal text-gray-500 leading-none tracking-tighter">
                                    Premium.
                                </h1>
                                <h1 
                                    className="text-6xl md:text-7xl lg:text-8xl font-normal text-[#202A36] leading-none tracking-tighter"
                                    style={{ marginTop: '-12px' }}
                                >
                                    Accessible.
                                </h1>
                            </div>

                            {/* Subtitle */}
                            <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl px-4">
                                Your dedication deserves recognition.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <Link to="/auth" className="px-8 py-4 rounded-full bg-white text-blue-950 font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                    Start Free Trial
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <a href="#demo" className="px-8 py-4 rounded-full bg-blue-900/50 border border-blue-500/30 text-white font-semibold flex items-center justify-center hover:bg-blue-800/50 transition-colors backdrop-blur-sm">
                                    View Live Demo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
