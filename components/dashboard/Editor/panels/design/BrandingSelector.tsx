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
        <h4 className="font-medium text-slate-700 mb-4 flex items-center gap-2">
          Footer Branding Options
          {!hasRemoveBranding && <Crown className="w-4 h-4 text-amber-500" />}
        </h4>
        
        <div className="space-y-3">
          {/* Option 1: Show LinkStudio Branding */}
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="brandingOption"
              checked={!design.removeBranding && !design.customFooter}
              onChange={() => onDesignChange({ removeBranding: false, customFooter: '' })}
              className="w-4 h-4 text-blue-600"
            />
            <div className="flex-1">
              <div className="font-medium text-sm text-gray-900">Show LinkStudio Branding</div>
              <div className="text-xs text-gray-500">Display "Create your own bio with LinkStudio" at the bottom</div>
            </div>
          </label>

          {/* Option 2: Custom Footer */}
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="brandingOption"
              checked={!design.removeBranding && design.customFooter}
              onChange={() => onDesignChange({ removeBranding: false, customFooter: design.customFooter || 'Made with ❤️ by YourBrand' })}
              className="w-4 h-4 text-blue-600"
            />
            <div className="flex-1">
              <div className="font-medium text-sm text-gray-900">Custom Footer Text</div>
              <div className="text-xs text-gray-500">Replace with your own branding message</div>
            </div>
          </label>

          {/* Option 3: No Footer */}
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="brandingOption"
              checked={design.removeBranding}
              onChange={() => onDesignChange({ removeBranding: true })}
              className="w-4 h-4 text-blue-600"
            />
            <div className="flex-1">
              <div className="font-medium text-sm text-gray-900 flex items-center gap-2">
                Remove Footer Completely
                {!hasRemoveBranding && <Crown className="w-3 h-3 text-amber-500" />}
              </div>
              <div className="text-xs text-gray-500">Hide all footer branding from your page</div>
            </div>
          </label>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3 mt-4">
          <div className="text-sm text-gray-600">
            {design.removeBranding 
              ? "✅ No footer will be shown on your page" 
              : design.customFooter
                ? `✅ Footer will show: "${design.customFooter}"`
                : "✅ Footer will show: \"Create your own bio with LinkStudio\""
            }
            {!hasRemoveBranding && design.removeBranding && (
              <div className="text-amber-600 text-xs mt-1 flex items-center gap-1">
                <Crown className="w-3 h-3" />
                Pro feature - upgrade to save this setting
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Custom Footer Configuration - Only show if custom footer is selected */}
      {!design.removeBranding && design.customFooter !== undefined && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
            Custom Footer Settings
            {!hasRemoveBranding && <Crown className="w-4 h-4 text-amber-500" />}
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Footer Text</label>
              <input
                type="text"
                value={design.customFooter || ''}
                onChange={(e) => onDesignChange({ customFooter: e.target.value })}
                placeholder="e.g., Made with ❤️ by YourBrand"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                This text will appear at the bottom of your page
                {!hasRemoveBranding && (
                  <span className="text-amber-600 ml-2 inline-flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Pro feature - upgrade to save
                  </span>
                )}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Footer Link URL (Optional)</label>
              <input
                type="url"
                value={design.customFooterUrl || ''}
                onChange={(e) => onDesignChange({ customFooterUrl: e.target.value })}
                placeholder="https://yourbrand.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Make your footer text clickable (optional)
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
      )}
      
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