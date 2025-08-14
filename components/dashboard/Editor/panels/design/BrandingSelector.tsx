import React from 'react';
import { ArrowLeft, Crown, Lock } from 'lucide-react';

interface BrandingSelectorProps {
  design: any;
  hasRemoveBranding: boolean;
  onBack: () => void;
  onDesignChange: (update: any) => void;
  onUpgrade: () => void;
}

export const BrandingSelector: React.FC<BrandingSelectorProps> = ({
  design,
  hasRemoveBranding,
  onBack,
  onDesignChange,
  onUpgrade
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="text-lg font-semibold">Branding</h3>
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 pr-4">
            <h4 className="font-medium text-slate-700 flex items-center gap-2">
              Remove LinkStudio Branding
              {!hasRemoveBranding && <Crown className="w-4 h-4 text-amber-500" />}
            </h4>
            <p className="text-sm text-slate-500">Hide "Create your own bio with LinkStudio" from your page</p>
          </div>
          <button 
            onClick={() => onDesignChange({ removeBranding: !design.removeBranding })} 
            className={`w-12 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
              design.removeBranding ? 'bg-blue-500' : 'bg-slate-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
              design.removeBranding ? 'translate-x-7' : 'translate-x-0'
            } mt-0.5 ml-0.5`} />
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm text-gray-600">
            {design.removeBranding 
              ? "✅ LinkStudio branding is hidden from your page" 
              : "\"Create your own bio with LinkStudio\" will appear at the bottom of your page"
            }
            {!hasRemoveBranding && (
              <div className="text-amber-600 text-xs mt-1 flex items-center gap-1">
                <Crown className="w-3 h-3" />
                Pro feature - upgrade to save this setting
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
        <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
          Custom Branding
          {!hasRemoveBranding && <Crown className="w-4 h-4 text-amber-500" />}
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Custom Footer Text</label>
            <input
              type="text"
              value={design.customFooter || ''}
              onChange={(e) => onDesignChange({ customFooter: e.target.value })}
              placeholder="e.g., Made with ❤️ by YourBrand"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty to hide footer completely
              {!hasRemoveBranding && (
                <span className="text-amber-600 ml-2 inline-flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  Pro feature - upgrade to save
                </span>
              )}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Footer Link URL</label>
            <input
              type="url"
              value={design.customFooterUrl || ''}
              onChange={(e) => onDesignChange({ customFooterUrl: e.target.value })}
              placeholder="https://yourbrand.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Optional: Make footer text clickable
              {!hasRemoveBranding && (
                <span className="text-amber-600 ml-2 inline-flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  Pro feature - upgrade to save
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
      
      {!hasRemoveBranding && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
          <div className="flex items-center gap-2 text-amber-800">
            <Crown className="w-4 h-4" />
            <span className="text-sm font-medium">Pro Feature</span>
          </div>
          <p className="text-sm text-amber-700 mt-1">
            You can try these features now, but you'll need to upgrade to Pro to save your changes.
          </p>
          <button 
            onClick={onUpgrade}
            className="mt-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
          >
            Upgrade to Pro
          </button>
        </div>
      )}
    </div>
  );
};