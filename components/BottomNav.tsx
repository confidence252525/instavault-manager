import React from 'react';
import { LayoutDashboard, Eraser, Settings, FileText } from 'lucide-react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: ViewState.DASHBOARD, icon: LayoutDashboard, label: 'Home' },
    { id: ViewState.MESSAGES, icon: Eraser, label: 'Cleaner' },
    { id: ViewState.BACKUP_ANALYSIS, icon: FileText, label: 'Analysis' },
    { id: ViewState.SETTINGS, icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-canvas-900/95 backdrop-blur-md border-t border-canvas-800 px-8 py-4 flex justify-between items-center z-30 pb-8 shadow-2xl transition-colors duration-500">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex flex-col items-center gap-1 transition-all duration-300 relative ${
            currentView === item.id ? 'text-primary-400 scale-110' : 'text-canvas-500 hover:text-canvas-300'
          }`}
        >
          <item.icon size={26} strokeWidth={currentView === item.id ? 2.5 : 2} />
          {currentView === item.id && (
            <span className="absolute -bottom-3 w-1 h-1 bg-primary-400 rounded-full"></span>
          )}
        </button>
      ))}
    </div>
  );
};

export default BottomNav;