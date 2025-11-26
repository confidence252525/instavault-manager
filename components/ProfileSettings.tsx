import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, Mail, User, AtSign, Save, Loader2 } from 'lucide-react';
import { ViewState } from '../types';

interface ProfileSettingsProps {
  onNavigate: (view: ViewState) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ onNavigate }) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        alert("Profile updated successfully!");
    }, 1000);
  };

  const handleAvatarClick = () => {
      fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          alert("New avatar selected: " + e.target.files[0].name);
          // Logic to upload/preview would go here
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
        <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
      </div>

      <div className="bg-canvas-800/50 border border-canvas-700 rounded-2xl p-6 md:p-8">
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange}
          />
          <div 
            className="relative group cursor-pointer"
            onClick={handleAvatarClick}
          >
            <img 
              src="https://picsum.photos/200/200" 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-4 border-canvas-700 group-hover:border-primary-500 transition-colors" 
            />
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white" size={24} />
            </div>
            <div className="absolute bottom-0 right-0 bg-primary-600 p-1.5 rounded-full border-2 border-canvas-800">
               <Camera size={14} className="text-white" />
            </div>
          </div>
          <button 
            onClick={handleAvatarClick}
            className="text-primary-400 text-sm font-medium mt-3 cursor-pointer hover:underline bg-transparent border-none"
          >
            Change Photo
          </button>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
             <InputField label="First Name" defaultValue="Alex" icon={User} />
             <InputField label="Last Name" defaultValue="Designer" icon={User} />
          </div>
          
          <InputField label="Username" defaultValue="alex_design" icon={AtSign} />
          <InputField label="Email Address" defaultValue="alex@example.com" icon={Mail} type="email" />
          
          <div>
            <label className="block text-canvas-400 text-sm font-medium mb-2">Bio</label>
            <textarea 
              className="w-full bg-canvas-900/50 border border-canvas-700 rounded-xl p-3 text-white focus:outline-none focus:border-primary-500 transition-colors h-24 resize-none"
              defaultValue="Digital artist & UI Designer. Love simple things."
            ></textarea>
          </div>

          <div className="pt-4">
            <button 
              onClick={handleSave}
              disabled={loading}
              className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20 disabled:opacity-50"
            >
              {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Saving...
                  </>
              ) : (
                <>
                  <Save size={20} /> Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, defaultValue, icon: Icon, type = "text" }: any) => (
  <div>
    <label className="block text-canvas-400 text-sm font-medium mb-2">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-canvas-500">
        <Icon size={18} />
      </div>
      <input 
        type={type} 
        defaultValue={defaultValue}
        className="w-full bg-canvas-900/50 border border-canvas-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-primary-500 transition-colors"
      />
    </div>
  </div>
);

export default ProfileSettings;