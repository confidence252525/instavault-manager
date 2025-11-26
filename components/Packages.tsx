import React, { useState } from 'react';
import { Check, X, Zap, Shield, Crown, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { billingService } from '../services/billingService';

const Packages: React.FC = () => {
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handlePurchase = async (productId: string) => {
    setProcessingId(productId);
    setToast(null);

    try {
      const result = await billingService.purchase(productId);
      
      if (result.success) {
        setToast({ type: 'success', message: result.message });
        // Here you would typically update the user's global context/state with the new plan
      } else {
        setToast({ type: 'error', message: result.message });
      }
    } catch (error) {
      setToast({ type: 'error', message: "An unexpected error occurred. Please try again." });
    } finally {
      setProcessingId(null);
      setTimeout(() => setToast(null), 5000);
    }
  };

  return (
    <div className="animate-fade-in space-y-8 pb-10 relative">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border animate-slide-up ${
          toast.type === 'success' 
            ? 'bg-emerald-900/90 border-emerald-500 text-emerald-100' 
            : 'bg-red-900/90 border-red-500 text-red-100'
        } backdrop-blur-md`}>
           {toast.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
           <div>
             <h4 className="font-bold text-sm">{toast.type === 'success' ? 'Success' : 'Error'}</h4>
             <p className="text-xs opacity-90">{toast.message}</p>
           </div>
           <button onClick={() => setToast(null)} className="ml-2 opacity-60 hover:opacity-100">
             <X size={16} />
           </button>
        </div>
      )}

      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">Upgrade your Protection</h2>
        <p className="text-canvas-400">
          Choose the perfect plan to manage your digital footprint, analyze backups with AI, and secure your privacy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* Starter Plan */}
        <div className="bg-canvas-800/50 rounded-2xl border border-canvas-700 p-8 flex flex-col hover:border-primary-500/30 transition-all">
          <div className="mb-4">
            <span className="bg-canvas-700 text-canvas-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Starter
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
          <p className="text-canvas-400 text-sm mb-6">Essential tools for basic message management.</p>
          
          <div className="space-y-4 mb-8 flex-1">
            <FeatureItem text="View Message History" included={true} />
            <FeatureItem text="Simulate Deletion" included={true} />
            <FeatureItem text="Basic Stats" included={true} />
            <FeatureItem text="Gemini AI Analysis" included={false} />
            <FeatureItem text="Bulk Delete Actions" included={false} />
            <FeatureItem text="Priority Support" included={false} />
          </div>

          <button 
            disabled={true}
            className="w-full py-3 px-4 bg-canvas-700 text-canvas-300 rounded-xl font-medium cursor-default opacity-50"
          >
            Current Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-gradient-to-b from-canvas-800 to-canvas-900 rounded-2xl border border-primary-500 p-8 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-primary-900/20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="bg-primary-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide shadow-lg">
              Most Popular
            </span>
          </div>
          
          <div className="mb-4 mt-2">
             <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-primary-400" size={20} />
             </div>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">$4.99<span className="text-lg text-canvas-500 font-normal">/mo</span></h3>
          <p className="text-canvas-400 text-sm mb-6">Advanced power for heavy users.</p>
          
          <div className="space-y-4 mb-8 flex-1">
            <FeatureItem text="Everything in Starter" included={true} />
            <FeatureItem text="Unlimited Message Deletion" included={true} />
            <FeatureItem text="Gemini AI Privacy Check" included={true} />
            <FeatureItem text="Spam Detection" included={true} />
            <FeatureItem text="Export Cleaned Data" included={true} />
            <FeatureItem text="Priority Support" included={false} />
          </div>

          <button 
            onClick={() => handlePurchase('com.instavault.pro_monthly')}
            disabled={processingId !== null}
            className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-primary-600/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processingId === 'com.instavault.pro_monthly' ? (
                <>
                    <Loader2 className="animate-spin" size={20} /> Processing...
                </>
            ) : 'Upgrade to Pro'}
          </button>
        </div>

        {/* Ultimate Plan */}
        <div className="bg-canvas-800/50 rounded-2xl border border-canvas-700 p-8 flex flex-col hover:border-purple-500/30 transition-all">
          <div className="mb-4">
             <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Crown className="text-purple-400" size={20} />
             </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">$19.99<span className="text-lg text-canvas-500 font-normal">/mo</span></h3>
          <p className="text-canvas-400 text-sm mb-6">Complete control for business & power users.</p>
          
          <div className="space-y-4 mb-8 flex-1">
            <FeatureItem text="Everything in Pro" included={true} />
            <FeatureItem text="Advanced Sentiment Analysis" included={true} />
            <FeatureItem text="Legal Export Formats" included={true} />
            <FeatureItem text="Multiple Account Sync" included={true} />
            <FeatureItem text="24/7 Dedicated Support" included={true} />
            <FeatureItem text="Cloud Backup Storage" included={true} />
          </div>

          <button 
            onClick={() => handlePurchase('com.instavault.ultimate_monthly')}
            disabled={processingId !== null}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
             {processingId === 'com.instavault.ultimate_monthly' ? (
                <>
                    <Loader2 className="animate-spin" size={20} /> Processing...
                </>
            ) : 'Get Ultimate'}
          </button>
        </div>
      </div>
      
      <div className="mt-12 p-6 bg-canvas-900/50 rounded-2xl border border-canvas-800 flex items-start gap-4">
        <Shield className="text-emerald-400 flex-shrink-0 mt-1" size={24} />
        <div>
            <h4 className="text-white font-semibold">100% Secure & Private</h4>
            <p className="text-canvas-400 text-sm mt-1">
                Payments are processed securely via Google Play Billing. We do not store your credit card information.
                Subscriptions auto-renew unless canceled 24 hours before the end of the current period.
            </p>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ text, included }: { text: string; included: boolean }) => (
  <div className="flex items-center gap-3">
    {included ? (
      <div className="p-1 bg-emerald-500/10 rounded-full">
        <Check size={14} className="text-emerald-400" />
      </div>
    ) : (
      <div className="p-1 bg-canvas-700/30 rounded-full">
        <X size={14} className="text-canvas-600" />
      </div>
    )}
    <span className={`text-sm ${included ? 'text-canvas-300' : 'text-canvas-600'}`}>{text}</span>
  </div>
);

export default Packages;