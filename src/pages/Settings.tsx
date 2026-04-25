import React, { useState } from 'react';
import { Mail, Lock, Phone, Save, ShieldAlert } from 'lucide-react';

const Settings = () => {
    const [email, setEmail] = useState('admin@lincolnhigh.edu');
    const [contactNumber, setContactNumber] = useState('+1 (555) 019-8231');

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [toastMessage, setToastMessage] = useState('');

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const handleUpdateEmail = (e: React.FormEvent) => {
        e.preventDefault();
        showToast('Email successfully updated.');
    };

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        showToast('Password successfully updated.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleUpdateContact = (e: React.FormEvent) => {
        e.preventDefault();
        showToast('Super Admin contact number updated.');
    };

    return (
        <div className="max-w-4xl space-y-8 relative">
            {toastMessage && (
                <div className="fixed bottom-8 right-8 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-xl font-medium animate-in slide-in-from-bottom-5 z-50">
                    {toastMessage}
                </div>
            )}

            <div>
                <h1 className="text-3xl font-black text-slate-800 mb-2">Account Settings</h1>
                <p className="text-slate-500">Manage your school admin account credentials and contact details.</p>
            </div>

            {/* Email Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                        <Mail className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Email Address</h2>
                        <p className="text-sm text-slate-500">This email is used to log in to your dashboard.</p>
                    </div>
                </div>
                <form onSubmit={handleUpdateEmail} className="p-6 bg-slate-50/50">
                    <div className="max-w-md">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Administrator Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all mb-4"
                            required
                        />
                        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors">
                            <Save className="w-4 h-4" /> Save Email
                        </button>
                    </div>
                </form>
            </div>

            {/* Password Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-start gap-4">
                    <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center shrink-0">
                        <Lock className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Security & Password</h2>
                        <p className="text-sm text-slate-500">Ensure your account is using a long, random password to stay secure.</p>
                    </div>
                </div>
                <form onSubmit={handleUpdatePassword} className="p-6 bg-slate-50/50">
                    <div className="max-w-md space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                                required
                            />
                        </div>
                        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors mt-2">
                            <Save className="w-4 h-4" /> Update Password
                        </button>
                    </div>
                </form>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                        <Phone className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-slate-800">Super Admin Contact</h2>
                        <p className="text-sm text-slate-500">Provide a direct line so the 900Schools team can reach you regarding important updates or issues.</p>
                    </div>
                    <div className="hidden sm:flex items-center text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                        <ShieldAlert className="w-3 h-3 mr-1" />
                        Private
                    </div>
                </div>
                <form onSubmit={handleUpdateContact} className="p-6 bg-slate-50/50">
                    <div className="max-w-md">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Direct Phone Number</label>
                        <input
                            type="text"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all mb-4"
                            required
                        />
                        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors">
                            <Save className="w-4 h-4" /> Save Contact Info
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Settings;
