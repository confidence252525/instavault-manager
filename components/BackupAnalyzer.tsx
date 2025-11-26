import React, { useState, useRef } from 'react';
import { FileJson, UploadCloud, Sparkles, AlertOctagon, CheckCircle2, Loader2, AlertTriangle, FileText, X, Upload } from 'lucide-react';
import { analyzeBackupData } from '../services/geminiService';
import { AnalysisResult } from '../types';

const BackupAnalyzer: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const analysis = await analyzeBackupData(inputText);
      setResult(analysis);
    } catch (err) {
      setError("Failed to analyze data. Ensure API Key is valid.");
    } finally {
      setLoading(false);
    }
  };

  const handleSampleData = () => {
      const sample = "User: alex_design\nMessage: Hey, did you get the files?\nTimestamp: 2023-10-27 10:30 AM\n\nUser: Me\nMessage: Yes, downloading now. By the way, I think the project deadline is too tight.\nTimestamp: 2023-10-27 10:32 AM\n\nUser: Me\nMessage: I'm worried about the privacy policy update. It looks sketchy.\nTimestamp: 2023-10-27 10:35 AM";
      setInputText(sample);
      setFileName("sample_data.txt");
      setResult(null);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check file type
    if (file.type !== "application/json" && file.type !== "text/plain" && !file.name.endsWith('.json') && !file.name.endsWith('.txt')) {
      setError("Please upload a valid JSON or Text file.");
      return;
    }

    setError(null);
    setFileName(file.name);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setInputText(e.target.result as string);
      }
    };
    reader.readAsText(file);
  };

  const clearFile = () => {
    setInputText('');
    setFileName(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="text-primary-400" /> Backup Intelligence
        </h2>
        <p className="text-canvas-400 mt-1">Upload your Instagram data export (JSON) to detect sensitive information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="flex flex-col h-auto min-h-[500px] gap-4">
            
            {/* File Upload Zone */}
            <div 
                className={`relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                    dragActive 
                    ? 'border-primary-500 bg-primary-500/10' 
                    : 'border-canvas-700 bg-canvas-800/50 hover:bg-canvas-800 hover:border-canvas-600'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input 
                    ref={fileInputRef}
                    type="file" 
                    className="hidden" 
                    onChange={handleChange}
                    accept=".json,.txt"
                />
                
                {fileName ? (
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-2xl bg-primary-500/20 flex items-center justify-center">
                            <FileJson size={32} className="text-primary-400" />
                        </div>
                        <div>
                            <p className="text-white font-medium text-lg">{fileName}</p>
                            <p className="text-canvas-400 text-sm">Ready to analyze</p>
                        </div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); clearFile(); }}
                            className="mt-2 px-4 py-2 bg-canvas-700 hover:bg-canvas-600 rounded-lg text-sm text-white transition-colors flex items-center gap-2"
                        >
                            <X size={14} /> Remove File
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="w-16 h-16 rounded-full bg-canvas-700/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <UploadCloud size={32} className="text-canvas-400 group-hover:text-primary-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Upload Backup File</h3>
                        <p className="text-canvas-400 text-sm max-w-xs mb-4">
                            Drag & drop your <span className="text-primary-400 font-mono">messages.json</span> file here, or click to browse.
                        </p>
                        <p className="text-xs text-canvas-500">Supported formats: JSON, TXT</p>
                    </>
                )}
            </div>

            {/* Text Area Fallback */}
            <div className="bg-canvas-800/50 rounded-2xl border border-canvas-700 p-4 flex-1 flex flex-col">
                <div className="flex justify-between mb-2">
                    <h3 className="text-white text-sm font-semibold flex items-center gap-2">
                        <FileText size={16} className="text-blue-400" /> File Content Preview
                    </h3>
                    <button onClick={handleSampleData} className="text-xs text-primary-400 hover:text-primary-300 underline">
                        Load Sample
                    </button>
                </div>
                <textarea 
                    className="flex-1 bg-canvas-900/50 border border-canvas-700 rounded-xl p-4 text-sm text-canvas-300 font-mono resize-none focus:outline-none focus:border-primary-500 mb-4 min-h-[150px]"
                    placeholder="Content will appear here after upload..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                ></textarea>
                
                {error && <p className="text-red-400 text-sm mb-3 text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">{error}</p>}

                <button 
                    onClick={handleAnalyze}
                    disabled={loading || !inputText}
                    className="w-full py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary-900/20"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" /> Analyzing Data...
                        </>
                    ) : (
                        <>
                            <Sparkles size={20} /> Analyze with Gemini AI
                        </>
                    )}
                </button>
            </div>
        </div>

        {/* Results Section */}
        <div className="bg-canvas-800/50 rounded-2xl border border-canvas-700 p-6 h-auto min-h-[500px] overflow-y-auto relative">
           {!result ? (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-canvas-500 p-6 text-center">
                   <div className="w-20 h-20 border-2 border-dashed border-canvas-700 rounded-2xl flex items-center justify-center mb-4 bg-canvas-900/30">
                        <Sparkles size={32} className="opacity-30" />
                   </div>
                   <h4 className="text-lg font-medium text-canvas-400 mb-2">No Analysis Yet</h4>
                   <p className="text-sm max-w-xs">Upload a file and click analyze to see insights about your digital footprint.</p>
               </div>
           ) : (
               <div className="space-y-6">
                    {/* Risk Score */}
                    <div className="flex items-center justify-between p-4 bg-canvas-900 rounded-xl border border-canvas-800">
                        <span className="text-canvas-400">Privacy Risk Level</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 ${
                            result.riskLevel === 'High' ? 'bg-red-500/20 text-red-400' : 
                            result.riskLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 
                            'bg-emerald-500/20 text-emerald-400'
                        }`}>
                            {result.riskLevel === 'High' && <AlertTriangle size={14} />}
                            {result.riskLevel === 'Low' && <CheckCircle2 size={14} />}
                            {result.riskLevel}
                        </span>
                    </div>

                    {/* Summary */}
                    <div className="bg-primary-900/10 rounded-xl p-4 border border-primary-500/10">
                        <h4 className="text-primary-400 text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                            <FileText size={14} /> Executive Summary
                        </h4>
                        <p className="text-canvas-300 leading-relaxed text-sm">{result.summary}</p>
                    </div>

                    {/* Sentiment */}
                    <div>
                        <h4 className="text-canvas-500 text-xs font-bold uppercase tracking-wider mb-3">Communication Style</h4>
                        <div className="bg-canvas-700/30 rounded-xl p-4 text-canvas-200 border-l-4 border-purple-500">
                            {result.sentiment}
                        </div>
                    </div>

                    {/* Topics */}
                    <div>
                         <h4 className="text-canvas-500 text-xs font-bold uppercase tracking-wider mb-3">Detected Topics</h4>
                         <div className="flex flex-wrap gap-2">
                             {result.topics.map((topic, idx) => (
                                 <span key={idx} className="px-3 py-1 bg-canvas-800 hover:bg-canvas-700 transition-colors text-primary-300 text-sm rounded-lg border border-canvas-700">
                                     #{topic}
                                 </span>
                             ))}
                         </div>
                    </div>

                    <div className="pt-4 border-t border-canvas-700/50">
                        <p className="text-xs text-canvas-500 text-center">
                            Analysis performed locally by Gemini AI. No data is permanently stored on our servers.
                        </p>
                    </div>
               </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default BackupAnalyzer;