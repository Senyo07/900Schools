import codecs

modal_code = """
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
                                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700">Hero Section</h3>
                                {renderTextAreaWithAI('Main Heading', 'heroTitle', 'Enter the main heading...', 2)}
                            </div>

                            <div className="space-y-4 pt-6 border-t border-slate-100">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700">About Section</h3>
                                {renderTextAreaWithAI('Introduction Text', 'aboutText', 'Describe your institution...', 3)}
                            </div>

                            <div className="space-y-6 pt-6 border-t border-slate-100">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700">Admissions Setup</h3>
                                {renderTextAreaWithAI('Admissions Policy & Info', 'admissionsText', 'Detail how you accept admissions...', 3)}

                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h4 className="font-semibold text-slate-800 text-sm">Collect Admission Fees via Portal</h4>
                                            <p className="text-xs text-slate-500">Enable a digital application form where parents can fill details, upload documents, and pay fees.</p>
                                        </div>
                                        <button
                                            onClick={() => setModulesConfig(prev => ({ ...prev, admissionConfig: { ...prev.admissionConfig, enabled: !prev.admissionConfig.enabled } }))}
                                            className={`${modulesConfig.admissionConfig.enabled ? 'text-emerald-500' : 'text-slate-300'} hover:opacity-80 transition-opacity drop-shadow-sm`}
                                        >
                                            {modulesConfig.admissionConfig.enabled ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10" />}
                                        </button>
                                    </div>

                                    {modulesConfig.admissionConfig.enabled && (
                                        <div className="space-y-3 mt-4 pt-4 border-t border-slate-200 animate-in fade-in">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 mb-1">Admission Fee Amount (GHS)</label>
                                                <div className="flex w-full max-w-[250px] shadow-sm rounded-lg border border-slate-300 overflow-hidden bg-white focus-within:ring-1 focus-within:ring-emerald-500 focus-within:border-emerald-500">
                                                    <span className="flex items-center justify-center px-3 bg-slate-100 text-slate-500 text-xs font-semibold border-r border-slate-200">GHS</span>
                                                    <input
                                                        type="number"
                                                        value={modulesConfig.admissionConfig.fee}
                                                        onChange={e => setModulesConfig(prev => ({ ...prev, admissionConfig: { ...prev.admissionConfig, fee: e.target.value } }))}
                                                        className="w-full px-3 py-2 focus:outline-none text-sm font-medium"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2.5 p-3.5 bg-sky-50 text-sky-800 rounded-lg border border-sky-200 text-xs mt-3">
                                                <Info className="w-4 h-4 shrink-0 mt-0.5 text-sky-600" />
                                                <div className="space-y-1.5 leading-relaxed">
                                                    <p>
                                                        <strong>Implementation Note:</strong> Activating this enables a full application intake form on your website.
                                                    </p>
                                                    <p>
                                                        You must negotiate the application fee split with the <strong>900Schools Super Admin</strong>.
                                                        All payments are processed centrally through the 900Schools admin account, after which your school's percentage is disbursed.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-slate-100">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700">Gallery Categories</h3>
                                    <button onClick={addGalleryCategory} className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">
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
                                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm font-medium"
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
                                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm resize-none"
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
                                                                <span className="text-[9px] font-bold text-emerald-600 uppercase mb-1">Thumbnail</span>
                                                                <img src={category.thumbnail} alt="thumbnail" className="w-16 h-16 rounded-lg object-cover border-2 border-emerald-500 ring-2 ring-emerald-500/20" />
                                                            </div>
                                                        )}
                                                        {category.images.map((img, i) => {
                                                            const isThumbnail = category.thumbnail === img;
                                                            return (
                                                                <div key={i} className="relative group shrink-0 mt-4">
                                                                    <img src={img} alt="uploaded" className={`w-14 h-14 rounded-lg object-cover border-2 ${isThumbnail ? 'border-emerald-500 opacity-50' : 'border-slate-200'}`} />
                                                                    {!isThumbnail && (
                                                                        <button
                                                                            onClick={(e) => { e.preventDefault(); setGalleryThumbnail(category.id, img); }}
                                                                            title="Set as Thumbnail"
                                                                            className={`absolute -top-2 -right-2 p-1 rounded-full shadow-sm text-white bg-slate-400 hover:bg-emerald-500 opacity-0 group-hover:opacity-100 transition-all z-10 hover:scale-110 cursor-pointer`}
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
                                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700">Upcoming Events & Notices</h3>
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
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700 mb-1">Teacher Profiles</h3>
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
                                        <button onClick={addTeacherProfile} className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors shadow-sm">
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
                                                            className="px-3 py-1.5 flex items-center justify-center gap-1.5 w-full bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 cursor-pointer transition-colors shadow-sm"
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
                                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium transition-shadow"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-bold text-slate-700 mb-1">Subject(s) Taught</label>
                                                            <input
                                                                type="text"
                                                                value={teacher.subject}
                                                                onChange={(e) => updateTeacherProfile(teacher.id, 'subject', e.target.value)}
                                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition-shadow"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-700 mb-1">Brief Description / Bio</label>
                                                        <textarea
                                                            rows={2}
                                                            value={teacher.description}
                                                            onChange={(e) => updateTeacherProfile(teacher.id, 'description', e.target.value)}
                                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none transition-shadow"
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
                                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700">Contact Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Email</label>
                                        <input type="email" value={modulesConfig.contactEmail} onChange={(e) => setModulesConfig({ ...modulesConfig, contactEmail: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Phone Number</label>
                                        <input type="text" value={modulesConfig.contactPhone} onChange={(e) => setModulesConfig({ ...modulesConfig, contactPhone: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">WhatsApp</label>
                                        <input type="text" value={modulesConfig.contactWhatsApp} onChange={(e) => setModulesConfig({ ...modulesConfig, contactWhatsApp: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm" />
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
                                className="px-6 py-2 rounded-lg font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
"""

with codecs.open('src/pages/WebsiteDesign.tsx', 'r', 'utf-8') as f:
    text = f.read()

replacement_target = "</DashboardLayout>"

if replacement_target in text:
    new_text = text.replace(replacement_target, modal_code + "\n        </DashboardLayout>")
    with codecs.open('src/pages/WebsiteDesign.tsx', 'w', 'utf-8') as f:
        f.write(new_text)
    print("modal appended")
else:
    print("could not find target")
