import React, { useState } from 'react';
import { ArrowLeft, Lock, Eye, ShieldAlert, Search, UserX, History, Download, Loader2, CheckCircle2 } from 'lucide-react';
import { ViewState } from '../types';

interface PrivacySettingsProps {
  onNavigate: (view: ViewState) => void;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({ onNavigate }) => {
  const [downloading, setDownloading] = useState(false);
  const [clearing, setClearing] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    // Simulate API call
    setTimeout(() => {
        setDownloading(false);
        alert("Data archive prepared! Check your email for the download link.");
    }, 2000);
  };

  const handleClearHistory = () => {
      if (window.confirm("Are you sure you want to clear your local search history? This cannot be undone.")) {
        setClearing(true);
        setTimeout(() => {
            setClearing(false);
            alert("Search history cleared successfully.");
        }, 1500);
      }
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => onNavigate(ViewState.SETTINGS)}
          className="p-2 hover:bg-canvas-800 rounded-full text-canvas-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-white">Privacy & Security</h2>
      </div>

      <div className="space-y-6">
        
        {/* Visibility Section */}
        <div>
          <h3 className="text-primary-400 text-sm font-bold uppercase tracking-wider mb-3 px-2">Account Privacy</h3>
          <div className="bg-canvas-800/50 border border-canvas-700 rounded-2xl overflow-hidden">
            <ToggleItem 
              icon={Lock} 
              label="Private Account" 
              description="Only people you approve can see your photos and videos."
              defaultChecked={false}
            />
            <ToggleItem 
              icon={Eye} 
              label="Activity Status" 
              description="Allow accounts you follow to see when you were last active."
              defaultChecked={true}
              hasBorder
            />
          </div>
        </div>

        {/* Data & AI Section */}
        <div>
          <h3 className="text-primary-400 text-sm font-bold uppercase tracking-wider mb-3 px-2">Data & AI Analysis</h3>
          <div className="bg-canvas-800/50 border border-canvas-700 rounded-2xl overflow-hidden">
            <ToggleItem 
              icon={Search} 
              label="Allow Gemini Analysis" 
              description="Let AI analyze your message backups for insights."
              defaultChecked={true}
            />
            <ToggleItem 
              icon={History} 
              label="Store Analysis History" 
              description="Keep a local log of previous risk assessments."
              defaultChecked={true}
              hasBorder
            />
          </div>
        </div>

        {/* Actions Section */}
        <div>
           <h3 className="text-primary-400 text-sm font-bold uppercase tracking-wider mb-3 px-2">Actions</h3>
           <div className="bg-canvas-800/50 border border-canvas-700 rounded-2xl overflow-hidden">
             <ActionItem 
                icon={UserX} 
                label="Blocked Accounts" 
                count={12} 
                onClick={() => alert("Blocked Accounts list is empty in this demo.")} 
            />
             <ActionItem 
                icon={downloading ? Loader2 : Download} 
                label={downloading ? "Preparing Archive..." : "Download Your Data"} 
                hasBorder 
                onClick={handleDownload}
                isLoading={downloading}
            />
             <ActionItem 
                icon={clearing ? Loader2 : ShieldAlert} 
                label={clearing ? "Clearing..." : "Clear Search History"} 
                hasBorder 
                isDestructive 
                onClick={handleClearHistory}
                isLoading={clearing}
            />
           </div>
        </div>

      </div>
    </div>
  );
};

const ToggleItem = ({ icon: Icon, label, description, defaultChecked, hasBorder }: any) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className={`p-4 flex items-start justify-between hover:bg-canvas-700/20 transition-colors ${hasBorder ? 'border-t border-canvas-700/50' : ''}`}>
      <div className="flex gap-3">
        <div className="mt-1 text-canvas-400">
           <Icon size={20} />
        </div>
        <div>
           <h4 className="text-white font-medium">{label}</h4>
           <p className="text-canvas-400 text-xs mt-1 pr-8 leading-relaxed">{description}</p>
        </div>
      </div>
      <button 
        onClick={() => setChecked(!checked)}
        className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 ${checked ? 'bg-primary-600' : 'bg-canvas-600'}`}
      >
         <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${checked ? 'right-1' : 'left-1'}`}></div>
      </button>
    </div>
  );
};

const ActionItem = ({ icon: Icon, label, count, hasBorder, isDestructive, onClick, isLoading }: any) => (
  <div 
    onClick={isLoading ? undefined : onClick}
    className={`flex items-center justify-between p-4 hover:bg-canvas-700/50 cursor-pointer transition-colors ${hasBorder ? 'border-t border-canvas-700/50' : ''}`}
  >
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${isDestructive ? 'bg-red-500/10 text-red-400' : 'bg-canvas-700/50 text-canvas-300'}`}>
        <Icon size={18} className={isLoading ? 'animate-spin' : ''} />
      </div>
      <span className={`font-medium ${isDestructive ? 'text-red-400' : 'text-canvas-200'}`}>{label}</span>
    </div>
    <div className="flex items-center gap-2 text-canvas-500">
       {count && <span className="text-sm">{count}</span>}
       {!isLoading && <ArrowLeft size={16} className="rotate-180" />}
    </div>
  </div>
);

export default PrivacySettings;