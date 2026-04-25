import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

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
                            <div className="flex flex-row items-center justify-center gap-4">
                                <button className="px-4 py-2 rounded-full bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition-colors">
                                    Discover
                                </button>
                                <button className="px-4 py-2 rounded-full text-white bg-[#202A36] hover:bg-[#1a2229] font-medium transition-colors">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
