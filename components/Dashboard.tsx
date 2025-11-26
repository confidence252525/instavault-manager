import React from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import { MessageSquare, Trash2, ShieldCheck, HardDrive, Bell, Zap, Activity, Search } from 'lucide-react';
import { ViewState } from '../types';

const data = [
  { name: 'Mon', activity: 20 },
  { name: 'Tue', activity: 45 },
  { name: 'Wed', activity: 30 },
  { name: 'Thu', activity: 80 },
  { name: 'Fri', activity: 55 },
  { name: 'Sat', activity: 90 },
  { name: 'Sun', activity: 40 },
];

interface DashboardProps {
    onNavigate: (view: ViewState) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  
  const handleBellClick = () => {
    alert("You're all caught up! No new notifications.");
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* Mobile-style Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
            <h2 className="text-canvas-400 text-sm font-medium">Good Morning,</h2>
            <h1 className="text-2xl font-bold text-white">Alex Designer</h1>
        </div>
        <button 
            onClick={handleBellClick}
            className="p-2 bg-canvas-800 rounded-full relative cursor-pointer hover:bg-canvas-700 transition-colors"
        >
            <Bell size={20} className="text-canvas-200" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-canvas-800"></span>
        </button>
      </div>

      {/* Safety Widget Card */}
      <div className="bg-gradient-to-br from-primary-600 to-purple-700 rounded-3xl p-6 relative overflow-hidden shadow-xl shadow-primary-900/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black opacity-10 rounded-full -ml-10 -mb-10 blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 flex justify-between items-start">
            <div>
                <p className="text-primary-100 text-sm font-medium mb-1">Digital Safety Score</p>
                <h2 className="text-4xl font-bold text-white">85%</h2>
                <p className="text-primary-200 text-xs mt-2 flex items-center gap-1">
                    <ShieldCheck size={12} /> Your account is mostly secure
                </p>
            </div>
            <div className="h-16 w-16 rounded-full border-4 border-white/20 flex items-center justify-center">
                <Activity className="text-white" size={24} />
            </div>
          </div>
          
          <div className="mt-6 bg-black/20 rounded-xl p-3 flex items-center justify-between backdrop-blur-sm">
             <span className="text-primary-100 text-xs">Last scan: 2h ago</span>
             <button 
                onClick={() => onNavigate(ViewState.BACKUP_ANALYSIS)}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded-lg transition-colors"
             >
                Scan Now
             </button>
          </div>
      </div>

      {/* Quick Actions */}
      <div>
          <h3 className="text-canvas-400 text-sm font-bold uppercase tracking-wider mb-3">Quick Actions</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              <QuickAction icon={Search} label="Analyze" color="bg-blue-500" onClick={() => onNavigate(ViewState.BACKUP_ANALYSIS)} />
              <QuickAction icon={Trash2} label="Clean" color="bg-red-500" onClick={() => onNavigate(ViewState.MESSAGES)} />
              <QuickAction icon={Zap} label="Upgrade" color="bg-amber-500" onClick={() => onNavigate(ViewState.PACKAGES)} />
              <QuickAction icon={HardDrive} label="Data" color="bg-emerald-500" onClick={() => onNavigate(ViewState.SETTINGS)} />
          </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
          <MiniStatCard title="Messages" value="12.5k" icon={MessageSquare} color="text-blue-400" bg="bg-blue-500/10" />
          <MiniStatCard title="Deleted" value="843" icon={Trash2} color="text-red-400" bg="bg-red-500/10" />
          <MiniStatCard title="Storage" value="1.2GB" icon={HardDrive} color="text-emerald-400" bg="bg-emerald-500/10" />
          <MiniStatCard title="Threats" value="0" icon={ShieldCheck} color="text-primary-400" bg="bg-primary-500/10" />
      </div>

      {/* Activity Chart */}
      <div className="bg-canvas-800/50 rounded-3xl border border-canvas-700/50 p-5">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-white font-semibold">Weekly Activity</h3>
             <span className="text-xs text-canvas-400 bg-canvas-700/50 px-2 py-1 rounded-lg">Last 7 days</span>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                        {/* Recharts doesn't support CSS variables in stopColor nicely without parsing, using a neutral purple fallback or computed style is complex, 
                            so we use a neutral hex that fits most themes or a hardcoded one close to primary.
                            For true dynamic chart colors, we would need to read computed styles. 
                            Keeping a safe purple/indigo default. */}
                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '12px', color: '#fff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        itemStyle={{ color: '#818cf8' }}
                        cursor={{ stroke: '#475569', strokeDasharray: '5 5' }}
                    />
                    <Area type="monotone" dataKey="activity" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorActivity)" />
                </AreaChart>
            </ResponsiveContainer>
          </div>
      </div>

      {/* Recent Activity List */}
      <div>
          <h3 className="text-canvas-400 text-sm font-bold uppercase tracking-wider mb-3">Recent Activity</h3>
          <div className="bg-canvas-800/50 rounded-3xl border border-canvas-700/50 overflow-hidden">
              <ActivityItem 
                icon={Zap} 
                color="bg-amber-500" 
                title="Backup Completed" 
                time="2 hours ago" 
                desc="12,450 messages synced successfully."
              />
              <ActivityItem 
                icon={Trash2} 
                color="bg-red-500" 
                title="Cleanup Session" 
                time="Yesterday" 
                desc="Removed 15 conversations from local storage."
              />
              <ActivityItem 
                icon={ShieldCheck} 
                color="bg-primary-500" 
                title="Privacy Scan" 
                time="2 days ago" 
                desc="No new vulnerabilities detected."
              />
          </div>
      </div>

    </div>
  );
};

const QuickAction = ({ icon: Icon, label, color, onClick }: any) => (
    <button onClick={onClick} className="flex flex-col items-center gap-2 min-w-[80px]">
        <div className={`w-14 h-14 rounded-2xl ${color} bg-opacity-20 flex items-center justify-center transition-transform active:scale-95`}>
            <Icon className={color.replace('bg-', 'text-')} size={24} />
        </div>
        <span className="text-xs font-medium text-canvas-300">{label}</span>
    </button>
);

const MiniStatCard = ({ title, value, icon: Icon, color, bg }: any) => (
    <div className="bg-canvas-800/50 border border-canvas-700/50 p-4 rounded-2xl flex flex-col gap-2">
        <div className={`self-start p-2 rounded-lg ${bg}`}>
            <Icon className={color} size={18} />
        </div>
        <div>
            <h4 className="text-2xl font-bold text-white">{value}</h4>
            <p className="text-xs text-canvas-400">{title}</p>
        </div>
    </div>
);

const ActivityItem = ({ icon: Icon, color, title, time, desc }: any) => (
    <div className="p-4 flex gap-4 border-b border-canvas-700/30 last:border-0 hover:bg-canvas-700/20 transition-colors">
        <div className={`w-10 h-10 rounded-full ${color} bg-opacity-20 flex items-center justify-center flex-shrink-0`}>
            <Icon className={color.replace('bg-', 'text-')} size={18} />
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-semibold text-white">{title}</h4>
                <span className="text-xs text-canvas-500">{time}</span>
            </div>
            <p className="text-xs text-canvas-400 leading-relaxed">{desc}</p>
        </div>
    </div>
);

export default Dashboard;