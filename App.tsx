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

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

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