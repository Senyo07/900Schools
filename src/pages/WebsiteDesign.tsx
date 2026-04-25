import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Palette, Globe, UploadCloud, Layout, Maximize2, Image as ImageIcon, Sparkles, Plus, Trash2, Wand2, ImagePlus, Star, ToggleLeft, ToggleRight, Info, Users, ShieldAlert, CreditCard } from 'lucide-react';

const GallerySlider = ({ images }: { images: string[] }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (images.length > 1) {
            const timer = setInterval(() => {
                setIndex(prev => (prev + 1) % images.length);
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [images]);

    if (!images || images.length === 0) {
        return (
            <div className="relative h-40 w-full overflow-hidden bg-slate-100 flex items-center justify-center border-b border-slate-100">
                <span className="text-xs font-medium text-slate-400">No images</span>
            </div>
        );
    }

    return (
        <div className="relative h-40 w-full overflow-hidden bg-slate-100 border-b border-slate-100 group">
            <img src={images[index]} alt="Gallery slide" className="w-full h-full object-cover transition-opacity duration-500" />
            {images.length > 1 && (
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                    {images.map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`} />
                    ))}
                </div>
            )}
        </div>
    );
};

const WebsiteDesign = () => {
    const [primaryColor, setPrimaryColor] = useState('#059669'); // slate-600
    const [themeName, setThemeName] = useState('Modern Minimal');
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Banner Generator State
    const [isGeneratingBanner, setIsGeneratingBanner] = useState(false);
    const [bannerPrompt, setBannerPrompt] = useState('A vibrant science fair with students showcasing projects');
    const bannerSampleRef = useRef<HTMLInputElement>(null);

    const [modulesConfig, setModulesConfig] = useState<{
        schoolName: string;
        heroTitle: string;
        aboutText: string;
        eventsText: string;
        contactEmail: string;
        contactPhone: string;
        contactWhatsApp: string;
        galleryCategories: { id: string, name: string, description: string, images?: string[], thumbnail?: string | null }[];
        teacherProfiles: { id: string, name: string, subject: string, description: string, image: string | null }[];
        announcementBanner: string | null;
    }>({
        schoolName: 'Lincoln High School',
        heroTitle: 'Welcome to Our Institution',
        aboutText: 'Dedicated to fostering excellence and nurturing the leaders of tomorrow.',
        eventsText: 'Join us for our upcoming science fair next month!',
        contactEmail: 'info@school.edu',
        contactPhone: '+233 55 123 4567',
        contactWhatsApp: '+233 55 123 4567',
        galleryCategories: [
            {
                id: '1',
                name: 'Campus Life',
                description: 'Explore our vibrant campus and student activities.',
                images: [
                    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=600&auto=format&fit=crop'
                ]
            },
            {
                id: '2',
                name: 'Facilities',
                description: 'State of the art learning environments.',
                images: [
                    'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600&auto=format&fit=crop'
                ]
            }
        ],
        teacherProfiles: [
            { id: '1', name: 'Dr. Sarah Jenkins', subject: 'Advanced Physics', description: 'Experienced physics teacher inspiring the next generation.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop' },
            { id: '2', name: 'Mr. David Osei', subject: 'Mathematics', description: 'Making complex math concepts easy to understand.', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=600&auto=format&fit=crop' }
        ],
        announcementBanner: null
    });

    const [isPolishing, setIsPolishing] = useState<string | null>(null);
    const [polishOptions, setPolishOptions] = useState<{ field: string, options: string[] } | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const themes = ['Modern Minimal', 'Classic Academic', 'Playful Vibrant'];

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setLogoUrl(url);
        }
    };

    const handleAIPolish = (field: keyof typeof modulesConfig | string) => {
        const text = (modulesConfig as any)[field];
        if (!text) return;
        setIsPolishing(field);

        // Simulate AI generating 3 options
        setTimeout(() => {
            setPolishOptions({
                field,
                options: [
                    `${text} (Enhanced: Formal & Professional tone)`,
                    `${text} (Enhanced: Warm & Welcoming tone)`,
                    `${text} (Enhanced: Concise & Direct tone)`
                ]
            });
            setIsPolishing(null);
        }, 1500);
    };

    const applyPolish = (text: string) => {
        if (polishOptions) {
            setModulesConfig({ ...modulesConfig, [polishOptions.field]: text });
            setPolishOptions(null);
        }
    };

    const handleCategoryAIPolish = (id: string, text: string) => {
        if (!text) return;
        setIsPolishing(`category-${id}`);

        // Simulate AI generating 3 options
        setTimeout(() => {
            setPolishOptions({
                field: `category-${id}`,
                options: [
                    `${text} (Enhanced: Formal & Professional tone)`,
                    `${text} (Enhanced: Warm & Welcoming tone)`,
                    `${text} (Enhanced: Concise & Direct tone)`
                ]
            });
            setIsPolishing(null);
        }, 1500);
    };

    const applyCategoryPolish = (id: string, text: string) => {
        updateGalleryCategory(id, 'description', text);
        setPolishOptions(null);
    };

    const addGalleryCategory = () => {
        const newCat = { id: Date.now().toString(), name: 'New Category', description: 'Description here...', images: [] };
        setModulesConfig(prev => ({ ...prev, galleryCategories: [...prev.galleryCategories, newCat] }));
    };

    const removeGalleryCategory = (id: string) => {
        setModulesConfig(prev => ({ ...prev, galleryCategories: prev.galleryCategories.filter(c => c.id !== id) }));
    };

    const updateGalleryCategory = (id: string, field: 'name' | 'description', value: string) => {
        setModulesConfig(prev => ({
            ...prev,
            galleryCategories: prev.galleryCategories.map(c => c.id === id ? { ...c, [field]: value } : c)
        }));
    };

    const handleCategoryImagesUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            const newImages = files.map(file => URL.createObjectURL(file));
            setModulesConfig(prev => ({
                ...prev,
                galleryCategories: prev.galleryCategories.map(c =>
                    c.id === id ? {
                        ...c,
                        images: [...(c.images || []), ...newImages],
                        thumbnail: c.thumbnail || newImages[0] // Set first image as thumbnail if empty
                    } : c
                )
            }));
        }
    };

    const setGalleryThumbnail = (categoryId: string, imgUrl: string) => {
        setModulesConfig(prev => ({
            ...prev,
            galleryCategories: prev.galleryCategories.map(c =>
                c.id === categoryId ? { ...c, thumbnail: imgUrl } : c
            )
        }));
    };

    const addTeacherProfile = () => {
        const newTeacher = { id: Date.now().toString(), name: 'New Teacher', subject: 'Subject', description: 'Brief bio...', image: null };
        setModulesConfig(prev => ({ ...prev, teacherProfiles: [...prev.teacherProfiles, newTeacher] }));
    };

    const removeTeacherProfile = (id: string) => {
        setModulesConfig(prev => ({ ...prev, teacherProfiles: prev.teacherProfiles.filter(t => t.id !== id) }));
    };

    const updateTeacherProfile = (id: string, field: 'name' | 'subject' | 'description', value: string) => {
        setModulesConfig(prev => ({
            ...prev,
            teacherProfiles: prev.teacherProfiles.map(t => t.id === id ? { ...t, [field]: value } : t)
        }));
    };

    const handleTeacherImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setModulesConfig(prev => ({
                ...prev,
                teacherProfiles: prev.teacherProfiles.map(t => t.id === id ? { ...t, image: url } : t)
            }));
        }
    };

    const generateBanner = () => {
        setIsGeneratingBanner(true);
        setTimeout(() => {
            // Mock generated image
            setModulesConfig(prev => ({ ...prev, announcementBanner: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }));
            setIsGeneratingBanner(false);
        }, 2500);
    };

    // Removed MockAdmissionsForm

    // Helper to render the mock template based on selected theme
    const renderTemplate = () => {
        const ContactSection = () => (
            <div id="contact" className="mt-12 bg-slate-900 text-slate-300 py-12 px-8">
                <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest text-center">Contact Us</h3>
                <div className="flex flex-col md:flex-row justify-center gap-12 text-center text-sm">
                    <div><strong className="block text-white mb-1">Email</strong>{modulesConfig.contactEmail}</div>
                    <div><strong className="block text-white mb-1">Phone</strong>{modulesConfig.contactPhone}</div>
                    <div><strong className="block text-white mb-1">WhatsApp</strong>{modulesConfig.contactWhatsApp}</div>
                </div>
            </div>
        );

        switch (themeName) {
            case 'Classic Academic':
                return (
                    <div className="font-serif bg-[#f8fafc]" style={{ color: '#1e293b' }}>
                        {/* Header */}
                        <header className="bg-white border-b-4 py-6 px-8 flex items-center justify-between shadow-sm sticky top-0 z-20" style={{ borderColor: primaryColor }}>
                            <div className="flex items-center gap-4">
                                {logoUrl ? <img src={logoUrl} alt="Logo" className="w-16 h-16 object-contain" /> : <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border-2" style={{ borderColor: primaryColor }}><span className="font-bold text-xl uppercase" style={{ color: primaryColor }}>Logo</span></div>}
                                <div className="text-2xl font-black uppercase tracking-widest text-slate-800 hidden md:block">Institution Name</div>
                            </div>
                            <nav className="flex items-center gap-6 text-sm font-bold text-slate-600 uppercase tracking-wider">
                                <a href="#about" className="hover:text-slate-900 transition-colors">About</a>
                                {modulesConfig.teacherProfiles.length > 0 && <a href="#staff" className="hover:text-slate-900 transition-colors">Faculty</a>}
                                {modulesConfig.galleryCategories.length > 0 && <a href="#gallery" className="hover:text-slate-900 transition-colors">Gallery</a>}
                                <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
                                <a href="/admissions" target="_blank" rel="noopener noreferrer" className="px-5 py-2 text-white transition-opacity hover:opacity-90" style={{ backgroundColor: primaryColor }}>
                                    Admissions
                                </a>
                            </nav>
                        </header>

                        <div className="p-8">
                            <div className="w-full h-32 mb-6 flex items-center justify-center text-slate-800 border-y-4 relative overflow-hidden group" style={{ borderColor: primaryColor }}>
                                <span className="text-xl font-bold uppercase tracking-widest z-10">{modulesConfig.heroTitle}</span>
                            </div>
                            <div id="about" className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="text-sm text-slate-700 line-clamp-3">{modulesConfig.aboutText}</div>
                                    <div className="h-4 w-5/6 rounded bg-slate-200"></div>
                                </div>
                                <div className="border border-slate-300 p-6 bg-white shadow-sm">
                                    <div className="font-bold text-slate-800 mb-2">Announcements</div>
                                    {modulesConfig.announcementBanner && (
                                        <div className="h-20 w-full rounded bg-slate-200 mb-3 bg-cover bg-center" style={{ backgroundImage: `url(${modulesConfig.announcementBanner})` }}></div>
                                    )}
                                    <div className="text-xs text-slate-600 mb-6 line-clamp-2">{modulesConfig.eventsText}</div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-300">
                                <div className="mt-8 border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden text-center p-8">
                                    <div className="w-16 h-16 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Globe className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">Admissions Now Open</h3>
                                    <p className="text-sm text-slate-500 mb-6 font-medium">We are currently accepting new student applications.</p>
                                    <a href="/admissions" target="_blank" rel="noopener noreferrer" className="inline-block bg-slate-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-slate-700 transition shadow-md hover:shadow-lg">
                                        Proceed to Online Application
                                    </a>
                                </div>
                            </div>

                            {modulesConfig.galleryCategories.length > 0 && (
                                <div id="gallery" className="mt-10 pt-8 border-t border-slate-300">
                                    <h3 className="text-lg font-bold text-slate-800 mb-6 font-serif uppercase tracking-widest text-center" style={{ color: primaryColor }}>Gallery Directory</h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        {modulesConfig.galleryCategories.map(cat => (
                                            <div key={cat.id} className="border border-slate-300 bg-white shadow-sm overflow-hidden">
                                                <GallerySlider images={cat.images || []} />
                                                <div className="p-4 bg-white relative z-10">
                                                    <h4 className="font-bold text-slate-800 text-sm mb-1.5 font-serif">{cat.name}</h4>
                                                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{cat.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {modulesConfig.teacherProfiles.length > 0 && (
                                <div id="staff" className="mt-10 pt-8 border-t border-slate-300">
                                    <h3 className="text-xl font-bold text-slate-800 mb-6 font-serif uppercase tracking-widest text-center" style={{ color: primaryColor }}>Our Faculty</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {modulesConfig.teacherProfiles.map(teacher => (
                                            <div key={teacher.id} className="flex gap-4 p-4 border border-slate-200 bg-white shadow-sm">
                                                <div className="w-20 h-24 shrink-0 bg-slate-100 border border-slate-300 flex items-center justify-center overflow-hidden">
                                                    {teacher.image ? <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover grayscale blur-[1px] hover:blur-none hover:grayscale-0 transition-all" /> : <ImageIcon className="w-6 h-6 text-slate-300" />}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-800 font-serif">{teacher.name}</h4>
                                                    <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>{teacher.subject}</div>
                                                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{teacher.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <ContactSection />
                    </div>
                );
            case 'Playful Vibrant':
                return (
                    <div className="font-sans bg-white">
                        {/* Header */}
                        <header className="bg-white border-b-2 py-4 px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm" style={{ borderColor: primaryColor + '40' }}>
                            <div className="flex items-center gap-3">
                                {logoUrl ? <img src={logoUrl} alt="Logo" className="w-12 h-12 object-contain" /> : <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center border-2 shadow-sm" style={{ borderColor: primaryColor }}><span className="font-black text-sm" style={{ color: primaryColor }}>Logo</span></div>}
                                <div className="text-xl font-black text-slate-800 hidden md:block">Institution</div>
                            </div>
                            <nav className="flex items-center gap-4 text-sm font-bold text-slate-700">
                                <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
                                {modulesConfig.teacherProfiles.length > 0 && <a href="#staff" className="hover:opacity-70 transition-opacity">Teachers</a>}
                                {modulesConfig.galleryCategories.length > 0 && <a href="#gallery" className="hover:opacity-70 transition-opacity">Gallery</a>}
                                <a href="#contact" className="hover:opacity-70 transition-opacity">Contact</a>
                                <a href="/admissions" target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 text-white rounded-full shadow-md font-black hover:scale-105 transition-transform" style={{ backgroundColor: primaryColor }}>
                                    Join Us!
                                </a>
                            </nav>
                        </header>

                        <div className="p-6">
                            <div className="w-full h-48 rounded-[2rem] mb-6 flex items-center justify-center text-white relative overflow-hidden group shadow-lg" style={{ backgroundColor: primaryColor, opacity: 0.9 }}>
                                <span className="text-2xl font-black z-10 px-6 py-2 bg-white/20 rounded-full backdrop-blur-md">{modulesConfig.heroTitle}</span>
                            </div>
                            <div id="about" className="mb-4 text-slate-700 text-sm">{modulesConfig.aboutText}</div>

                            <div className="border-4 p-4 rounded-3xl mb-8 border-dashed mt-6" style={{ borderColor: primaryColor + '40' }}>
                                <div className="font-black text-slate-800 mb-2">Notice Board 📌</div>
                                {modulesConfig.announcementBanner && (
                                    <img src={modulesConfig.announcementBanner} alt="Banner" className="w-full h-24 object-cover rounded-2xl mb-3 shadow-sm" />
                                )}
                                <div className="text-sm font-medium text-slate-600 line-clamp-2">{modulesConfig.eventsText}</div>
                            </div>

                            <div className="mb-8">
                                <div className="mt-8 border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden text-center p-8">
                                    <div className="w-16 h-16 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Globe className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">Admissions Now Open</h3>
                                    <p className="text-sm text-slate-500 mb-6 font-medium">We are currently accepting new student applications.</p>
                                    <a href="/admissions" target="_blank" rel="noopener noreferrer" className="inline-block bg-slate-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-slate-700 transition shadow-md hover:shadow-lg">
                                        Proceed to Online Application
                                    </a>
                                </div>
                            </div>

                            {modulesConfig.galleryCategories.length > 0 && (
                                <div id="gallery" className="mt-8">
                                    <h3 className="text-2xl font-black text-slate-800 mb-6 text-center">Snapshot 📸</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {modulesConfig.galleryCategories.map(cat => (
                                            <div key={cat.id} className="border-2 rounded-[2rem] shadow-sm bg-white overflow-hidden hover:-translate-y-1 transition-transform" style={{ borderColor: primaryColor + '20' }}>
                                                <GallerySlider images={cat.images || []} />
                                                <div className="p-3 bg-white text-center">
                                                    <h4 className="font-black text-slate-800 text-sm mb-1">{cat.name}</h4>
                                                    <p className="text-[10px] text-slate-600 line-clamp-2 font-medium">{cat.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {modulesConfig.teacherProfiles.length > 0 && (
                                <div id="staff" className="mt-10">
                                    <h3 className="text-2xl font-black text-slate-800 mb-6 text-center">Meet the Teachers ✨</h3>
                                    <div className="flex overflow-x-auto pb-6 -mx-6 px-6 gap-6 snap-x hide-scrollbar">
                                        {modulesConfig.teacherProfiles.map(teacher => (
                                            <div key={teacher.id} className="w-48 shrink-0 snap-center flex flex-col items-center bg-slate-50 p-4 rounded-[2rem] border-2 shadow-sm" style={{ borderColor: primaryColor + '20' }}>
                                                <div className="w-24 h-24 rounded-full border-4 shadow-inner mb-3 overflow-hidden bg-slate-200 flex items-center justify-center" style={{ borderColor: primaryColor }}>
                                                    {teacher.image ? <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover" /> : <ImageIcon className="w-8 h-8 text-white" />}
                                                </div>
                                                <h4 className="font-bold text-slate-800 text-center mb-1">{teacher.name}</h4>
                                                <div className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full text-white mb-2 text-center" style={{ backgroundColor: primaryColor }}>{teacher.subject}</div>
                                                <p className="text-xs text-slate-600 text-center line-clamp-3 leading-tight">{teacher.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <ContactSection />
                    </div>
                );
            case 'Modern Minimal':
            default:
                return (
                    <div className="bg-white">
                        {/* Header */}
                        <header className="bg-white border-b border-slate-100 py-5 px-8 flex items-center justify-between sticky top-0 z-20">
                            <div className="flex items-center gap-3">
                                {logoUrl ? <img src={logoUrl} alt="Logo" className="w-8 h-8 object-contain" /> : <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center border border-slate-200"><span className="font-bold text-[10px] uppercase text-slate-400">Logo</span></div>}
                                <div className="text-lg font-bold text-slate-800 tracking-tight hidden md:block">Institution Name</div>
                            </div>
                            <nav className="flex items-center gap-6 text-xs font-semibold text-slate-500 uppercase tracking-widest">
                                <a href="#about" className="hover:text-slate-900 transition-colors">About</a>
                                {modulesConfig.teacherProfiles.length > 0 && <a href="#staff" className="hover:text-slate-900 transition-colors">Staff</a>}
                                {modulesConfig.galleryCategories.length > 0 && <a href="#gallery" className="hover:text-slate-900 transition-colors">Gallery</a>}
                                <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
                                <a href="/admissions" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 text-white rounded hover:opacity-90 transition-opacity" style={{ backgroundColor: primaryColor }}>
                                    Admissions
                                </a>
                            </nav>
                        </header>

                        <div className="p-8">
                            <div className="w-full h-48 rounded-xl bg-slate-100 mb-6 flex items-center justify-center text-slate-400 border border-slate-200 relative overflow-hidden group">
                                <span className="text-xl font-bold z-10 text-slate-700">{modulesConfig.heroTitle}</span>
                                <div className="absolute inset-0 bg-slate-200 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                            </div>

                            <div id="about" className="grid grid-cols-3 gap-6">
                                <div className="col-span-2 space-y-4">
                                    <div className="text-sm text-slate-600 line-clamp-3 leading-relaxed">{modulesConfig.aboutText}</div>
                                    <div className="h-4 w-3/4 rounded bg-slate-100"></div>
                                    <div className="h-4 w-5/6 rounded bg-slate-100"></div>
                                </div>
                                <div className="col-span-1 border border-slate-100 rounded-lg p-4 shadow-sm">
                                    <div className="font-semibold text-slate-800 mb-2 text-sm">Announcements</div>
                                    {modulesConfig.announcementBanner && (
                                        <img src={modulesConfig.announcementBanner} alt="Banner" className="w-full h-24 object-cover rounded mb-3" />
                                    )}
                                    <div className="text-xs text-slate-500 line-clamp-3 mb-4">{modulesConfig.eventsText}</div>
                                </div>
                            </div>

                            <div className="mt-8 border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden text-center p-8">
                                <div className="w-16 h-16 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Globe className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Admissions Now Open</h3>
                                <p className="text-sm text-slate-500 mb-6 font-medium">We are currently accepting new student applications.</p>
                                <a href="/admissions" target="_blank" rel="noopener noreferrer" className="inline-block bg-slate-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-slate-700 transition shadow-md hover:shadow-lg">
                                    Proceed to Online Application
                                </a>
                            </div>

                            {modulesConfig.galleryCategories.length > 0 && (
                                <div id="gallery" className="mt-10 pt-8 border-t border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                        <ImageIcon className="w-5 h-5" style={{ color: primaryColor }} /> Gallery Directory
                                    </h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        {modulesConfig.galleryCategories.map(cat => (
                                            <div key={cat.id} className="border border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow">
                                                <GallerySlider images={cat.images || []} />
                                                <div className="p-4 bg-white relative z-10">
                                                    <h4 className="font-semibold text-slate-800 text-sm mb-1.5">{cat.name}</h4>
                                                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{cat.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {modulesConfig.teacherProfiles.length > 0 && (
                                <div id="staff" className="mt-10 pt-8 border-t border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                        <Users className="w-5 h-5" style={{ color: primaryColor }} /> Staff Directory
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {modulesConfig.teacherProfiles.map(teacher => (
                                            <div key={teacher.id} className="flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                                <div className="h-32 bg-slate-100 w-full relative">
                                                    {teacher.image ? (
                                                        <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-8 h-8 text-slate-300" /></div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                                    <div className="absolute bottom-3 left-4 right-4">
                                                        <h4 className="font-bold text-white text-base truncate">{teacher.name}</h4>
                                                        <div className="text-xs font-medium text-white/80 truncate">{teacher.subject}</div>
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{teacher.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <ContactSection />
                    </div>
                );
        }
    };

    const renderTextAreaWithAI = (label: string, field: keyof typeof modulesConfig, placeholder: string = "", rows: number = 2) => (
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <label className="block text-sm font-medium text-slate-700">{label}</label>
                <button
                    onClick={() => handleAIPolish(field)}
                    disabled={isPolishing === field || polishOptions?.field === field}
                    className={`text-xs flex items-center gap-1 px-2 py-1 rounded transition-colors ${isPolishing === field ? 'bg-slate-100 text-slate-400' : 'text-indigo-600 hover:bg-indigo-50 font-medium border border-transparent hover:border-indigo-100'}`}
                    title="Enhance text with AI"
                >
                    {isPolishing === field ? (
                        <div className="w-3 h-3 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin"></div>
                    ) : (
                        <Sparkles className="w-3 h-3" />
                    )}
                    {isPolishing === field ? 'Polishing...' : 'AI Polish'}
                </button>
            </div>
            {polishOptions?.field === field ? (
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 space-y-2 shadow-inner">
                    <p className="text-xs font-semibold text-indigo-700 mb-2">Select an AI-enhanced option:</p>
                    {polishOptions.options.map((opt, idx) => (
                        <button key={idx} onClick={() => applyPolish(opt)} className="w-full text-left p-2 bg-white border border-indigo-100 rounded text-sm hover:border-indigo-300 hover:shadow-sm transition-all text-slate-700">
                            ✨ {opt}
                        </button>
                    ))}
                    <div className="flex justify-end pt-1">
                        <button onClick={() => setPolishOptions(null)} className="text-xs text-slate-500 hover:text-slate-700 font-medium px-2 py-1">Cancel</button>
                    </div>
                </div>
            ) : (
                <textarea
                    rows={rows}
                    placeholder={placeholder}
                    value={(modulesConfig as any)[field] as string}
                    onChange={(e) => setModulesConfig({ ...modulesConfig, [field]: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm resize-none"
                ></textarea>
            )}
        </div>
    );

    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Website Design</h1>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in fade-in zoom-in-95 duration-300">

                {/* Left Column: Customization Controls */}
                <div className="xl:col-span-1 space-y-6">
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-slate-50 text-slate-600">
                                <Palette className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-semibold text-slate-800">Website Customization</h2>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">School Primary Color</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={primaryColor}
                                        onChange={(e) => setPrimaryColor(e.target.value)}
                                        className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                                    />
                                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-600 font-mono">
                                        {primaryColor.toUpperCase()}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">Template Theme</label>
                                <div className="grid grid-cols-1 gap-2">
                                    {themes.map(theme => (
                                        <button
                                            key={theme}
                                            onClick={() => setThemeName(theme)}
                                            className={`text-left px-4 py-3 rounded-lg border text-sm transition-all ${themeName === theme
                                                ? 'border-slate-500 bg-slate-50 text-slate-700 font-medium tracking-wide shadow-inner'
                                                : 'border-slate-200 text-slate-600 hover:border-slate-200 hover:bg-slate-50'
                                                }`}
                                        >
                                            {theme}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <label className="block text-sm font-medium text-slate-600 mb-3">Modular Content</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleLogoUpload}
                                    />
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-slate-300 hover:bg-slate-50 text-slate-500 hover:text-slate-600 hover:border-slate-300 transition-colors"
                                    >
                                        <UploadCloud className="w-5 h-5" />
                                        <span className="text-xs font-medium">Update Logo</span>
                                    </button>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-slate-300 hover:bg-slate-50 text-slate-500 hover:text-slate-600 hover:border-slate-300 transition-colors"
                                    >
                                        <Layout className="w-5 h-5" />
                                        <span className="text-xs font-medium">Edit Modules</span>
                                    </button>
                                </div>
                            </div>

                            <button className="w-full py-2.5 rounded-lg bg-slate-950 text-white font-medium text-sm hover:bg-slate-900 transition-colors shadow-sm">
                                Publish Changes
                            </button>
                        </div>
                    </section>
                </div>

                {/* Right Column: Live Preview */}
                <div className="xl:col-span-2">
                    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full min-h-[600px]">
                        {/* Browser Header */}
                        <div className="h-12 bg-slate-100 border-b border-slate-200 flex items-center justify-between px-4">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-white"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-md border border-slate-200 text-xs text-slate-500 font-medium">
                                <Globe className="w-3 h-3" />
                                <span>lincolnhigh.900schools.com</span>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600">
                                <Maximize2 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Live Preview Content Area */}
                        <div className="flex-1 bg-slate-50 overflow-y-auto relative p-6">

                            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 transition-all duration-500" style={{ '--theme-color': primaryColor } as React.CSSProperties}>
                                {/* Mock Website Header */}
                                <div style={{ backgroundColor: primaryColor }} className="h-20 px-8 flex items-center justify-between text-white transition-colors duration-300">
                                    <div className="flex items-center gap-3">
                                        {logoUrl ? (
                                            <img src={logoUrl} alt="School Logo" className="h-10 w-10 object-contain bg-white/10 rounded" />
                                        ) : (
                                            <div className="h-10 w-10 rounded bg-white/20 flex items-center justify-center">
                                                <ImageIcon className="w-5 h-5 opacity-70" />
                                            </div>
                                        )}
                                        <div className="font-bold text-xl tracking-wide">{modulesConfig.schoolName}</div>
                                    </div>
                                    <div className="flex gap-4 text-sm font-medium opacity-90">
                                        <span>Home</span>
                                        <span>About</span>
                                        <span>Admissions</span>
                                    </div>
                                </div>

                                {/* Mock Website Body dynamic based on theme */}
                                {renderTemplate()}

                            </div>

                        </div>
                    </section>
                </div>

            </div>


            {/* Edit Modules Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-3xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50 min-h-[80px]">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">Edit Website Modules</h2>
                                <p className="text-sm text-slate-500">Configure the detailed content sections for your school site.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1 space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">School Details</h3>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Name of School</label>
                                    <input
                                        type="text"
                                        value={modulesConfig.schoolName}
                                        onChange={(e) => setModulesConfig({ ...modulesConfig, schoolName: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-slate-100">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Hero Section</h3>
                                {renderTextAreaWithAI('Main Heading', 'heroTitle', 'Enter the main heading...', 2)}
                            </div>

                            <div className="space-y-4 pt-6 border-t border-slate-100">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">About Section</h3>
                                {renderTextAreaWithAI('Introduction Text', 'aboutText', 'Describe your institution...', 3)}
                            </div>

                            <div className="space-y-4 pt-6 border-t border-slate-100">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Gallery Categories</h3>
                                    <button onClick={addGalleryCategory} className="flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                                        <Plus className="w-3 h-3" /> Add Category
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {modulesConfig.galleryCategories.map((category) => (
                                        <div key={category.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 relative group">
                                            <button
                                                onClick={() => removeGalleryCategory(category.id)}
                                                className="absolute top-3 right-3 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-600 mb-1">Category Name</label>
                                                    <input
                                                        type="text"
                                                        value={category.name}
                                                        onChange={(e) => updateGalleryCategory(category.id, 'name', e.target.value)}
                                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-sm font-medium"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-600 mb-1">Category Images</label>
                                                    <input
                                                        type="file"
                                                        multiple
                                                        accept="image/*"
                                                        className="hidden"
                                                        id={`cat-upload-${category.id}`}
                                                        onChange={(e) => handleCategoryImagesUpload(category.id, e)}
                                                    />
                                                    <label
                                                        htmlFor={`cat-upload-${category.id}`}
                                                        className="h-full min-h-[100px] border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-500 hover:bg-slate-100 cursor-pointer transition-colors bg-white pb-3 pt-3"
                                                    >
                                                        <ImagePlus className="w-6 h-6 mb-2 text-slate-400" />
                                                        <span className="text-xs font-medium text-slate-600">Upload to {category.name}</span>
                                                    </label>
                                                </div>
                                                <div className="space-y-2 flex flex-col justify-start">
                                                    <div className="flex justify-between items-end">
                                                        <label className="block text-xs font-medium text-slate-600">Description</label>
                                                        <button
                                                            onClick={() => handleCategoryAIPolish(category.id, category.description)}
                                                            disabled={isPolishing === `category-${category.id}` || polishOptions?.field === `category-${category.id}`}
                                                            className={`text-[10px] flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors ${isPolishing === `category-${category.id}` ? 'bg-slate-100 text-slate-400' : 'text-indigo-600 hover:bg-indigo-50 font-medium border border-transparent hover:border-indigo-100'}`}
                                                        >
                                                            {isPolishing === `category-${category.id}` ? (
                                                                <div className="w-2.5 h-2.5 border border-slate-300 border-t-slate-500 rounded-full animate-spin"></div>
                                                            ) : (
                                                                <Sparkles className="w-2.5 h-2.5" />
                                                            )}
                                                            {isPolishing === `category-${category.id}` ? '...' : 'AI Polish'}
                                                        </button>
                                                    </div>
                                                    {polishOptions?.field === `category-${category.id}` ? (
                                                        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-2 space-y-1.5 shadow-inner">
                                                            <p className="text-[10px] font-semibold text-indigo-700">Select an option:</p>
                                                            {polishOptions.options.map((opt, idx) => (
                                                                <button key={idx} onClick={() => applyCategoryPolish(category.id, opt)} className="w-full text-left p-1.5 bg-white border border-indigo-100 rounded text-xs hover:border-indigo-300 hover:shadow-sm transition-all text-slate-700">
                                                                    ✨ {opt}
                                                                </button>
                                                            ))}
                                                            <div className="flex justify-end pt-1">
                                                                <button onClick={() => setPolishOptions(null)} className="text-[10px] text-slate-500 hover:text-slate-700 font-medium px-2 py-0.5">Cancel</button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <textarea
                                                            rows={2}
                                                            value={category.description}
                                                            onChange={(e) => updateGalleryCategory(category.id, 'description', e.target.value)}
                                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-sm resize-none"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            {category.images && category.images.length > 0 && (
                                                <div className="mt-4 pt-4 border-t border-slate-200 w-full col-span-2">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-xs font-semibold text-slate-600 block">Uploaded Images ({category.images.length})</span>
                                                        <span className="text-[10px] text-slate-400">Click the star to set category thumbnail</span>
                                                    </div>
                                                    <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-slate-300 items-center">
                                                        {category.thumbnail && (
                                                            <div className="relative shrink-0 border-r-2 border-slate-200 pr-3 mr-1 flex flex-col items-center">
                                                                <span className="text-[9px] font-bold text-slate-600 uppercase mb-1">Thumbnail</span>
                                                                <img src={category.thumbnail} alt="thumbnail" className="w-16 h-16 rounded-lg object-cover border-2 border-slate-500 ring-2 ring-slate-500/20" />
                                                            </div>
                                                        )}
                                                        {category.images.map((img, i) => {
                                                            const isThumbnail = category.thumbnail === img;
                                                            return (
                                                                <div key={i} className="relative group shrink-0 mt-4">
                                                                    <img src={img} alt="uploaded" className={`w-14 h-14 rounded-lg object-cover border-2 ${isThumbnail ? 'border-slate-500 opacity-50' : 'border-slate-200'}`} />
                                                                    {!isThumbnail && (
                                                                        <button
                                                                            onClick={(e) => { e.preventDefault(); setGalleryThumbnail(category.id, img); }}
                                                                            title="Set as Thumbnail"
                                                                            className={`absolute -top-2 -right-2 p-1 rounded-full shadow-sm text-white bg-slate-400 hover:bg-slate-500 opacity-0 group-hover:opacity-100 transition-all z-10 hover:scale-110 cursor-pointer`}
                                                                        >
                                                                            <Star className="w-3 h-3 fill-current" />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {modulesConfig.galleryCategories.length === 0 && (
                                        <div className="text-center py-6 text-slate-500 text-sm italic">No gallery categories. Create one above to organize your images!</div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-slate-100">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Upcoming Events & Notices</h3>
                                {renderTextAreaWithAI('Announcement Text', 'eventsText', 'Share upcoming events or important notices...', 3)}

                                <div className="mt-6 bg-indigo-50/50 border border-indigo-100 rounded-xl p-5 shadow-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-600">
                                            <Wand2 className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-800 text-sm">AI Banner Generator</h4>
                                            <p className="text-xs text-slate-500">Generate a professional event banner or upload text based on details.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-700 mb-1">Banner Details / Prompt</label>
                                            <input
                                                value={bannerPrompt}
                                                onChange={(e) => setBannerPrompt(e.target.value)}
                                                placeholder="e.g. Science fair 2026, vibrant colors..."
                                                className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
                                            />
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="flex-1">
                                                <label className="block text-xs font-medium text-slate-700 mb-1">Sample Reference (Optional)</label>
                                                <input type="file" ref={bannerSampleRef} className="hidden" />
                                                <button onClick={() => bannerSampleRef.current?.click()} className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white text-slate-600 border border-indigo-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                                                    <ImagePlus className="w-4 h-4" /> Select Sample Image
                                                </button>
                                            </div>
                                            <div className="flex-1 flex items-end">
                                                <button
                                                    onClick={generateBanner}
                                                    disabled={isGeneratingBanner}
                                                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                                                >
                                                    {isGeneratingBanner ? (
                                                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Generating...</>
                                                    ) : (
                                                        <><Sparkles className="w-4 h-4" /> Generate Banner</>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        {modulesConfig.announcementBanner && (
                                            <div className="mt-4 p-2 bg-white rounded-lg border border-indigo-100">
                                                <div className="text-xs font-medium text-slate-500 mb-2">Current Banner:</div>
                                                <img src={modulesConfig.announcementBanner} alt="Generated Banner" className="w-full h-32 object-cover rounded shadow-sm" />
                                                <button onClick={() => setModulesConfig(prev => ({ ...prev, announcementBanner: null }))} className="mt-2 text-xs text-red-500 hover:text-red-700 font-medium">Remove Banner</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-slate-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-1">Teacher Profiles</h3>
                                        <p className="text-[10px] text-slate-500 font-medium">Add faculty directly or send them the prefill link below.</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(window.location.origin + '/teacher/onboarding');
                                                alert('Teacher Prefill Link Copied to Clipboard!');
                                            }}
                                            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors shadow-sm border border-indigo-200"
                                            title="Share this link with teachers to let them submit their own profiles"
                                        >
                                            <Globe className="w-3.5 h-3.5" /> Copy Prefill Link
                                        </button>
                                        <button onClick={addTeacherProfile} className="flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors shadow-sm">
                                            <Plus className="w-3 h-3" /> Add Teacher
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {modulesConfig.teacherProfiles.map((teacher) => (
                                        <div key={teacher.id} className="bg-slate-50 border border-slate-200 rounded-xl p-5 relative group shadow-sm transition-shadow hover:shadow-md">
                                            <button
                                                onClick={() => removeTeacherProfile(teacher.id)}
                                                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors bg-white hover:bg-red-50 p-1.5 rounded-md border border-transparent hover:border-red-100"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                                <div className="md:col-span-3">
                                                    <label className="block text-xs font-bold text-slate-700 mb-2">Profile Picture</label>
                                                    <div className="flex flex-col items-center gap-3">
                                                        <div className="h-24 w-24 shrink-0 rounded-full border-[3px] border-white shadow-md bg-slate-100 overflow-hidden flex items-center justify-center text-slate-300">
                                                            {teacher.image ? (
                                                                <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <ImageIcon className="w-8 h-8 opacity-50" />
                                                            )}
                                                        </div>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            id={`teacher-upload-${teacher.id}`}
                                                            onChange={(e) => handleTeacherImageUpload(teacher.id, e)}
                                                        />
                                                        <label
                                                            htmlFor={`teacher-upload-${teacher.id}`}
                                                            className="px-3 py-1.5 flex items-center justify-center gap-1.5 w-full bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-700 hover:border-slate-200 cursor-pointer transition-colors shadow-sm"
                                                        >
                                                            <UploadCloud className="w-3.5 h-3.5" /> Upload Photo
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-9 space-y-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-xs font-bold text-slate-700 mb-1">Teacher Name</label>
                                                            <input
                                                                type="text"
                                                                value={teacher.name}
                                                                onChange={(e) => updateTeacherProfile(teacher.id, 'name', e.target.value)}
                                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm font-medium transition-shadow"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-bold text-slate-700 mb-1">Subject(s) Taught</label>
                                                            <input
                                                                type="text"
                                                                value={teacher.subject}
                                                                onChange={(e) => updateTeacherProfile(teacher.id, 'subject', e.target.value)}
                                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm transition-shadow"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-700 mb-1">Brief Description / Bio</label>
                                                        <textarea
                                                            rows={2}
                                                            value={teacher.description}
                                                            onChange={(e) => updateTeacherProfile(teacher.id, 'description', e.target.value)}
                                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm resize-none transition-shadow"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {modulesConfig.teacherProfiles.length === 0 && (
                                        <div className="text-center py-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 text-sm font-medium">No teacher profiles added yet. Click 'Add Teacher' to create one!</div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-slate-100">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Contact Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Email</label>
                                        <input type="email" value={modulesConfig.contactEmail} onChange={(e) => setModulesConfig({ ...modulesConfig, contactEmail: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Phone Number</label>
                                        <input type="text" value={modulesConfig.contactPhone} onChange={(e) => setModulesConfig({ ...modulesConfig, contactPhone: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">WhatsApp</label>
                                        <input type="text" value={modulesConfig.contactWhatsApp} onChange={(e) => setModulesConfig({ ...modulesConfig, contactWhatsApp: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 z-10 shrink-0">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2 rounded-lg font-medium bg-slate-600 text-white hover:bg-slate-700 transition-colors shadow-sm"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </DashboardLayout>
    );
};

export default WebsiteDesign;
