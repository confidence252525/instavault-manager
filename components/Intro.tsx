import React, { useState } from 'react';
import { Shield, Zap, Lock, ChevronRight, Check } from 'lucide-react';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      icon: Shield,
      color: 'text-primary-400',
      bg: 'bg-primary-500/20',
      title: 'Secure Your Footprint',
      description: 'Manage your social media history with confidence. Clean up old conversations and protect your digital identity.'
    },
    {
      id: 2,
      icon: Zap,
      color: 'text-purple-400',
      bg: 'bg-purple-500/20',
      title: 'AI-Powered Analysis',
      description: 'Use Gemini AI to scan your backups for sensitive information, sentiment analysis, and potential privacy risks.'
    },
    {
      id: 3,
      icon: Lock,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20',
      title: 'Privacy First',
      description: 'Your data stays on your device. We simulate all deletion actions locally before you choose to commit changes.'
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-canvas-950 z-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-canvas-900 border border-canvas-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden animate-slide-up">
        
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/10 rounded-full -mr-10 -mt-10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full -ml-10 -mb-10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col h-[400px]">
            {/* Skip button */}
            <div className="flex justify-end">
                <button onClick={onComplete} className="text-canvas-500 hover:text-white text-sm font-medium transition-colors">
                    Skip
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className={`w-20 h-20 rounded-2xl ${slides[currentSlide].bg} flex items-center justify-center mb-6 transition-colors duration-300`}>
                    {React.createElement(slides[currentSlide].icon, { 
                        size: 40, 
                        className: slides[currentSlide].color 
                    })}
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">
                    {slides[currentSlide].title}
                </h2>
                <p className="text-canvas-400 leading-relaxed">
                    {slides[currentSlide].description}
                </p>
            </div>

            {/* Footer Controls */}
            <div className="flex items-center justify-between mt-8">
                {/* Dots */}
                <div className="flex gap-2">
                    {slides.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-primary-500 w-6' : 'bg-canvas-700'}`}
                        />
                    ))}
                </div>

                {/* Button */}
                <button 
                    onClick={handleNext}
                    className="group flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-primary-600/20"
                >
                    {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
                    {currentSlide === slides.length - 1 ? <Check size={18} /> : <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;