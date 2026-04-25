import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Layout, Users, ShieldAlert, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
            </div>

            <div className="space-y-8 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Users className="w-16 h-16 text-slate-600" /></div>
                        <div className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Total Students</div>
                        <div className="text-4xl font-black text-slate-800 tracking-tight">1,248</div>
                        <div className="text-xs text-slate-600 mt-3 font-medium flex items-center gap-1"><span className="bg-slate-100 rounded px-1">+12%</span> from last year</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Users className="w-16 h-16 text-slate-600" /></div>
                        <div className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Teaching Staff</div>
                        <div className="text-4xl font-black text-slate-800 tracking-tight">84</div>
                        <div className="text-xs text-slate-500 mt-3 font-medium">Active accounts</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Users className="w-16 h-16 text-slate-600" /></div>
                        <div className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Non-Teaching Staff</div>
                        <div className="text-4xl font-black text-slate-800 tracking-tight">32</div>
                        <div className="text-xs text-slate-500 mt-3 font-medium">Active accounts</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><CreditCard className="w-16 h-16 text-slate-600" /></div>
                        <div className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Revenue (GHS)</div>
                        <div className="text-4xl font-black text-slate-800 tracking-tight">¢45,200</div>
                        <div className="text-xs text-slate-600 mt-3 font-medium">From admissions</div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <Link to="/website-design" className="block p-5 border border-slate-100 bg-slate-50 hover:border-slate-300 hover:bg-slate-50 rounded-2xl text-left transition-all duration-300 group shadow-sm hover:shadow-md">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Layout className="w-6 h-6 text-slate-600" />
                            </div>
                            <div className="font-bold text-slate-800 text-sm mb-1">Customize Website</div>
                            <div className="text-xs text-slate-500 font-medium">Edit pages and media</div>
                        </Link>
                        <Link to="/students" className="block p-5 border border-slate-100 bg-slate-50 hover:border-slate-300 hover:bg-slate-50 rounded-2xl text-left transition-all duration-300 group shadow-sm hover:shadow-md">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Users className="w-6 h-6 text-slate-600" />
                            </div>
                            <div className="font-bold text-slate-800 text-sm mb-1">Manage Students</div>
                            <div className="text-xs text-slate-500 font-medium">View roster & IDs</div>
                        </Link>
                        <Link to="/teacher" className="block p-5 border border-slate-100 bg-slate-50 hover:border-slate-300 hover:bg-slate-50 rounded-2xl text-left transition-all duration-300 group shadow-sm hover:shadow-md">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <ShieldAlert className="w-6 h-6 text-slate-600" />
                            </div>
                            <div className="font-bold text-slate-800 text-sm mb-1">Behavioral Reports</div>
                            <div className="text-xs text-slate-500 font-medium">Review active incidents</div>
                        </Link>
                        <Link to="/admissions" className="block p-5 border border-slate-100 bg-slate-50 hover:border-slate-300 hover:bg-slate-50 rounded-2xl text-left transition-all duration-300 group shadow-sm hover:shadow-md">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <CreditCard className="w-6 h-6 text-slate-600" />
                            </div>
                            <div className="font-bold text-slate-800 text-sm mb-1">Admission</div>
                            <div className="text-xs text-slate-500 font-medium">Revenue: ¢45,200</div>
                        </Link>
                        <button className="block p-5 border border-slate-100 bg-slate-50 hover:border-slate-300 hover:bg-slate-50 rounded-2xl text-left transition-all duration-300 group shadow-sm hover:shadow-md">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Layout className="w-6 h-6 text-slate-600" />
                            </div>
                            <div className="font-bold text-slate-800 text-sm mb-1">Quizzes</div>
                            <div className="text-xs text-slate-500 font-medium">Manage student quizzes</div>
                        </button>
                        <button className="block p-5 border border-slate-100 bg-slate-50 hover:border-slate-300 hover:bg-slate-50 rounded-2xl text-left transition-all duration-300 group shadow-sm hover:shadow-md">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Layout className="w-6 h-6 text-slate-600" />
                            </div>
                            <div className="font-bold text-slate-800 text-sm mb-1">Class Activities</div>
                            <div className="text-xs text-slate-500 font-medium">Review class activities</div>
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
