import React, { useState, useRef } from 'react';
import { X, CheckCircle2, User as UserIcon, QrCode, Download, Printer, FileText, Settings2, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

export type Student = {
    id: string;
    name: string;
    grade: string;
    status: string;
    guardian: { name: string; relation: string; phone: string; email: string };
};

interface IdGeneratorModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: Student | null; // Null if batch generating
    isBatch: boolean;
}

const designs = [
    { id: 'portrait-1', title: 'Modern Portrait', type: 'Portrait', style: 'Gradient BG', isPortrait: true },
    { id: 'portrait-2', title: 'Classic Portrait', type: 'Portrait', style: 'Clean White', isPortrait: true },
    { id: 'landscape-1', title: 'Corporate Landscape', type: 'Landscape', style: 'Dark Sidebar', isPortrait: false },
    { id: 'landscape-2', title: 'Minimalist Landscape', type: 'Landscape', style: 'Pastel Accent', isPortrait: false },
];

export const IdGeneratorModal: React.FC<IdGeneratorModalProps> = ({ isOpen, onClose, student, isBatch }) => {
    const [selectedDesign, setSelectedDesign] = useState('portrait-1');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false);
    const [exportingType, setExportingType] = useState<'image' | 'pdf' | 'print' | null>(null);

    // Customization State
    const [primaryColor, setPrimaryColor] = useState('#4f46e5'); // Default indigo-600
    const [widthCm, setWidthCm] = useState(5.4);
    const [heightCm, setHeightCm] = useState(8.6);

    const cardRef = useRef<HTMLDivElement>(null);
    const exportCardRef = useRef<HTMLDivElement>(null);

    const currentDesign = designs.find(d => d.id === selectedDesign);
    const isPortrait = currentDesign?.isPortrait ?? true;

    if (!isOpen) return null;

    const previewName = isBatch ? 'John Doe' : (student?.name || 'Invalid Student');
    const previewId = isBatch ? 'STU-26-000' : (student?.id || '----');
    const previewGrade = isBatch ? 'SHS 1' : (student?.grade || '----');

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setIsGenerated(true);
        }, 1500);
    };

    const handleDownloadImage = async () => {
        if (!exportCardRef.current || exportingType) return;
        setExportingType('image');

        try {
            const dataUrl = await toPng(exportCardRef.current, { pixelRatio: 2, cacheBust: true });

            // Convert Base64 Data URL to Blob for reliable downloading of large files
            const response = await fetch(dataUrl);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.download = `student_id_${previewName.replace(/\s/g, '_')}.png`;
            link.href = blobUrl;
            link.click();

            // Cleanup object URL
            setTimeout(() => window.URL.revokeObjectURL(blobUrl), 100);
        } catch (error) {
            console.error('Error generating image:', error);
            alert('Oh no! Something went wrong while generating the image.');
        } finally {
            setExportingType(null);
        }
    };

    const handleDownloadPDF = async () => {
        if (!exportCardRef.current || exportingType) return;
        setExportingType('pdf');

        try {
            const dataUrl = await toPng(exportCardRef.current, { pixelRatio: 2, cacheBust: true });

            const orientation = isPortrait ? 'p' : 'l';
            const pdf = new jsPDF({
                orientation: orientation,
                unit: 'cm',
                format: [isPortrait ? widthCm : heightCm, isPortrait ? heightCm : widthCm]
            });

            pdf.addImage(dataUrl, 'PNG', 0, 0, isPortrait ? widthCm : heightCm, isPortrait ? heightCm : widthCm);
            pdf.save(`student_id_${previewName.replace(/\s/g, '_')}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Oh no! Something went wrong while generating the PDF.');
        } finally {
            setExportingType(null);
        }
    };

    const handlePrint = async () => {
        if (!exportCardRef.current || exportingType) return;
        setExportingType('print');

        try {
            const dataUrl = await toPng(exportCardRef.current, { pixelRatio: 2, cacheBust: true });

            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
                    <html>
                        <head><title>Print ID Card</title></head>
                        <body style="margin:0;display:flex;justify-content:center;align-items:center;height:100vh;">
                            <img src="${dataUrl}" style="width: ${isPortrait ? widthCm : heightCm}cm; height: ${isPortrait ? heightCm : widthCm}cm; max-width:100%; max-height:100%; object-fit: fill;" />
                            <script>
                                setTimeout(() => { window.print(); window.close(); }, 500);
                            </script>
                        </body>
                    </html>
                `);
                printWindow.document.close();
            }
        } catch (error) {
            console.error('Error generating Print:', error);
            alert('Oh no! Something went wrong while preparing print.');
        } finally {
            setExportingType(null);
        }
    };

    const handleClose = () => {
        setIsGenerated(false);
        setIsGenerating(false);
        setExportingType(null);
        onClose();
    };

    // --- Template Renders ---

    const renderPortrait1 = (ref: React.RefObject<HTMLDivElement | null>) => (
        <div ref={ref} className="w-[300px] h-[480px] bg-white rounded-xl overflow-hidden shadow-2xl relative border border-slate-200 shrink-0">
            {/* Header Background */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${primaryColor}, #00000055)` }}></div>
            <div className="absolute top-36 inset-x-0 h-16 bg-white -skew-y-6"></div>

            <div className="relative z-10 flex flex-col items-center pt-8">
                <div className="text-white text-center mb-4">
                    <h4 className="font-bold text-lg tracking-wider">LINCOLN HIGH</h4>
                    <p className="text-[10px] uppercase opacity-80 tracking-widest">Student Identity Card</p>
                </div>

                <div className="w-32 h-32 bg-white rounded-full p-1.5 shadow-xl mb-6">
                    <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-slate-400 overflow-hidden">
                        <UserIcon className="w-16 h-16" />
                    </div>
                </div>

                <div className="text-center px-6 w-full">
                    <h2 className="text-2xl font-black text-slate-800 leading-tight mb-1">{previewName}</h2>
                    <p className="font-bold mb-4" style={{ color: primaryColor }}>{previewGrade}</p>

                    <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 flex justify-between items-center text-left mb-6">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student ID</p>
                            <p className="font-mono font-bold text-slate-800 text-sm">{previewId}</p>
                        </div>
                        <QrCode className="w-10 h-10 text-slate-800" />
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div className="absolute bottom-0 inset-x-0 h-4" style={{ backgroundColor: primaryColor }}></div>
        </div>
    );

    const renderPortrait2 = (ref: React.RefObject<HTMLDivElement | null>) => (
        <div ref={ref} className="w-[300px] h-[480px] bg-white rounded-xl overflow-hidden shadow-2xl relative border border-slate-200 flex flex-col shrink-0">
            {/* Header section solid color */}
            <div className="h-20 flex items-center px-4" style={{ backgroundColor: primaryColor }}>
                <div className="text-white">
                    <h4 className="font-bold tracking-wider">LINCOLN HIGH</h4>
                    <p className="text-[9px] uppercase opacity-90 tracking-widest">Student Card 2026</p>
                </div>
            </div>

            <div className="flex-1 p-5 relative">
                {/* Photo shifted left */}
                <div className="w-24 h-32 bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-400 mb-4 absolute top-5 left-5">
                    <UserIcon className="w-12 h-12" />
                </div>

                <div className="pl-28 pt-2">
                    <QrCode className="w-16 h-16 text-slate-800 mb-2" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student ID</p>
                    <p className="font-mono font-bold text-slate-800 text-sm mb-4">{previewId}</p>
                </div>

                <div className="mt-24 border-t-2 pt-4" style={{ borderColor: `${primaryColor}33` }}>
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-1">{previewName}</h2>
                    <div className="flex justify-between items-end mt-4">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grade</p>
                            <p className="font-bold text-lg" style={{ color: primaryColor }}>{previewGrade}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-6 w-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#0f172a' }}>
                <p className="text-[8px] text-white/50 uppercase tracking-widest">Property of Lincoln High School</p>
            </div>
        </div>
    );

    const renderLandscape1 = (ref: React.RefObject<HTMLDivElement | null>) => (
        <div ref={ref} className="w-[480px] h-[300px] bg-white rounded-xl overflow-hidden shadow-2xl relative border border-slate-200 flex shrink-0">
            {/* Left Sidebar Dark */}
            <div className="w-[180px] flex flex-col items-center justify-center p-4 relative" style={{ backgroundColor: primaryColor }}>
                <div className="absolute top-4 left-4">
                    <p className="text-white text-xs font-bold tracking-wider opacity-60">LHS</p>
                </div>
                <div className="w-32 h-32 bg-white/10 rounded-full border-4 border-white/20 flex items-center justify-center text-white/50 mb-6 overflow-hidden mt-6">
                    <UserIcon className="w-16 h-16" />
                </div>
                <QrCode className="w-16 h-16 text-white opacity-90" />
            </div>

            {/* Right White Content */}
            <div className="flex-1 p-6 flex flex-col">
                <div className="mb-auto">
                    <h4 className="font-bold text-slate-400 text-sm tracking-wider uppercase mb-1">Lincoln High School</h4>
                    <div className="h-1 w-12 mb-6" style={{ backgroundColor: primaryColor }}></div>

                    <h2 className="text-3xl font-black text-slate-800 mb-2">{previewName}</h2>
                    <p className="text-lg font-bold mb-6" style={{ color: primaryColor }}>{previewGrade}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student ID</p>
                        <p className="font-mono font-bold text-slate-800 text-sm">{previewId}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Valid Until</p>
                        <p className="font-bold text-slate-800 text-sm">Dec 2026</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderLandscape2 = (ref: React.RefObject<HTMLDivElement | null>) => (
        <div ref={ref} className="w-[480px] h-[300px] bg-slate-50 rounded-xl overflow-hidden shadow-2xl relative border border-slate-100 flex p-4 shrink-0">
            {/* Content Left */}
            <div className="flex-1 flex flex-col z-10">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-6 h-6 rounded-md" style={{ backgroundColor: primaryColor }}></div>
                    <h4 className="font-bold text-slate-800 tracking-wider">LINCOLN HIGH</h4>
                </div>

                <div>
                    <h2 className="text-3xl font-black text-slate-800 mb-1">{previewName}</h2>
                    <p className="text-md font-medium inline-block px-3 py-1 rounded-full mb-8" style={{ color: primaryColor, backgroundColor: `${primaryColor}22` }}>{previewGrade}</p>

                    <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-white max-w-[200px] flex items-center gap-4">
                        <QrCode className="w-12 h-12 text-slate-800" />
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID Number</p>
                            <p className="font-mono font-bold text-slate-800 text-sm">{previewId}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Photo Right */}
            <div className="w-[180px] relative z-10 flex flex-col items-end">
                <div className="w-[160px] h-[220px] bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-300">
                    <UserIcon className="w-20 h-20" />
                </div>
                <div className="mt-auto flex items-center gap-2">
                    <p className="text-[8px] uppercase font-bold tracking-widest" style={{ color: primaryColor }}>Valid 2026-2027</p>
                </div>
            </div>

            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 translate-x-1/4 -translate-y-1/4" style={{ backgroundColor: primaryColor }}></div>
            <div className="absolute bottom-0 left-1/4 w-32 h-32 rounded-full blur-2xl opacity-10" style={{ backgroundColor: primaryColor }}></div>
        </div>
    );

    const renderPreview = (forExport = false) => {
        const activeRef = forExport ? exportCardRef : cardRef;

        switch (selectedDesign) {
            case 'portrait-1': return renderPortrait1(activeRef);
            case 'portrait-2': return renderPortrait2(activeRef);
            case 'landscape-1': return renderLandscape1(activeRef);
            case 'landscape-2': return renderLandscape2(activeRef);
            default: return renderPortrait1(activeRef);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-6xl h-[85vh] shadow-xl flex flex-col overflow-hidden relative z-10">

                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0 z-20">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">
                            {isBatch ? 'Batch Generate Student IDs' : 'Generate Identity Card'}
                        </h2>
                        <p className="text-sm font-medium text-slate-500">
                            {isGenerated
                                ? 'Card successfully generated! Ready for export.'
                                : (isBatch ? 'Preparing to generate IDs for multiple students.' : `Generating ID for ${student?.name}.`)}
                        </p>
                    </div>
                    <button onClick={handleClose} disabled={!!exportingType} className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors disabled:opacity-50">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left Sidebar: Templates & Settings */}
                    {!isGenerated && (
                        <div className="w-80 border-r border-slate-100 bg-slate-50 flex flex-col shrink-0">
                            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 px-2">Available Templates</h3>
                                {designs.map(design => (
                                    <button
                                        key={design.id}
                                        onClick={() => setSelectedDesign(design.id)}
                                        className={`flex items-start text-left p-4 rounded-xl border-2 transition-all ${selectedDesign === design.id
                                            ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-4 ring-indigo-600/10'
                                            : 'border-white bg-white shadow-sm hover:border-indigo-200'
                                            }`}
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className={`font-bold ${selectedDesign === design.id ? 'text-indigo-900' : 'text-slate-800'}`}>
                                                    {design.title}
                                                </h4>
                                                {selectedDesign === design.id && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                                            </div>
                                            <div className="flex gap-2 text-[10px] uppercase font-bold tracking-wider">
                                                <span className={`px-2 py-0.5 rounded ${design.type === 'Portrait' ? 'bg-blue-100 text-blue-700' : 'bg-blue-100 text-blue-700'}`}>
                                                    {design.type}
                                                </span>
                                                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                                                    {design.style}
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                ))}

                                <div className="mt-4 pt-4 border-t border-slate-200">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-2 flex items-center gap-2">
                                        <Settings2 className="w-4 h-4" /> Customization
                                    </h3>

                                    <div className="px-2 mb-4">
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Theme Color</label>
                                        <div className="flex gap-2 items-center">
                                            <input
                                                type="color"
                                                value={primaryColor}
                                                onChange={(e) => setPrimaryColor(e.target.value)}
                                                className="w-10 h-10 p-0 border-0 rounded cursor-pointer ring-1 ring-slate-200"
                                            />
                                            <span className="text-sm font-mono text-slate-500">{primaryColor}</span>
                                        </div>
                                    </div>

                                    <div className="px-2 grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Width (cm)</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={widthCm}
                                                onChange={(e) => setWidthCm(Number(e.target.value))}
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-600 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Height (cm)</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={heightCm}
                                                onChange={(e) => setHeightCm(Number(e.target.value))}
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-600 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Right Area: Preview pane / Result pane */}
                    <div className="flex-1 bg-slate-100/50 flex flex-col items-center justify-center p-8 relative overflow-hidden pattern-grid-lg">
                        {!isGenerated ? (
                            <>
                                <div className="absolute top-6 left-6 flex items-center gap-2">
                                    <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live Preview</span>
                                </div>

                                {/* Preview Wrapper */}
                                <div className="relative shadow-xl flex items-center justify-center transition-all duration-300 transform scale-90 md:scale-100 origin-center">
                                    {renderPreview(false)}
                                </div>
                            </>
                        ) : (
                            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-slate-100">
                                <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-black text-slate-800 mb-3">Card Ready!</h3>
                                <p className="text-slate-500 mb-10 max-w-lg text-lg">
                                    The ID card has been generated successfully. You can now download it as an image, save it as a PDF, or print it directly.
                                </p>

                                <div className="flex gap-6">
                                    <button
                                        onClick={handleDownloadImage}
                                        disabled={!!exportingType}
                                        className={`flex flex-col items-center justify-center gap-3 w-40 h-40 bg-slate-50 ${exportingType && exportingType !== 'image' ? 'opacity-50' : 'hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200'} border-2 border-slate-100 rounded-2xl transition-all group`}
                                    >
                                        {exportingType === 'image'
                                            ? <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                                            : <Download className="w-10 h-10 text-slate-400 group-hover:text-indigo-600 transition-colors" />}
                                        <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-600">
                                            {exportingType === 'image' ? 'Processing...' : 'Image (PNG)'}
                                        </span>
                                    </button>

                                    <button
                                        onClick={handleDownloadPDF}
                                        disabled={!!exportingType}
                                        className={`flex flex-col items-center justify-center gap-3 w-40 h-40 bg-slate-50 ${exportingType && exportingType !== 'pdf' ? 'opacity-50' : 'hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200'} border-2 border-slate-100 rounded-2xl transition-all group`}
                                    >
                                        {exportingType === 'pdf'
                                            ? <Loader2 className="w-10 h-10 text-rose-500 animate-spin" />
                                            : <FileText className="w-10 h-10 text-slate-400 group-hover:text-rose-600 transition-colors" />}
                                        <span className="text-sm font-bold text-slate-600 group-hover:text-rose-600">
                                            {exportingType === 'pdf' ? 'Processing...' : 'PDF Document'}
                                        </span>
                                    </button>

                                    <button
                                        onClick={handlePrint}
                                        disabled={!!exportingType}
                                        className={`flex flex-col items-center justify-center gap-3 w-40 h-40 bg-slate-50 ${exportingType && exportingType !== 'print' ? 'opacity-50' : 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'} border-2 border-slate-100 rounded-2xl transition-all group`}
                                    >
                                        {exportingType === 'print'
                                            ? <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                                            : <Printer className="w-10 h-10 text-slate-400 group-hover:text-blue-600 transition-colors" />}
                                        <span className="text-sm font-bold text-slate-600 group-hover:text-blue-600">
                                            {exportingType === 'print' ? 'Preparing...' : 'Print Card'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                {!isGenerated && (
                    <div className="border-t border-slate-200 p-4 bg-white flex justify-end gap-3 shrink-0">
                        <button
                            onClick={handleClose}
                            className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className={`flex items-center gap-2 px-8 py-2.5 rounded-xl font-bold text-white transition-all shadow-md active:scale-95 ${isGenerating ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'
                                }`}
                        >
                            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <QrCode className="w-5 h-5" />}
                            {isGenerating ? 'Generating...' : 'Confirm & Generate'}
                        </button>
                    </div>
                )}

            </div>

            {/* Hidden container for rendering the actual full-size card for export.
                Positioned fixed and completely visible to DOM parsing, but offscreen so user doesn't see it.
                html-to-image uses natural node rendering. */}
            {isGenerated && (
                <div style={{ position: 'fixed', top: '-4000px', left: '-4000px', zIndex: -10, pointerEvents: 'none' }}>
                    {renderPreview(true)}
                </div>
            )}
        </div>
    );
};
