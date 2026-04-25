import React from 'react';
import {
    LayoutDashboard, Users, UserSquare2, Settings,
    LogOut, Bell, LayoutTemplate, Palette
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const sidebarLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Students', path: '/students', icon: <Users className="w-5 h-5" /> },
    { name: 'Teacher Portal', path: '/teacher', icon: <UserSquare2 className="w-5 h-5" /> },
    { name: 'Website Design', path: '/website-design', icon: <Palette className="w-5 h-5" /> }, // Shared route for mockup
    { name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">

            {/* Sidebar */}
            <aside className="w-64 bg-slate-950 text-slate-300 flex flex-col hidden md:flex fixed h-full z-20">
                <div className="h-20 flex items-center px-6 border-b border-white/5">
                    <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        900Schools
                    </Link>
                </div>

                <div className="flex-1 py-6 px-4 space-y-2">
                    {sidebarLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-indigo-500/10 text-indigo-400'
                                    : 'hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {link.icon}
                                <span className="font-medium">{link.name}</span>
                            </Link>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-white/5">
                    <Link to="/auth" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:text-white transition-all text-slate-400">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                {/* Top Navbar */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
                    <h1 className="text-2xl font-bold text-slate-800 capitalize">
                        {location.pathname.replace('/', '') || 'Dashboard'}
                    </h1>

                    <div className="flex items-center gap-6">
                        <button className="relative w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 border-2 border-slate-100"></span>
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold shadow-md">
                                AD
                            </div>
                            <div className="hidden lg:block">
                                <p className="text-sm font-semibold text-slate-800">Admin User</p>
                                <p className="text-xs text-slate-500">Lincoln High School</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-8">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>

        </div>
    );
};

export default DashboardLayout;
