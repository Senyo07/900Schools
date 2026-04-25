import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Camera, AlertTriangle, CheckCircle2, Clock, MapPin, Search, Mic, Sparkles, Send, Users, ChevronDown } from 'lucide-react';

const mockStudents = [
    { id: 1, name: 'Alex Johnson', status: null as string | null, comment: '' },
    { id: 2, name: 'Maria Garcia', status: 'P' as string | null, comment: '' },
    { id: 3, name: 'James Smith', status: null as string | null, comment: '' },
    { id: 4, name: 'Linda Kim', status: 'A' as string | null, comment: '' },
];

const TeacherPortal = () => {
    const [activeTab, setActiveTab] = useState<'attendance' | 'behavior'>('attendance');
    const [attendanceMode, setAttendanceMode] = useState<'scan' | 'manual'>('scan');
    const [reportInputMode, setReportInputMode] = useState<'scan' | 'search'>('scan');
    const [reportText, setReportText] = useState('');
    const [isPolishing, setIsPolishing] = useState(false);

    const [students, setStudents] = useState(mockStudents);
    const [lateStudentId, setLateStudentId] = useState<number | null>(null);
    const [lateComment, setLateComment] = useState('');

    const handleAttendanceAction = (studentId: number, status: 'P' | 'A' | 'L') => {
        if (status === 'L') {
            setLateStudentId(studentId);
            setLateComment('');
            return;
        }

        setStudents(students.map(s => s.id === studentId ? { ...s, status } : s));
        if (lateStudentId === studentId) setLateStudentId(null);
    };

    const handleSaveLate = (studentId: number) => {
        if (!lateComment.trim()) return;
        setStudents(students.map(s => s.id === studentId ? { ...s, status: 'L', comment: lateComment } : s));
        setLateStudentId(null);
    };

    // Mock function to simulate AI polish
    const handlePolish = () => {
        if (!reportText) return;
        setIsPolishing(true);
        setTimeout(() => {
            setReportText("Alex continuously disrupted the mathematics lesson today by speaking out of turn and throwing small objects across the classroom. Despite multiple formal warnings to cease the behavior, Alex refused to comply and challenged the teacher's authority in front of peers.");
            setIsPolishing(false);
        }, 1500);
    };

    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Mobile Mockup Area for Teacher App Simulation */}
                <div className="lg:col-span-1 flex flex-col items-center">
                    <div className="w-[320px] h-[640px] bg-slate-900 rounded-[3rem] border-[10px] border-slate-800 p-4 relative shadow-2xl overflow-hidden shadow-slate-500/10">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-20"></div>

                        {/* Screen Content */}
                        <div className="bg-slate-50 w-full h-full rounded-2xl overflow-hidden flex flex-col relative z-10 font-sans">

                            <div className="bg-slate-700 text-white p-6 pb-8 rounded-b-3xl shadow-sm z-10">
                                <div className="mt-4 flex justify-between items-center mb-6">
                                    <div>
                                        <p className="text-slate-200 text-xs font-medium uppercase tracking-wider">Behavioral Reports</p>
                                        <h2 className="font-bold text-xl">Good Morning, Mr. Cole</h2>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-slate-500 border-2 border-slate-400"></div>
                                </div>

                                <div className="flex bg-slate-900/30 rounded-lg p-1 backdrop-blur-sm">
                                    <button
                                        onClick={() => setActiveTab('attendance')}
                                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'attendance' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-100 hover:text-white'}`}
                                    >
                                        Attendance
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('behavior')}
                                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'behavior' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-100 hover:text-white'}`}
                                    >
                                        Report
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto px-4 py-6 -mt-4 bg-slate-50">
                                {activeTab === 'attendance' ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm">
                                            <div className="flex items-center gap-2 text-slate-700 font-medium text-sm">
                                                <Users className="w-4 h-4 text-slate-600" />
                                                SHS 1 Math
                                            </div>
                                            <ChevronDown className="w-4 h-4 text-slate-400" />
                                        </div>

                                        <div className="flex rounded-md bg-slate-200/60 p-1">
                                            <button
                                                onClick={() => setAttendanceMode('scan')}
                                                className={`flex-1 text-xs font-medium py-1.5 rounded ${attendanceMode === 'scan' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-500'}`}
                                            >
                                                Scan QR
                                            </button>
                                            <button
                                                onClick={() => setAttendanceMode('manual')}
                                                className={`flex-1 text-xs font-medium py-1.5 rounded ${attendanceMode === 'manual' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-500'}`}
                                            >
                                                Manual
                                            </button>
                                        </div>

                                        {attendanceMode === 'scan' ? (
                                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center py-10 gap-4 mt-2">
                                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors hover:scale-105 active:scale-95">
                                                    <Camera className="w-8 h-8" />
                                                </div>
                                                <div className="text-center">
                                                    <p className="font-semibold text-slate-800 mb-1">Scan Student QR</p>
                                                    <p className="text-xs text-slate-500">Tap icon to open camera</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-3 mt-2">
                                                {students.map(student => (
                                                    <div key={student.id} className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm flex flex-col gap-2 relative">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-7 h-7 bg-slate-200 rounded-full"></div>
                                                                <span className="text-sm font-bold text-slate-700">{student.name}</span>
                                                            </div>
                                                            <div className="flex border border-slate-200 rounded-lg overflow-hidden shrink-0">
                                                                <button
                                                                    onClick={() => handleAttendanceAction(student.id, 'P')}
                                                                    className={`w-8 h-8 text-xs font-bold transition-colors ${student.status === 'P' ? 'bg-green-500 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'} border-r border-slate-200`}
                                                                >P</button>
                                                                <button
                                                                    onClick={() => handleAttendanceAction(student.id, 'A')}
                                                                    className={`w-8 h-8 text-xs font-bold transition-colors ${student.status === 'A' ? 'bg-red-500 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'} border-r border-slate-200`}
                                                                >A</button>
                                                                <button
                                                                    onClick={() => handleAttendanceAction(student.id, 'L')}
                                                                    className={`w-8 h-8 text-xs font-bold transition-colors ${student.status === 'L' ? 'bg-white text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                                                                >L</button>
                                                            </div>
                                                        </div>

                                                        {/* Late Comment Input */}
                                                        {lateStudentId === student.id && student.status !== 'L' && (
                                                            <div className="mt-2 flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Time arrived / Reason..."
                                                                    className="flex-1 text-xs px-2 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-white"
                                                                    value={lateComment}
                                                                    onChange={(e) => setLateComment(e.target.value)}
                                                                    autoFocus
                                                                />
                                                                <button
                                                                    onClick={() => handleSaveLate(student.id)}
                                                                    className="px-3 py-1.5 bg-white text-white text-xs font-bold rounded"
                                                                >Save</button>
                                                            </div>
                                                        )}

                                                        {student.status === 'L' && student.comment && (
                                                            <div className="bg-slate-50 px-2 py-1 text-xs text-slate-700 rounded flex gap-1 items-center">
                                                                <Clock className="w-3 h-3" />
                                                                {student.comment}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                                <button className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold transition-colors">
                                                    Save Attendance
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex rounded-md bg-slate-200/60 p-1">
                                            <button
                                                onClick={() => setReportInputMode('search')}
                                                className={`flex-1 text-xs font-medium py-1.5 rounded ${reportInputMode === 'search' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-500'}`}
                                            >
                                                Search Name
                                            </button>
                                            <button
                                                onClick={() => setReportInputMode('scan')}
                                                className={`flex-1 text-xs font-medium py-1.5 rounded ${reportInputMode === 'scan' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-500'}`}
                                            >
                                                Scan QR
                                            </button>
                                        </div>

                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 space-y-4 mt-2">
                                            {reportInputMode === 'scan' ? (
                                                <div className="flex flex-col items-center justify-center py-6 gap-3">
                                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors hover:scale-105 active:scale-95">
                                                        <Camera className="w-6 h-6" />
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-sm font-semibold text-slate-800 mb-0.5">Scan Student QR</p>
                                                        <p className="text-[10px] text-slate-500">Tap to open camera array</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <label className="text-xs font-semibold text-slate-600 mb-1 block">Student Name or ID</label>
                                                    <div className="relative">
                                                        <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                                                        <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-1 focus:ring-slate-500 focus:outline-none" placeholder="Search..." />
                                                    </div>
                                                </div>
                                            )}

                                            <div>
                                                <label className="text-xs font-semibold text-slate-600 mb-1 block">Incident Type</label>
                                                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-slate-500 focus:outline-none text-slate-700">
                                                    <option>Disruption</option>
                                                    <option>Tardiness</option>
                                                    <option>Insubordination</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>

                                            <button className="w-full py-2.5 bg-white hover:bg-slate-600 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                                                <AlertTriangle className="w-4 h-4" />
                                                Log Incident
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

                {/* Desktop Interface for Behavior Polishing & Workflow */}
                <div className="lg:col-span-2 space-y-6 flex flex-col h-full">

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h2 className="text-xl font-bold text-slate-800 mb-2">Behavior Workflow & AI Polish</h2>
                        <p className="text-slate-500 text-sm mb-6">Review raw teacher reports, use AI to professionalize the tone, and forward standard notices to parents/management.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-semibold text-slate-800 mb-1.5 block">Student Name or ID</label>
                                    <div className="relative">
                                        <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                                        <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none transition-all placeholder:text-slate-400" placeholder="e.g. Alex Johnson or 900-1204" />
                                    </div>
                                </div>
                                <div className="space-y-3 relative">
                                    <label className="font-semibold text-slate-800 text-sm flex items-center justify-between">
                                        <span>Raw Teacher Input</span>
                                        <button className="text-slate-600 hover:bg-slate-50 p-1.5 rounded-full transition-colors" title="Dictate">
                                            <Mic className="w-4 h-4" />
                                        </button>
                                    </label>
                                    <textarea
                                        className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none text-slate-700 leading-relaxed placeholder:text-slate-400"
                                        placeholder="Type or dictate the rough description of what happened..."
                                        value={reportText}
                                        onChange={(e) => setReportText(e.target.value)}
                                    ></textarea>

                                    <div className="flex justify-end mt-2">
                                        <button
                                            onClick={handlePolish}
                                            disabled={isPolishing || !reportText}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm ${isPolishing || !reportText
                                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                                : 'bg-slate-600 text-white hover:bg-slate-700 hover:shadow-slate-500/20'
                                                }`}
                                        >
                                            {isPolishing ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin"></div>
                                                    Polishing...
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="w-4 h-4" />
                                                    AI Polish Report
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="font-semibold text-slate-800 text-sm block h-7 flex items-end">
                                    Professional Output
                                </label>
                                <div className="w-full h-40 bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-800 relative shadow-inner overflow-y-auto leading-relaxed">
                                    {reportText && !isPolishing ? reportText : (
                                        <span className="text-slate-400 italic">Polished output will appear here...</span>
                                    )}
                                    {isPolishing && (
                                        <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex items-center justify-center">
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce"></div>
                                                <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                                                <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end gap-3 mt-2">
                                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
                                        Flag Internally
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm">
                                        <Send className="w-4 h-4" />
                                        Notify Parents (WhatsApp)
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex-1">
                        <h3 className="font-semibold text-slate-800 mb-4">Live Incident Feed</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((idx) => (
                                <div key={idx} className="flex gap-4 p-4 border border-slate-100 rounded-xl bg-slate-50">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                                        <AlertTriangle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm">Disruption — SHS 1 Math</h4>
                                        <p className="text-xs text-slate-500 mb-2 flex items-center gap-3 mt-1">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 10 mins ago</span>
                                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Room 402</span>
                                            <span className="px-2 py-0.5 rounded bg-slate-200 text-xs font-medium text-slate-700">Pending Review</span>
                                        </p>
                                        <p className="text-sm text-slate-600 line-clamp-2">
                                            Alex continuously disrupted the mathematics lesson today by speaking out of turn...
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </DashboardLayout>
    );
};

export default TeacherPortal;
