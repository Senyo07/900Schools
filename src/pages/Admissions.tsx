import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { ToggleRight, ToggleLeft, Info, Plus, Trash2, GraduationCap, BookOpen, Settings } from 'lucide-react';

const Admissions = () => {
    // State configuration identical to what was in WebsiteDesign + new additions
    const [policyText, setPolicyText] = useState('We are currently accepting applications for the 2026/2027 academic year. Please ensure all documents are original and verified.');
    const [isCollectionEnabled, setIsCollectionEnabled] = useState(true);
    const [feeAmount, setFeeAmount] = useState('150');

    // New configuration arrays for Programs and Grade Levels
    const [programs, setPrograms] = useState(['General Science', 'General Arts', 'Business', 'Home Economics']);
    const [newProgram, setNewProgram] = useState('');

    const [gradeLevels, setGradeLevels] = useState(['JHS 1', 'JHS 2', 'JHS 3', 'SHS 1', 'SHS 2', 'SHS 3']);
    const [newGradeLevel, setNewGradeLevel] = useState('');

    const handleAddProgram = () => {
        if (newProgram.trim() && !programs.includes(newProgram.trim())) {
            setPrograms([...programs, newProgram.trim()]);
            setNewProgram('');
        }
    };

    const handleRemoveProgram = (program: string) => {
        setPrograms(programs.filter(p => p !== program));
    };

    const handleAddGradeLevel = () => {
        if (newGradeLevel.trim() && !gradeLevels.includes(newGradeLevel.trim())) {
            setGradeLevels([...gradeLevels, newGradeLevel.trim()]);
            setNewGradeLevel('');
        }
    };

    const handleRemoveGradeLevel = (grade: string) => {
        setGradeLevels(gradeLevels.filter(g => g !== grade));
    };

    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Admissions Processing</h1>
                    <p className="text-slate-500 text-sm mt-1">Configure your digital intake forms and available programs.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
                        <Settings className="w-4 h-4" /> Preferences
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                        Save Configurations
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Core Setup */}
                <div className="space-y-6">
                    {/* Policy Configuration */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-indigo-600" />
                                General Admissions Policy
                            </h2>
                        </div>
                        <div className="p-6 bg-slate-50">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Instructions for Applicants</label>
                            <textarea
                                rows={4}
                                value={policyText}
                                onChange={(e) => setPolicyText(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none shadow-sm"
                                placeholder="Detail how you accept admissions..."
                            />
                        </div>
                    </div>

                    {/* Financial Configuration */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">Collect Application Fees</h2>
                                <p className="text-xs text-slate-500 mt-1">Accept digital payments via your school portal.</p>
                            </div>
                            <button
                                onClick={() => setIsCollectionEnabled(!isCollectionEnabled)}
                                className={`${isCollectionEnabled ? 'text-indigo-600' : 'text-slate-300'} hover:opacity-80 transition-opacity drop-shadow-sm`}
                            >
                                {isCollectionEnabled ? <ToggleRight className="w-12 h-12" /> : <ToggleLeft className="w-12 h-12" />}
                            </button>
                        </div>

                        {isCollectionEnabled && (
                            <div className="p-6 bg-slate-50 space-y-4 animate-in fade-in">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Admission Fee Amount</label>
                                    <div className="flex w-full max-w-[300px] shadow-sm rounded-xl border border-slate-300 overflow-hidden bg-white focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent">
                                        <span className="flex items-center justify-center px-4 bg-slate-100 text-slate-600 font-bold border-r border-slate-200">GHS</span>
                                        <input
                                            type="number"
                                            value={feeAmount}
                                            onChange={e => setFeeAmount(e.target.value)}
                                            className="w-full px-4 py-2.5 focus:outline-none text-base font-semibold text-slate-800"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 bg-sky-50 text-sky-800 rounded-xl border border-sky-200 text-sm mt-4">
                                    <Info className="w-5 h-5 shrink-0 mt-0.5 text-sky-600" />
                                    <div className="space-y-2 leading-relaxed">
                                        <p>
                                            <strong>Implementation Note:</strong> Activating this enables a full application intake form on your live website.
                                        </p>
                                        <p>
                                            You must negotiate the application fee split with the <strong>900Schools Super Admin</strong>.
                                            All payments are processed centrally through the 900Schools gateway before disbursement.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Dynamic Lists */}
                <div className="space-y-6">
                    {/* Programs Offered */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full max-h-[400px]">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-emerald-600" />
                                Programs Offered
                            </h2>
                        </div>
                        <div className="p-4 bg-slate-50 border-b border-slate-100 shrink-0">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newProgram}
                                    onChange={e => setNewProgram(e.target.value)}
                                    placeholder="e.g. Visual Arts..."
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddProgram()}
                                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                                />
                                <button
                                    onClick={handleAddProgram}
                                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition shadow-sm flex items-center gap-1"
                                >
                                    <Plus className="w-4 h-4" /> Add
                                </button>
                            </div>
                        </div>
                        <div className="p-4 overflow-y-auto flex-1 bg-white">
                            <ul className="space-y-2 pr-2">
                                {programs.map((prog, i) => (
                                    <li key={i} className="flex justify-between items-center p-3 bg-slate-50 hover:bg-emerald-50/50 transition-colors rounded-xl border border-slate-100 group">
                                        <span className="font-semibold text-slate-700 text-sm">{prog}</span>
                                        <button
                                            onClick={() => handleRemoveProgram(prog)}
                                            className="text-slate-400 group-hover:text-red-500 bg-white group-hover:bg-red-50 p-1.5 rounded-lg border border-slate-200 group-hover:border-red-100 transition-all shadow-sm"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </li>
                                ))}
                                {programs.length === 0 && (
                                    <li className="text-center py-4 text-slate-400 text-sm">No programs configured.</li>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Grade Levels */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full max-h-[400px]">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-rose-500" />
                                Open Grade Levels
                            </h2>
                        </div>
                        <div className="p-4 bg-slate-50 border-b border-slate-100 shrink-0">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newGradeLevel}
                                    onChange={e => setNewGradeLevel(e.target.value)}
                                    placeholder="e.g. Primary 1..."
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddGradeLevel()}
                                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm"
                                />
                                <button
                                    onClick={handleAddGradeLevel}
                                    className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700 transition shadow-sm flex items-center gap-1"
                                >
                                    <Plus className="w-4 h-4" /> Add
                                </button>
                            </div>
                        </div>
                        <div className="p-4 overflow-y-auto flex-1 bg-white">
                            <ul className="space-y-2 pr-2">
                                {gradeLevels.map((grade, i) => (
                                    <li key={i} className="flex justify-between items-center p-3 bg-slate-50 hover:bg-rose-50/50 transition-colors rounded-xl border border-slate-100 group">
                                        <span className="font-semibold text-slate-700 text-sm">{grade}</span>
                                        <button
                                            onClick={() => handleRemoveGradeLevel(grade)}
                                            className="text-slate-400 group-hover:text-red-500 bg-white group-hover:bg-red-50 p-1.5 rounded-lg border border-slate-200 group-hover:border-red-100 transition-all shadow-sm"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </li>
                                ))}
                                {gradeLevels.length === 0 && (
                                    <li className="text-center py-4 text-slate-400 text-sm">No grade levels open for admission.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Admissions;
