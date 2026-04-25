import codecs

with codecs.open('src/pages/WebsiteDesign.tsx', 'r', 'utf-8') as f:
    text = f.read()

text = text.replace(
'''const Dashboard = () => {
    const [primaryColor, setPrimaryColor] = useState('#059669'); // emerald-600
    const [themeName, setThemeName] = useState('Modern Minimal');
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeView, setActiveView] = useState<'overview' | 'website'>('overview');''',
'''const WebsiteDesign = () => {
    const [primaryColor, setPrimaryColor] = useState('#059669'); // emerald-600
    const [themeName, setThemeName] = useState('Modern Minimal');
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);'''
)

text = text.replace(
'''    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
                <div className="flex gap-2 bg-white border border-slate-200 p-1.5 rounded-xl shadow-sm">
                    <button onClick={() => setActiveView('overview')} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeView === 'overview' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>Overview</button>
                    <button onClick={() => setActiveView('website')} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeView === 'website' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>Website Editor</button>
                </div>
            </div>

            {activeView === 'overview' ? (
                <div className="space-y-8 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Users className="w-16 h-16 text-emerald-600" /></div>
                            <div className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Total Students</div>
                            <div className="text-4xl font-black text-slate-800 tracking-tight">1,248</div>
                            <div className="text-xs text-emerald-600 mt-3 font-medium flex items-center gap-1"><span className="bg-emerald-100 rounded px-1">+12%</span> from last year</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Users className="w-16 h-16 text-emerald-600" /></div>
                            <div className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Teaching Staff</div>
                            <div className="text-4xl font-black text-slate-800 tracking-tight">84</div>
                            <div className="text-xs text-slate-500 mt-3 font-medium">Active accounts</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Users className="w-16 h-16 text-emerald-600" /></div>
                            <div className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Non-Teaching Staff</div>
                            <div className="text-4xl font-black text-slate-800 tracking-tight">32</div>
                            <div className="text-xs text-slate-500 mt-3 font-medium">Active accounts</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><CreditCard className="w-16 h-16 text-emerald-600" /></div>
                            <div className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Revenue (GHS)</div>
                            <div className="text-4xl font-black text-slate-800 tracking-tight">¢45,200</div>
                            <div className="text-xs text-emerald-600 mt-3 font-medium">From admissions</div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                        <h3 className="text-lg font-bold text-slate-800 mb-6">Quick Actions</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <button onClick={() => setActiveView('website')} className="p-5 border border-slate-100 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50 rounded-2xl text-left transition-all duration-300 group shadow-sm hover:shadow-md">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Layout className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div className="font-bold text-slate-800 text-sm mb-1">Customize Website</div>
                                <div className="text-xs text-slate-500 font-medium">Edit pages and media</div>
                            </button>
                            <button className="p-5 border border-slate-100 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50 rounded-2xl text-left transition-all duration-300 group shadow-sm hover:shadow-md">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Users className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div className="font-bold text-slate-800 text-sm mb-1">Manage Students</div>
                                <div className="text-xs text-slate-500 font-medium">View roster & IDs</div>
                            </button>
                            <button className="p-5 border border-slate-100 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50 rounded-2xl text-left transition-all duration-300 group shadow-sm hover:shadow-md">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <ShieldAlert className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div className="font-bold text-slate-800 text-sm mb-1">Behavior Reports</div>
                                <div className="text-xs text-slate-500 font-medium">Review active incidents</div>
                            </button>
                            <button className="p-5 border border-slate-100 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50 rounded-2xl text-left transition-all duration-300 group shadow-sm hover:shadow-md">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <CreditCard className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div className="font-bold text-slate-800 text-sm mb-1">Finances</div>
                                <div className="text-xs text-slate-500 font-medium">View transaction logs</div>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in fade-in zoom-in-95 duration-300">''',
'''    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Website Design</h1>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in fade-in zoom-in-95 duration-300">'''
)

text = text.replace(
'''                        </section>
                    </div>

                </div>
            )}

            {/* Edit Modules Modal */''',
'''                        </section>
                    </div>

                </div>

            {/* Edit Modules Modal */'''
)

text = text.replace('export default Dashboard;', 'export default WebsiteDesign;')

with codecs.open('src/pages/WebsiteDesign.tsx', 'w', 'utf-8') as f:
    f.write(text)

print("done")
