import React, { useState } from 'react';
import { ArrowRight, BookOpen, Fingerprint, Lock, Mail, Building } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row overflow-hidden font-sans">

            {/* Left panel / Branding */}
            <div className="hidden md:flex md:w-1/2 relative flex-col justify-between p-12 overflow-hidden border-r border-slate-900">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 to-slate-950/80 z-0"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-500/20 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3"></div>

                <Link to="/" className="z-10 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-white flex items-center justify-center">
                        <BookOpen className="text-slate-950 w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold text-white">900Schools</span>
                </Link>

                <div className="z-10 max-w-md">
                    <div className="p-1 mb-6 inline-block rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-md">
                        <div className="text-white px-4 py-1 text-sm font-semibold tracking-wide">
                            Powering Modern Education
                        </div>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                        The intelligent operating system for your school.
                    </h1>
                    <p className="text-slate-100/80 text-lg">
                        Join hundreds of forward-thinking institutions using our AI-driven platform.
                    </p>
                </div>

                <div className="z-10 flex items-center gap-4 text-slate-200/60 text-sm">
                    <span>© 2026 900Schools</span>
                    <span>•</span>
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <span>•</span>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                </div>
            </div>

            {/* Right panel / Form */}
            <div className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative z-10 bg-slate-950 border-l border-white/5">
                <div className="w-full max-w-md mx-auto relative">

                    <div className="md:hidden flex items-center gap-2 mb-12">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-white flex items-center justify-center">
                            <BookOpen className="text-slate-950 w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold text-white">900Schools</span>
                    </div>

                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-white mb-3">
                            {isLogin ? 'Welcome back' : 'Register your school'}
                        </h2>
                        <p className="text-slate-200/60">
                            {isLogin
                                ? 'Enter your credentials to access your dashboard.'
                                : 'Create an account to start managing your school smarter.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-slate-100/80 mb-1.5">School Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-600">
                                        <Building className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="e.g. Lincoln High School"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-shadow"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-100/80 mb-1.5">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-600">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="admin@school.edu"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-shadow"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-sm font-medium text-slate-100/80">Password</label>
                                {isLogin && (
                                    <a href="#" className="text-white text-sm hover:text-slate-200 font-medium transition-colors">Forgot password?</a>
                                )}
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-600">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-shadow"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-slate-500 to-white text-slate-950 font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(59,130,246,0.3)] mt-8"
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>

                    <div className="mt-8 text-center text-slate-200/60">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-white font-medium hover:text-white transition-colors"
                        >
                            {isLogin ? "Register your school" : "Sign in instead"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
