const fs = require('fs');
let content = fs.readFileSync('src/pages/WebsiteDesign.tsx', 'utf8');

// 1. Rename component and remove activeView state
content = content.replace(
    /const Dashboard = \(\) => \{\s+const \[primaryColor, setPrimaryColor\] = useState\('#059669'\); \/\/ emerald-600\s+const \[themeName, setThemeName\] = useState\('Modern Minimal'\);\s+const \[logoUrl, setLogoUrl\] = useState<string \| null>\(null\);\s+const \[isModalOpen, setIsModalOpen\] = useState\(false\);\s+const \[activeView, setActiveView\] = useState<'overview' \| 'website'>\('overview'\);/,
    `const WebsiteDesign = () => {
    const [primaryColor, setPrimaryColor] = useState('#059669'); // emerald-600
    const [themeName, setThemeName] = useState('Modern Minimal');
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);`
);

// 2. Remove Overview block and clean up the return statement
content = content.replace(
    /<div className="flex items-center justify-between mb-8">[\s\S]*?\{activeView === 'overview' \? \([\s\S]*?\) : \(/,
    `<div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Website Design</h1>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in fade-in zoom-in-95 duration-300">`
);

// 3. Remove closing brace for the ternary
content = content.replace(
    /<\/div>\n\n                <\/div>\n            \)}\n\n            {\/\* Edit Modules Modal \*\//,
    `</div>

                </div>

            {/* Edit Modules Modal */`
);

// 4. Update the export
content = content.replace(/export default Dashboard;/, 'export default WebsiteDesign;');

fs.writeFileSync('src/pages/WebsiteDesign.tsx', content);
console.log('Modifications applied.');
