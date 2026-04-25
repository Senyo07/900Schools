import React from 'react';
import { ArrowRight, BookOpen, Fingerprint, LayoutTemplate, Link as LinkIcon, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="min-h-screen bg-emerald-950 text-slate-50 overflow-hidden font-sans">
            {/* Navbar */}
            <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-emerald-950/50 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center">
                            <BookOpen className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-200">
                            900Schools
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex gap-6 text-sm font-medium text-emerald-100">
                            <a href="#features" className="hover:text-white transition-colors">Features</a>
                            <a href="#solution" className="hover:text-white transition-colors">Solutions</a>
                            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                        </div>
                        <Link to="/auth" className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all font-medium text-sm flex items-center gap-2">
                            Sign In
                        </Link>
                        <Link to="/auth" className="hidden md:flex px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-amber-500 hover:opacity-90 transition-opacity font-medium text-sm shadow-[0_0_20px_rgba(16,185,129,0.4)] text-emerald-950">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[90vh]">
                {/* Decorative Background Gradients */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[120px] -z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px] -z-10" />

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-emerald-400/20 mb-8 backdrop-blur-sm">
                    <span className="flex h-2 w-2 rounded-full relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    <span className="text-sm font-medium text-emerald-100">Intelligent School Operations Platform</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-center leading-tight mb-8">
                    The future of <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-amber-400">
                        School Management
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-emerald-100/80 text-center max-w-3xl mb-12">
                    Centralize your operations, monitor behavior passively with QR-enabled tracking, and build stunning school websites instantly.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/auth" className="px-8 py-4 rounded-full bg-white text-emerald-950 font-semibold flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        Start Free Trial
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <a href="#demo" className="px-8 py-4 rounded-full bg-emerald-900/50 border border-emerald-500/30 font-semibold flex items-center justify-center hover:bg-emerald-800/50 transition-colors backdrop-blur-sm">
                        View Live Demo
                    </a>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 px-6 relative z-10 w-full max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to run your school</h2>
                    <p className="text-emerald-100/60 max-w-2xl mx-auto">A unified ecosystem replacing disjointed tools with an all-in-one AI powered platform.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: <LayoutTemplate className="w-8 h-8 text-emerald-400" />,
                            title: "Website Builder",
                            desc: "Deploy customized, beautiful school websites in literal seconds with dynamic modules."
                        },
                        {
                            icon: <Fingerprint className="w-8 h-8 text-amber-400" />,
                            title: "Smart ID & QR",
                            desc: "Auto-generate student ID cards with secure QR codes for attendance and tracking."
                        },
                        {
                            icon: <ShieldCheck className="w-8 h-8 text-emerald-300" />,
                            title: "AI Behavior Monitoring",
                            desc: "Teachers easily log reports while our AI polishes and alerts parents automatically."
                        }
                    ].map((feat, i) => (
                        <div key={i} className="group p-8 rounded-3xl bg-emerald-900/40 border border-emerald-800/50 hover:border-emerald-600/50 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-800/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {feat.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">{feat.title}</h3>
                            <p className="text-emerald-100/70 leading-relaxed">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Landing;
