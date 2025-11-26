import React, { useState, useEffect } from 'react';
import { User, Lock, Bell, HelpCircle, ChevronRight, Moon, Smartphone, Shield, Download, Info, ChevronDown, Palette, Key, Save, Check } from 'lucide-react';
import { ViewState } from '../types';
import { useTheme, ThemeName } from '../contexts/ThemeContext';

interface SettingsProps {
  onNavigate: (view: ViewState) => void;
  installPrompt?: any;
  onInstall?: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onNavigate, installPrompt, onInstall }) => {
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { theme, setTheme } = useTheme();
  
  // API Key State
  const [apiKey, setApiKey] = useState('');
  const [keySaved, setKeySaved] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) setApiKey(storedKey);
  }, []);

  const handleSaveKey = () => {
      if (apiKey.trim().length > 10) {
          localStorage.setItem('gemini_api_key', apiKey.trim());
          setKeySaved(true);
          setTimeout(() => setKeySaved(false), 2000);
      } else {
          alert("Please enter a valid API Key.");
      }
  };

  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
    setter(!value);
  };

  const handleInfoClick = (title: string, message: string) => {
    alert(`${title}\n\n${message}`);
  };

  const themes: { id: ThemeName; label: string; color: string }[] = [
    { id: 'cyber', label: 'Cyber', color: 'bg-[#6366f1]' },
    { id: 'forest', label: 'Forest', color: 'bg-[#10b981]' },
    { id: 'ocean', label: 'Ocean', color: 'bg-[#0ea5e9]' },
    { id: 'sunset', label: 'Sunset', color: 'bg-[#f97316]' },
  ];

  return (
    <div className="animate-fade-in max-w-2xl mx-auto pb-10">
      <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
      
      {/* Profile Card */}
      <div 
        onClick={() => onNavigate(ViewState.PROFILE)}
        className="bg-canvas-800/50 hover:bg-canvas-800 border border-canvas-700 rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all mb-6"
      >
        <img 
          src="https://picsum.photos/200/200" 
          alt="Profile" 
          className="w-16 h-16 rounded-full object-cover border-2 border-primary-500" 
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">Alex Designer</h3>
          <p className="text-canvas-400 text-sm">alex_design • Free Plan</p>
        </div>
        <ChevronRight className="text-canvas-500" />
      </div>

      {/* Settings Groups */}
      <div className="space-y-6">

        {/* API Key Configuration */}
        <div>
           <h4 className="text-canvas-500 text-xs font-semibold uppercase tracking-wider mb-3 px-2">API Configuration</h4>
           <div className="bg-canvas-800/50 border border-canvas-700 rounded-2xl overflow-hidden p-4">
              <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-canvas-700/50 text-primary-400">
                      <Key size={18} />
                  </div>
                  <span className="font-medium text-canvas-200">Gemini API Key</span>
              </div>
              <div className="flex gap-2">
                  <input 
                    type="password" 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Paste your AIza... key here"
                    className="flex-1 bg-canvas-900 border border-canvas-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary-500 text-sm"
                  />
                  <button 
                    onClick={handleSaveKey}
                    className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${keySaved ? 'bg-emerald-600 text-white' : 'bg-primary-600 hover:bg-primary-500 text-white'}`}
                  >
                    {keySaved ? <Check size={16} /> : <Save size={16} />}
                    {keySaved ? 'Saved' : 'Save'}
                  </button>
              </div>
              <p className="text-xs text-canvas-500 mt-2">
                  Required for Backup Analysis. The key is stored locally on your device.
              </p>
           </div>
        </div>
        
        {/* Group 1: Account & Security */}
        <div>
           <h4 className="text-canvas-500 text-xs font-semibold uppercase tracking-wider mb-3 px-2">Account & Security</h4>
           <div className="bg-canvas-800/50 border border-canvas-700 rounded-2xl overflow-hidden">
             <SettingsItem 
               icon={User} 
               label="Personal Information" 
               onClick={() => onNavigate(ViewState.PROFILE)} 
             />
             <SettingsItem 
               icon={Lock} 
               label="Privacy & Security" 
               onClick={() => onNavigate(ViewState.PRIVACY)} 
               hasBorder 
             />
             <SettingsItem 
               icon={Shield} 
               label="Subscription Plan" 
               onClick={() => onNavigate(ViewState.PACKAGES)} 
               hasBorder 
               value="Starter"
             />
           </div>
        </div>

        {/* Group 2: App Settings */}
        <div>
           <h4 className="text-canvas-500 text-xs font-semibold uppercase tracking-wider mb-3 px-2">Preferences</h4>
           <div className="bg-canvas-800/50 border border-canvas-700 rounded-2xl overflow-hidden">
             
             {/* Theme Selector */}
             <div className="p-4 flex flex-col gap-3 hover:bg-canvas-700/50 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-canvas-700/50 text-primary-400">
                        <Palette size={18} />
                    </div>
                    <span className="font-medium text-canvas-200">App Theme</span>
                </div>
                <div className="flex gap-2 pl-12 flex-wrap">
                    {themes.map((t) => (
                        <button 
                            key={t.id}
                            onClick={() => setTheme(t.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm border flex items-center gap-2 transition-all ${
                                theme === t.id 
                                ? 'bg-primary-500/10 border-primary-500 text-primary-400' 
                                : 'bg-canvas-900 border-canvas-700 text-canvas-400 hover:border-canvas-600'
                            }`}
                        >
                            <div className={`w-2 h-2 rounded-full ${t.color}`}></div>
                            {t.label}
                        </button>
                    ))}
                </div>
             </div>

             <SettingsItem 
                icon={Bell} 
                label="Notifications" 
                onClick={() => handleToggle(setNotificationsEnabled, notificationsEnabled)} 
                toggle
                checked={notificationsEnabled}
                hasBorder
            />
             {installPrompt && (
                <SettingsItem 
                  icon={Download} 
                  label="Install App" 
                  onClick={onInstall || (() => {})} 
                  hasBorder 
                  value="Available"
                  highlight
                />
             )}
             {!installPrompt && (
                <div className="border-t border-canvas-700/50">
                    <div 
                        onClick={() => setShowInstallGuide(!showInstallGuide)}
                        className="flex items-center justify-between p-4 hover:bg-canvas-700/50 transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-canvas-700/50 rounded-lg text-primary-400">
                                <Smartphone size={18} />
                            </div>
                            <span className="text-canvas-200 font-medium">Install Mobile App</span>
                        </div>
                        {showInstallGuide ? <ChevronDown size={18} className="text-canvas-500" /> : <ChevronRight size={18} className="text-canvas-500" />}
                    </div>
                    {showInstallGuide && (
                        <div className="p-4 bg-canvas-900/50 text-sm text-canvas-400 border-t border-canvas-800 leading-relaxed">
                            <p className="mb-2"><strong className="text-white">iOS (iPhone):</strong> Tap the <span className="text-blue-400">Share</span> button in Safari and select <span className="text-white">"Add to Home Screen"</span>.</p>
                            <p><strong className="text-white">Android:</strong> Tap the <span className="text-blue-400">Menu</span> (3 dots) and select <span className="text-white">"Install App"</span> or <span className="text-white">"Add to Home Screen"</span>.</p>
                        </div>
                    )}
                </div>
             )}
           </div>
        </div>

        {/* Group 3: Support */}
        <div>
           <h4 className="text-canvas-500 text-xs font-semibold uppercase tracking-wider mb-3 px-2">Support</h4>
           <div className="bg-canvas-800/50 border border-canvas-700 rounded-2xl overflow-hidden">
             <SettingsItem 
                icon={HelpCircle} 
                label="Help Center" 
                onClick={() => handleInfoClick("Help Center", "For support, please email support@instavault.app")} 
            />
             <SettingsItem 
                icon={Info} 
                label="About InstaVault" 
                onClick={() => handleInfoClick("About", "InstaVault v1.0.2\nBuild 2023.10.27\n\nDesigned for privacy and control.")} 
                hasBorder 
            />
           </div>
        </div>
        
        <div className="text-center pt-4 pb-8">
           <p className="text-canvas-600 text-xs">InstaVault v1.0.2 (PWA)</p>
        </div>

      </div>
    </div>
  );
};

interface SettingsItemProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  hasBorder?: boolean;
  value?: string;
  toggle?: boolean;
  checked?: boolean;
  highlight?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon: Icon, label, onClick, hasBorder, value, toggle, checked, highlight }) => (
  <div 
    onClick={onClick}
    className={`flex items-center justify-between p-4 hover:bg-canvas-700/50 transition-colors cursor-pointer ${hasBorder ? 'border-t border-canvas-700/50' : ''} ${highlight ? 'bg-primary-900/10' : ''}`}
  >
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${highlight ? 'bg-primary-500 text-white' : 'bg-canvas-700/50 text-primary-400'}`}>
        <Icon size={18} />
      </div>
      <span className={`font-medium ${highlight ? 'text-primary-300' : 'text-canvas-200'}`}>{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {value && <span className="text-canvas-500 text-sm">{value}</span>}
      {toggle ? (
        <div className={`w-11 h-6 rounded-full relative transition-colors ${checked ? 'bg-primary-600' : 'bg-canvas-600'}`}>
           <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${checked ? 'right-1' : 'left-1'}`}></div>
        </div>
      ) : (
        <ChevronRight className="text-canvas-500" size={18} />
      )}
    </div>
  </div>
);

export default Settings;