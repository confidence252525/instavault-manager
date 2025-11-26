import React from 'react';
import { LayoutDashboard, Eraser, FileText, Settings, LogOut, CreditCard, Download, MessageCircle } from 'lucide-react';
import { ViewState } from '../types';
import { NAV_ITEMS } from '../constants';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  installPrompt?: any;
  onInstall?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, installPrompt, onInstall }) => {
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'LayoutDashboard': return <LayoutDashboard size={20} />;
      case 'Eraser': return <Eraser size={20} />;
      case 'FileText': return <FileText size={20} />;
      case 'CreditCard': return <CreditCard size={20} />;
      default: return <LayoutDashboard size={20} />;
    }
  };

  const handleDisconnect = () => {
    if (window.confirm("Are you sure you want to disconnect and log out?")) {
        window.location.reload(); 
    }
  };

  return (
    <div className="w-64 h-screen bg-canvas-900 border-r border-canvas-800 flex flex-col fixed left-0 top-0 z-10 hidden md:flex transition-colors duration-500">
      <div className="p-6 flex items-center gap-3">
        {/* New Logo: Neon Green Radar Chat */}
        <div className="relative w-10 h-10 flex items-center justify-center bg-black/40 rounded-xl border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.15)] group overflow-hidden">
            {/* Radar effect */}
            <div className="absolute inset-0 bg-green-500/10 blur-md rounded-full"></div>
            <div className="absolute inset-[2px] border border-green-500/40 rounded-full opacity-70"></div>
            <div className="absolute inset-[6px] border border-green-500/20 rounded-full"></div>
            
            {/* Icon */}
            <MessageCircle 
              size={20} 
              className="text-green-400 relative z-10 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]" 
              strokeWidth={2.5}
            />
        </div>
        
        <h1 className="text-xl font-bold text-white tracking-tight">
          Insta<span className="text-green-400">Vault</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as ViewState)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              currentView === item.id
                ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30'
                : 'text-canvas-400 hover:bg-canvas-800 hover:text-canvas-200'
            }`}
          >
            {getIcon(item.icon)}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-canvas-800 space-y-1">
        {installPrompt && (
            <button 
              onClick={onInstall}
              className="w-full flex items-center gap-3 px-4 py-3 text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-colors mb-2"
            >
              <Download size={20} />
              <span>Install App</span>
            </button>
        )}
        
        <button 
          onClick={() => onNavigate(ViewState.SETTINGS)}
          className={`w-full flex items-center gap-3 px-4 py-3 transition-colors rounded-xl hover:bg-canvas-800 ${
            currentView === ViewState.SETTINGS || currentView === ViewState.PROFILE || currentView === ViewState.PRIVACY
              ? 'text-primary-400'
              : 'text-canvas-400 hover:text-canvas-200'
          }`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </button>
        <button 
          onClick={handleDisconnect}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
        >
          <LogOut size={20} />
          <span>Disconnect</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;