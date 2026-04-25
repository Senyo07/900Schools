import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { IdGeneratorModal } from '../components/IdGeneratorModal';
import { Upload, Plus, Download, QrCode, User as UserIcon, Search, Trash2, Edit2, Phone, Mail, ShieldAlert, AlertTriangle, X, Award, Activity } from 'lucide-react';

export type Student = {
    id: string;
    name: string;
    grade: string;
    status: string;
    guardian: { name: string; relation: string; phone: string; email: string };
};

const initialStudents: Student[] = [
    { id: 'STU-26-001', name: 'Alex Johnson', grade: 'SHS 1', status: 'Active', guardian: { name: 'Sarah Johnson', relation: 'Mother', phone: '+233 24 123 4567', email: 'sarah.j@email.com' } },
    { id: 'STU-26-002', name: 'Maria Garcia', grade: 'SHS 2', status: 'Active', guardian: { name: 'Carlos Garcia', relation: 'Father', phone: '+233 55 987 6543', email: 'carlos.g@email.com' } },
    { id: 'STU-26-003', name: 'James Smith', grade: 'JHS 3', status: 'Active', guardian: { name: 'Michael Smith', relation: 'Father', phone: '+233 20 444 5555', email: 'mike.smith@email.com' } },
    { id: 'STU-26-004', name: 'Linda Kim', grade: 'SHS 3', status: 'Active', guardian: { name: 'David Kim', relation: 'Father', phone: '+233 24 777 8888', email: 'david.k@email.com' } },
    { id: 'STU-26-005', name: 'David Chen', grade: 'SHS 1', status: 'Active', guardian: { name: 'Emily Chen', relation: 'Mother', phone: '+233 27 222 3333', email: 'emily.c@email.com' } },
];

