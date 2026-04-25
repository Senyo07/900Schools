import React, { useState } from 'react';
import { UploadCloud, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdmissionsForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 2000);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-12 px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl text-center border border-slate-100 animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Application Received!</h2>
                    <p className="text-slate-600 mb-8">Your application and payment of GHS 150 have been processed securely. We will contact you soon with the next steps.</p>
                    <Link to="/" className="inline-block bg-slate-100 text-slate-700 font-medium px-6 py-3 rounded-lg hover:bg-slate-200 transition">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
            <div className="w-full max-w-3xl mb-8 flex flex-col items-center">
                <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-4">LHS</div>
                <h1 className="text-xl font-bold text-slate-800">Lincoln High School</h1>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-3xl border border-slate-200 rounded-2xl bg-white shadow-xl overflow-hidden text-left">
                <div className="bg-blue-50 border-b border-blue-100 p-8 text-center">
                    <h3 className="text-2xl font-bold text-blue-800 mb-2">Student Admission Application</h3>
                    <p className="text-blue-700">Please fill out all required fields carefully.</p>
                </div>

                <div className="p-8 space-y-8">
                    <div className="space-y-4">
                        <h4 className="text-base font-semibold text-slate-800 border-b pb-2">1. Student Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                                <input required placeholder="E.g., John Doe" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth *</label>
                                <input required type="date" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Previous School Attended (If any)</label>
                                <input placeholder="School name" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Upload Profile Picture (Portrait) *</label>
                                <label className="block w-full border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 cursor-pointer transition">
                                    <input type="file" required accept="image/*" className="hidden" />
                                    <span className="text-sm text-blue-600 font-medium">Click to browse</span>
                                    <span className="text-xs text-slate-500 block mt-1">PNG, JPG up to 5MB</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-base font-semibold text-slate-800 border-b pb-2">2. Parent / Guardian Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Guardian Full Name *</label>
                                <input required placeholder="E.g., Jane Doe" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                                <input required type="tel" placeholder="+233..." className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address (Optional)</label>
                                <input type="email" placeholder="email@example.com" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Residential Address *</label>
                                <textarea required rows={3} placeholder="Full address" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-base font-semibold text-slate-800 border-b pb-2">3. Academic Documents</h4>
                        <label className="block w-full border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer transition">
                            <UploadCloud className="w-8 h-8 mb-3 text-slate-400" />
                            <input type="file" multiple className="hidden" />
                            <span className="text-sm font-medium text-blue-600">Click to upload transcripts and certificates</span>
                            <span className="text-xs mt-1 text-slate-400">PDF, JPG, PNG up to 10MB per file</span>
                        </label>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-lg shadow-md hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-70"
                        >
                            {isSubmitting ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                "Pay GHS 150 & Submit Application"
                            )}
                        </button>
                        <p className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1">
                            Secure payment processed by <span className="font-semibold text-slate-600">900Schools</span>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdmissionsForm;
