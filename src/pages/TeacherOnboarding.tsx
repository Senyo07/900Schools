import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle, Image as ImageIcon, User, BookOpen, FileText } from 'lucide-react';

const TeacherOnboarding = () => {
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        description: '',
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call to submit teacher profile
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
                <div className="bg-white max-w-md w-full rounded-2xl p-8 shadow-xl text-center border border-slate-100">
                    <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">Profile Submitted!</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed">Thank you, {formData.name || 'Teacher'}! Your profile details have been sent to the school administration for approval and inclusion on the website.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-colors"
                    >
                        Submit Another Profile
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Teacher Onboarding</h1>
                    <p className="text-slate-600 text-sm max-w-sm mx-auto">Please fill out the form below. Once approved, your profile will be featured on the school website.</p>
                </div>

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-blue-700 mb-4 flex items-center gap-2">
                                <ImageIcon className="w-4 h-4" /> Profile Photo
                            </h3>
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                <div className="h-32 w-32 shrink-0 rounded-2xl border-4 border-slate-50 shadow-sm bg-slate-100 overflow-hidden flex items-center justify-center text-slate-300">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-12 h-12 opacity-30" />
                                    )}
                                </div>
                                <div className="flex flex-col flex-1 items-center sm:items-start space-y-3">
                                    <p className="text-xs text-slate-500 text-center sm:text-left leading-relaxed max-w-xs">Upload a professional, clear headshot with a neutral background. Maximum size 5MB.</p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-700 hover:border-blue-300 transition-all shadow-sm"
                                    >
                                        <UploadCloud className="w-4 h-4" /> Select Image
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-blue-700 mb-6 flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Personal Details
                            </h3>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                                        <User className="w-4 h-4 text-blue-600" /> Full Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Dr. Sarah Jenkins"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-800"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                                        <BookOpen className="w-4 h-4 text-blue-600" /> Subject(s) Taught
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Advanced Mathematics & Physics"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-800"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-blue-600" /> Brief Biography
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="Share your teaching philosophy, experience, and what makes your classes unique..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-800 resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg disabled:bg-blue-400 flex items-center justify-center"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Submitting Profile...</span>
                                    </div>
                                ) : (
                                    'Submit Profile for Review'
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-8 text-center text-xs text-slate-400">
                    <p>Secured by 900Schools Platform</p>
                </div>
            </div>
        </div>
    );
};

export default TeacherOnboarding;