const Students = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState(initialStudents);
    const [classLevels, setClassLevels] = useState(['SHS 1', 'SHS 2', 'SHS 3', 'JHS 1', 'JHS 2', 'JHS 3']);

    // Modals & States
    const [isManageClassesModalOpen, setIsManageClassesModalOpen] = useState(false);
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    // ID Generator Modal State
    const [idModalConfig, setIdModalConfig] = useState<{ isOpen: boolean, student: Student | null, isBatch: boolean }>({
        isOpen: false,
        student: null,
        isBatch: false
    });

    const [editStudent, setEditStudent] = useState<Student | null>(null);
    const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'behavior'>('overview');

    // Form States
    const [newLevelName, setNewLevelName] = useState('');
    const [newStudent, setNewStudent] = useState({ name: '', grade: 'SHS 1' });

    const handleAddClassLevel = () => {
        if (newLevelName.trim() && !classLevels.includes(newLevelName.trim())) {
            setClassLevels([...classLevels, newLevelName.trim()]);
            setNewLevelName('');
        }
    };

    const handleRemoveClassLevel = (level: string) => {
        setClassLevels(classLevels.filter(c => c !== level));
    };

    const handleAddStudent = () => {
        if (newStudent.name.trim()) {
            const id = `STU-26-${(students.length + 1).toString().padStart(3, '0')}`;
            setStudents([...students, { id, name: newStudent.name, grade: newStudent.grade, status: 'Active', guardian: { name: 'Not Provided', relation: 'N/A', phone: 'N/A', email: 'N/A' } }]);
            setIsAddStudentModalOpen(false);
            setNewStudent({ name: '', grade: classLevels[0] || 'SHS 1' });
        }
    };

    const handleGenerateQR = () => {
        setIdModalConfig({ isOpen: true, student: null, isBatch: true });
    };

    const handleDownloadBadge = () => {
        setIsDownloading(true);
        setTimeout(() => setIsDownloading(false), 2000);
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8 h-full">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
                        />
                    </div>

                    <div className="flex gap-3 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium">
                            <Upload className="w-4 h-4 text-slate-500" />
                            Import CSV
                        </button>
                        <button
                            onClick={() => setIsManageClassesModalOpen(true)}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium"
                        >
                            <Plus className="w-4 h-4 text-slate-500" />
                            Manage Class Levels
                        </button>
                        <button
                            onClick={() => setIsAddStudentModalOpen(true)}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
                        >
                            <Plus className="w-4 h-4" />
                            Add Student
                        </button>
                    </div>
                </div>

                {/* Setup Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-6 rounded-2xl shadow-md text-white border border-indigo-400/30 flex items-center gap-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
                        <div className="bg-white/20 p-4 rounded-xl backdrop-blur-md">
                            <QrCode className="w-8 h-8 text-indigo-50" />
                        </div>
                        <div className="z-10 relative">
                            <h3 className="text-xl font-bold mb-1">Batch Generate QR IDs</h3>
                            <p className="text-indigo-100 text-sm max-w-sm mb-4">Automatically generate unique QR codes for all enrolled students.</p>
                            <button
                                onClick={handleGenerateQR}
                                className="px-4 py-2 bg-white text-indigo-700 font-semibold rounded-lg text-sm hover:bg-indigo-50 transition-colors shadow-sm disabled:opacity-80"
                            >
                                Generate All
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-6">
                        <div className="bg-slate-100 p-4 rounded-xl text-slate-500">
                            <Download className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-800 mb-1">Print Batch IDs</h3>
                            <p className="text-slate-500 text-sm mb-4">Export printable canvas forms with names, photos, and standard QR codes.</p>
                            <button
                                onClick={handleDownloadBadge}
                                disabled={isDownloading}
                                className="px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg text-sm hover:bg-slate-50 transition-colors disabled:bg-slate-100"
                            >
                                {isDownloading ? 'Preparing PDF...' : 'Download PDF'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Student Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-1">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <h3 className="font-semibold text-slate-800">Student Roster</h3>
                        <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">Total: {students.length}</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                                    <th className="px-6 py-3 font-medium">Student Name</th>
                                    <th className="px-6 py-3 font-medium">ID Number</th>
                                    <th className="px-6 py-3 font-medium">Grade Level</th>
                                    <th className="px-6 py-3 font-medium">Status</th>
                                    <th className="px-6 py-3 font-medium">QR State</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students
                                    .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((student) => (
                                        <tr key={student.id} onClick={() => { setViewingStudent(student); setActiveTab('overview'); }} className="cursor-pointer border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                                                        <UserIcon className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-medium text-slate-800">{student.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 text-sm">{student.id}</td>
                                            <td className="px-6 py-4 text-slate-600 text-sm">{student.grade}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                                                ${student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                                            `}>
                                                    {student.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-indigo-600">
                                                <div className="flex items-center gap-1.5 text-sm font-medium">
                                                    <QrCode className="w-4 h-4" /> Generated
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* Manage Classes Modal */}
            {isManageClassesModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden p-6 relative">
                        <button onClick={() => setIsManageClassesModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">&times;</button>
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Manage Class Levels</h2>
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={newLevelName}
                                onChange={e => setNewLevelName(e.target.value)}
                                placeholder="e.g. Nursery 1"
                                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button onClick={handleAddClassLevel} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition">Add</button>
                        </div>
                        <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                            {classLevels.map((level, i) => (
                                <li key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <span className="font-medium text-slate-700 text-sm">{level}</span>
                                    <button onClick={() => handleRemoveClassLevel(level)} className="text-red-500 hover:text-red-600 bg-red-50 p-1.5 rounded-md">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Add Student Modal */}
            {isAddStudentModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden p-6 relative">
                        <button onClick={() => setIsAddStudentModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">&times;</button>
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Add New Student</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Student Name</label>
                                <input
                                    type="text"
                                    value={newStudent.name}
                                    onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Class Level</label>
                                <select
                                    value={newStudent.grade}
                                    onChange={e => setNewStudent({ ...newStudent, grade: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                >
                                    {classLevels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
                                </select>
                            </div>
                            <button
                                onClick={handleAddStudent}
                                className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition mt-2"
                            >
                                Register Student
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Student Modal */}
            {editStudent && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden p-6 relative">
                        <button onClick={() => setEditStudent(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">&times;</button>
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Edit Student Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Student Name</label>
                                <input
                                    type="text"
                                    value={editStudent.name}
                                    onChange={e => setEditStudent({ ...editStudent, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Class Level</label>
                                <select
                                    value={editStudent.grade}
                                    onChange={e => setEditStudent({ ...editStudent, grade: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                >
                                    {classLevels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                                <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
                                    <button
                                        onClick={() => setEditStudent({ ...editStudent, status: 'Active' })}
                                        className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${editStudent.status === 'Active' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        Active
                                    </button>
                                    <button
                                        onClick={() => setEditStudent({ ...editStudent, status: 'Suspended' })}
                                        className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${editStudent.status === 'Suspended' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        Suspended
                                    </button>
                                    <button
                                        onClick={() => setEditStudent({ ...editStudent, status: 'Expelled' })}
                                        className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${editStudent.status === 'Expelled' ? 'bg-red-100 text-red-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        Expelled
                                    </button>
                                </div>
                            </div>

                            {(editStudent.status === 'Suspended' || editStudent.status === 'Expelled') && (
                                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Automated Parent Notification</label>
                                        <p className="text-xs text-slate-500 mb-2">This message will be sent via Email & WhatsApp to the registered parents/guardians.</p>
                                        <textarea
                                            readOnly
                                            className="w-full h-24 px-3 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg bg-white focus:outline-none"
                                            value={`Date: ${new Date().toLocaleDateString()}\n\nDear Parent/Guardian,\n\nThis is an official notification from the Administration that ${editStudent.name} has been ${editStudent.status.toLowerCase()} effective immediately.\n\nPlease contact the school office as soon as possible for further details.`}
                                        />
                                    </div>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" defaultChecked className="rounded text-indigo-600 focus:ring-indigo-500" />
                                        <span className="text-xs font-medium text-slate-700">Send notification upon saving</span>
                                    </label>
                                </div>
                            )}

                            <button
                                onClick={() => {
                                    setStudents(students.map(s => s.id === editStudent.id ? { ...s, name: editStudent.name, grade: editStudent.grade, status: editStudent.status } : s));
                                    setEditStudent(null);
                                }}
                                className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition mt-2"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Student Profile Modal */}
            {viewingStudent && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl flex flex-col max-h-[90vh]">

                        {/* Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-6 relative flex-shrink-0 rounded-t-2xl">
                            <button onClick={() => setViewingStudent(null)} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-white/10 p-1.5 rounded-full backdrop-blur-sm">
                                <X className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-5">
                                <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center text-white backdrop-blur-md shadow-lg">
                                    <UserIcon className="w-10 h-10" />
                                </div>
                                <div className="text-white">
                                    <h2 className="text-2xl font-bold mb-1">{viewingStudent.name}</h2>
                                    <div className="flex items-center gap-3 text-indigo-100 text-sm font-medium">
                                        <span>ID: {viewingStudent.id}</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-300"></span>
                                        <span>{viewingStudent.grade}</span>
                                    </div>
                                </div>
                                <div className="ml-auto mt-auto self-end">
                                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm backdrop-blur-md ${viewingStudent.status === 'Active' ? 'bg-blue-400/20 text-blue-100 border border-blue-400/30' : 'bg-red-400/20 text-red-100 border border-red-400/30'}`}>
                                        {viewingStudent.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-slate-200 px-6 pt-2 bg-slate-50/80 flex-shrink-0">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'overview' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
                            >
                                <UserIcon className="w-4 h-4" /> Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('behavior')}
                                className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'behavior' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
                            >
                                <Activity className="w-4 h-4" /> Behavior Report
                            </button>
                        </div>

                        {/* Content Scrollable Area */}
                        <div className="p-6 overflow-y-auto bg-slate-50 flex-1 rounded-b-2xl">
                            {activeTab === 'overview' && (
                                <div className="space-y-6">
                                    {/* Guardian Info */}
                                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                                        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                                            <ShieldAlert className="w-5 h-5 text-indigo-600" />
                                            <h3 className="font-bold text-slate-800">Guardian Information</h3>
                                        </div>
                                        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Primary Guardian</p>
                                                <p className="font-medium text-slate-800">{viewingStudent.guardian.name}</p>
                                                <p className="text-sm text-slate-500">{viewingStudent.guardian.relation}</p>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                                                        <Phone className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-0.5">Phone Number</p>
                                                        <p className="text-sm font-medium text-slate-700">{viewingStudent.guardian.phone}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                                                        <Mail className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-0.5">Email Address</p>
                                                        <p className="text-sm font-medium text-slate-700">{viewingStudent.guardian.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Shortcuts */}
                                    <div className="bg-indigo-50/50 rounded-xl border border-indigo-100 p-5 flex flex-col gap-4">
                                        <div>
                                            <h4 className="font-semibold text-indigo-900 text-sm mb-1">Quick Actions</h4>
                                            <p className="text-xs text-indigo-700/70">Manage {viewingStudent.name}'s profile, ID, or enrollment.</p>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            <button
                                                onClick={() => {
                                                    setViewingStudent(null);
                                                    setEditStudent(viewingStudent);
                                                }}
                                                className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-700 font-semibold text-sm rounded-lg shadow-sm border border-indigo-100 hover:bg-indigo-50 transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" /> Edit Details
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIdModalConfig({ isOpen: true, student: viewingStudent, isBatch: false });
                                                }}
                                                className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-700 font-semibold text-sm rounded-lg shadow-sm border border-indigo-100 hover:bg-indigo-50 transition-colors"
                                            >
                                                <QrCode className="w-4 h-4" />
                                                Generate ID
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setStudents(students.filter(s => s.id !== viewingStudent.id));
                                                    setViewingStudent(null);
                                                }}
                                                className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 font-semibold text-sm rounded-lg shadow-sm border border-rose-100 hover:bg-rose-100 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" /> Delete Student
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'behavior' && (
                                <div>
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-white rounded-xl p-5 border border-blue-200 flex items-center gap-4 shadow-sm shadow-blue-100/50 relative overflow-hidden group">
                                            <div className="absolute -right-4 -bottom-4 bg-blue-50 rounded-full w-24 h-24 group-hover:scale-110 transition-transform"></div>
                                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 relative z-10">
                                                <Award className="w-6 h-6" />
                                            </div>
                                            <div className="relative z-10">
                                                <span className="block text-3xl font-black text-blue-700 leading-none mb-1">5</span>
                                                <span className="text-xs font-bold text-blue-600/80 uppercase tracking-wider">Total Merits</span>
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-xl p-5 border border-rose-200 flex items-center gap-4 shadow-sm shadow-rose-100/50 relative overflow-hidden group">
                                            <div className="absolute -right-4 -bottom-4 bg-rose-50 rounded-full w-24 h-24 group-hover:scale-110 transition-transform"></div>
                                            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center shrink-0 relative z-10">
                                                <AlertTriangle className="w-6 h-6" />
                                            </div>
                                            <div className="relative z-10">
                                                <span className="block text-3xl font-black text-rose-700 leading-none mb-1">1</span>
                                                <span className="text-xs font-bold text-rose-600/80 uppercase tracking-wider">Total Demerits</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                                            <h3 className="font-bold text-slate-800">Recent Behavior Logs</h3>
                                        </div>
                                        <div className="divide-y divide-slate-100">
                                            <div className="p-5 hover:bg-slate-50 transition-colors">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-md uppercase tracking-wider border border-blue-200/50">
                                                        <Award className="w-3.5 h-3.5" /> Merit
                                                    </span>
                                                    <span className="text-xs font-medium text-slate-400">Oct 24, 2023</span>
                                                </div>
                                                <p className="text-sm font-medium text-slate-700">Helped clean up the laboratory after science experiments without being asked.</p>
                                                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1"><UserIcon className="w-3 h-3" /> Reported by Mr. Davis (Science)</p>
                                            </div>
                                            <div className="p-5 hover:bg-slate-50 transition-colors bg-red-50/20">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-md uppercase tracking-wider border border-rose-200/50">
                                                        <AlertTriangle className="w-3.5 h-3.5" /> Demerit
                                                    </span>
                                                    <span className="text-xs font-medium text-slate-400">Oct 12, 2023</span>
                                                </div>
                                                <p className="text-sm font-medium text-slate-700">Late to first period class.</p>
                                                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1"><UserIcon className="w-3 h-3" /> Reported by Mrs. Smith (Math)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <IdGeneratorModal
                isOpen={idModalConfig.isOpen}
                onClose={() => setIdModalConfig({ ...idModalConfig, isOpen: false })}
                student={idModalConfig.student}
                isBatch={idModalConfig.isBatch}
            />

        </DashboardLayout>
    );
};

export default Students;
