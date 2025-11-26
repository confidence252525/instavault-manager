
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MessageCleaner from './components/MessageCleaner';
import BackupAnalyzer from './components/BackupAnalyzer';
import Packages from './components/Packages';
import Settings from './components/Settings';
import ProfileSettings from './components/ProfileSettings';
import PrivacySettings from './components/PrivacySettings';
import BottomNav from './components/BottomNav';
import Intro from './components/Intro';
import { ViewState } from './types';
import { Shield, Download, MessageCircle, Key, Loader2, ArrowRight } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [showIntro, setShowIntro] = useState(true);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [apiKeyReady, setApiKeyReady] = useState(false);
  const [checkingKey, setCheckingKey] = useState(true);
  const [manualKey, setManualKey] = useState('');

  useEffect(() => {
    const checkKey = async () => {
      // 1. Check Local Storage first (for deployed apps)
      const storedKey = localStorage.getItem('gemini_api_key');
      if (storedKey) {
        setApiKeyReady(true);
        setCheckingKey(false);
        return;
      }

      // 2. Check AI Studio Environment
      if (window.aistudio) {
        try {
          const hasKey = await window.aistudio.hasSelectedApiKey();
          setApiKeyReady(hasKey);
        } catch (e) {
          console.error("Failed to check API key:", e);
          setApiKeyReady(false);
        }
      } else {
        // 3. Check Environment Variable
        setApiKeyReady(!!process.env.API_KEY);
      }
      setCheckingKey(false);
    };
    
    checkKey();

    const handler = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      try {
        await window.aistudio.openSelectKey();
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setApiKeyReady(hasKey);
      } catch (e) {
        console.error("Key selection failed:", e);
        setApiKeyReady(false);
      }
    }
  };

  const handleManualSave = () => {
    if (manualKey.trim().length > 10) {
      localStorage.setItem('gemini_api_key', manualKey.trim());
      setApiKeyReady(true);
    } else {
      alert("Please enter a valid API Key.");
    }
  };

  const handleInstall = () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    installPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setInstallPrompt(null);
      }
    });
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard onNavigate={setCurrentView} />;
      case ViewState.MESSAGES:
        return <MessageCleaner />;
      case ViewState.BACKUP_ANALYSIS:
        return <BackupAnalyzer />;
      case ViewState.PACKAGES:
        return <Packages />;
      case ViewState.SETTINGS:
        return <Settings onNavigate={setCurrentView} installPrompt={installPrompt} onInstall={handleInstall} />;
      case ViewState.PROFILE:
        return <ProfileSettings onNavigate={setCurrentView} />;
      case ViewState.PRIVACY:
        return <PrivacySettings onNavigate={setCurrentView} />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  const getPageTitle = () => {
    switch (currentView) {
      case ViewState.DASHBOARD: return 'Overview';
      case ViewState.MESSAGES: return 'Cleaner';
      case ViewState.BACKUP_ANALYSIS: return 'Analysis';
      case ViewState.PACKAGES: return 'Premium Plans';
      case ViewState.SETTINGS: return 'Settings';
      case ViewState.PROFILE: return 'Edit Profile';
      case ViewState.PRIVACY: return 'Privacy';
      default: return 'InstaVault';
    }
  };

  if (checkingKey) {
    return (
      <div className="min-h-screen bg-canvas-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-primary-500" size={32} />
      </div>
    );
  }

  if (!apiKeyReady) {
    return (
      <div className="min-h-screen bg-canvas-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-canvas-900 border border-canvas-800 rounded-3xl p-8 text-center shadow-2xl animate-fade-in">
          <div className="w-20 h-20 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Key className="text-primary-400" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Connect API Key</h2>
          <p className="text-canvas-400 mb-6 leading-relaxed text-sm">
            To use the AI features, please provide your Gemini API Key.
          </p>
          
          {/* AI Studio Selection (Hidden on Mobile/Deployed usually) */}
          {window.aistudio && (
            <div className="mb-6">
                <button 
                    onClick={handleSelectKey}
                    className="w-full py-3 bg-canvas-800 hover:bg-canvas-700 text-white rounded-xl font-medium transition-all border border-canvas-700 flex items-center justify-center gap-2 mb-4"
                >
                    <Key size={18} /> Select via Google Cloud
                </button>
                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-canvas-800"></div>
                    <span className="flex-shrink-0 mx-4 text-canvas-600 text-xs">OR ENTER MANUALLY</span>
                    <div className="flex-grow border-t border-canvas-800"></div>
                </div>
            </div>
          )}

          {/* Manual Entry */}
          <div className="space-y-3">
             <input 
                type="password" 
                placeholder="Paste your API Key here (AIza...)"
                className="w-full bg-canvas-950 border border-canvas-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors text-center"
                value={manualKey}
                onChange={(e) => setManualKey(e.target.value)}
             />
             <button 
                onClick={handleManualSave}
                disabled={manualKey.length < 10}
                className="w-full py-3 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all shadow-lg shadow-primary-600/20 flex items-center justify-center gap-2"
             >
                Connect App <ArrowRight size={18} />
             </button>
          </div>

          <p className="text-xs text-canvas-600 mt-6">
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="underline hover:text-canvas-400">
              Get an API Key
            </a>
          </p>
        </div>
      </div>
    );
  }

  if (showIntro) {
    return <Intro onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="min-h-screen bg-canvas-950 text-canvas-200 font-sans selection:bg-primary-500/30 transition-colors duration-500">
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        installPrompt={installPrompt}
        onInstall={handleInstall}
      />
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-canvas-900/90 backdrop-blur-md border-b border-canvas-800 z-20 px-4 py-3 flex items-center justify-between shadow-lg shadow-black/20">
         <div className="flex items-center gap-3">
            {currentView === ViewState.DASHBOARD && (
                <div className="relative w-8 h-8 flex items-center justify-center bg-black/40 rounded-lg border border-green-500/20 overflow-hidden">
                    <div className="absolute inset-0 bg-green-500/10 blur-sm rounded-full"></div>
                    <div className="absolute inset-[1px] border border-green-500/40 rounded-full opacity-70"></div>
                    <MessageCircle size={16} className="text-green-400 relative z-10" strokeWidth={2.5} />
                </div>
            )}
            <span className="font-bold text-white text-lg tracking-wide">{getPageTitle()}</span>
         </div>
         {installPrompt && (
            <button 
              onClick={handleInstall}
              className="p-2 bg-primary-600/20 text-primary-400 rounded-full hover:bg-primary-600 hover:text-white transition-colors"
              title="Install App"
            >
              <Download size={20} />
            </button>
         )}
      </div>

      {/* Main Content Area */}
      <main className="md:ml-64 p-4 pt-20 md:pt-6 md:p-8 min-h-screen pb-24">
        <div className="max-w-5xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav currentView={currentView} onNavigate={setCurrentView} />
    </div>
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
