import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import signupImage from '../assets/signup_flow.png';
import dashboardImage from '../assets/school_dashboard.png';
import scannerImage from '../assets/mobile_scanner.png';

const Demo = () => {
    return (
        <div className="min-h-screen bg-[#1a222c] text-slate-200 font-sans selection:bg-slate-700 selection:text-white">
            {/* Top Navigation */}
            <nav className="sticky top-0 z-50 bg-[#1a222c]/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                    <Link to="/auth" className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-all font-medium text-sm border border-slate-700">
                        Sign Up Now
                    </Link>
                </div>
            </nav>

            {/* Hero Header */}
            <header className="pt-24 pb-16 px-6 text-center max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
                    See it in <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500">Action</span>
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed">
                    Experience the frictionless workflow of 900Schools. From seamless onboarding to instant QR tracking, discover how we've reimagined school management.
                </p>
            </header>

            {/* Main Content Sections */}
            <main className="max-w-7xl mx-auto px-6 pb-32 space-y-32">
                
                {/* Step 1: Sign Up */}
                <section className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300">
                            Step 1
                        </div>
                        <h2 className="text-4xl font-bold text-white tracking-tight">Seamless Onboarding</h2>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            Start your journey with an incredibly sleek, modern sign-up flow. We gather only the essentials to provision your school's unique ecosystem instantly.
                        </p>
                        <ul className="space-y-4 pt-4">
                            {['Instant tenant provisioning', 'Secure authentication', 'Personalized school setup'].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-slate-500" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-600/20 to-transparent blur-3xl rounded-full"></div>
                        <img 
                            src={signupImage} 
                            alt="Sign Up Dashboard" 
                            className="relative rounded-2xl border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform group-hover:-translate-y-2 transition-transform duration-500"
                        />
                    </div>
                </section>

                {/* Step 2: Information Upload */}
                <section className="flex flex-col-reverse lg:flex-row items-center gap-16">
                    <div className="flex-1 relative group">
                        <div className="absolute inset-0 bg-gradient-to-bl from-slate-500/20 to-transparent blur-3xl rounded-full"></div>
                        <img 
                            src={dashboardImage} 
                            alt="School Information Dashboard" 
                            className="relative rounded-2xl border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform group-hover:-translate-y-2 transition-transform duration-500"
                        />
                    </div>
                    <div className="flex-1 space-y-6 lg:pl-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300">
                            Step 2
                        </div>
                        <h2 className="text-4xl font-bold text-white tracking-tight">Centralized School Data</h2>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            Manage all your school's information from a unified command center. Easily upload student records, manage classes, and view top-level analytics in real-time.
                        </p>
                        <ul className="space-y-4 pt-4">
                            {['Bulk data uploads', 'Real-time analytics', 'Intuitive data tables'].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-slate-500" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Step 3: QR Scanner */}
                <section className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300">
                            Step 3
                        </div>
                        <h2 className="text-4xl font-bold text-white tracking-tight">Instant QR Scanning</h2>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            Equip your teachers with our mobile-first scanner interface. Effortlessly scan student ID cards for attendance, behavior logging, or hall passes using your device's camera.
                        </p>
                        <ul className="space-y-4 pt-4">
                            {['Lightning-fast recognition', 'Offline mode support', 'Direct database synchronization'].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-slate-500" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 flex justify-center relative group">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-600/20 to-transparent blur-3xl rounded-full"></div>
                        <img 
                            src={scannerImage} 
                            alt="Mobile QR Scanner App" 
                            className="relative max-w-sm rounded-[2.5rem] border-[8px] border-slate-900 shadow-[0_0_50px_rgba(0,0,0,0.6)] transform group-hover:-translate-y-2 transition-transform duration-500"
                        />
                    </div>
                </section>

            </main>

            {/* Call to Action Footer */}
            <footer className="border-t border-slate-800 bg-[#141a22] py-20 text-center">
                <h3 className="text-3xl font-bold text-white mb-6">Ready to transform your school?</h3>
                <Link to="/auth" className="inline-flex px-8 py-4 rounded-full bg-slate-100 text-slate-900 font-semibold hover:bg-white transition-colors shadow-lg">
                    Start Your Free Trial
                </Link>
            </footer>
        </div>
    );
};

export default Demo;
