import codecs

with codecs.open('src/pages/WebsiteDesign.tsx', 'r', 'utf-8') as f:
    text = f.read()

start_marker = "const renderTemplate = () => {"
end_marker = "const renderTextAreaWithAI = (label: string"

idx_start = text.find(start_marker)
idx_end = text.find(end_marker)

replacement = """const renderTemplate = () => {
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
                                {modulesConfig.admissionConfig.enabled && (
                                    <a href="/admissions" target="_blank" rel="noopener noreferrer" className="px-5 py-2 text-white transition-opacity hover:opacity-90" style={{ backgroundColor: primaryColor }}>
                                        Admissions
                                    </a>
                                )}
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

                            {modulesConfig.admissionConfig.enabled && (
                                <div className="mt-8 pt-8 border-t border-slate-300">
                                    <MockAdmissionsForm />
                                </div>
                            )}

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
                                {modulesConfig.admissionConfig.enabled && (
                                    <a href="/admissions" target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 text-white rounded-full shadow-md font-black hover:scale-105 transition-transform" style={{ backgroundColor: primaryColor }}>
                                        Join Us!
                                    </a>
                                )}
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

                            {modulesConfig.admissionConfig.enabled && (
                                <div className="mb-8">
                                    <MockAdmissionsForm />
                                </div>
                            )}

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
                                {modulesConfig.admissionConfig.enabled && (
                                    <a href="/admissions" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 text-white rounded hover:opacity-90 transition-opacity" style={{ backgroundColor: primaryColor }}>
                                        Admissions
                                    </a>
                                )}
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

                            {modulesConfig.admissionConfig.enabled && (
                                <MockAdmissionsForm />
                            )}

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
    };\n\n    """

if idx_start != -1 and idx_end != -1:
    new_text = text[:idx_start] + replacement + text[idx_end:]
    with codecs.open('src/pages/WebsiteDesign.tsx', 'w', 'utf-8') as f:
        f.write(new_text)
    print("done")
else:
    print("Could not find markers")
