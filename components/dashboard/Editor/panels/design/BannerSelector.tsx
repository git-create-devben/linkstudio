import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { IconPhoto } from '@tabler/icons-react';

interface BannerSelectorProps {
  design: any;
  onBack: () => void;
  onDesignChange: (update: any) => void;
  onNavigate: (view: 'main' | 'theme' | 'background' | 'banner' | 'curves' | 'typography' | 'buttons' | 'layout' | 'effects' | 'branding') => void;
}

export const BannerSelector: React.FC<BannerSelectorProps> = ({
  design,
  onBack,
  onDesignChange,
  onNavigate
}) => {
  const [bannerType, setBannerType] = useState<'none' | 'image' | 'curve'>(
    design.banner?.type === 'image' ? 'image' : 
    design.bannerType === 'curve' ? 'curve' : 'none'
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="text-lg font-semibold">Banner</h3>
      </div>
      
      {/* Banner Type Selector */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { id: 'none', label: 'No Banner', desc: 'Clean look' },
          { id: 'image', label: 'Image Banner', desc: 'Photo background' },
          { id: 'curve', label: 'Curve Banner', desc: 'Geometric shapes' }
        ].map(({ id, label, desc }) => (
          <button
            key={id}
            onClick={() => {
              setBannerType(id as any);
              if (id === 'none') {
                onDesignChange({ banner: { type: 'none', value: '' }, bannerType: undefined });
              } else if (id === 'curve') {
                onDesignChange({ bannerType: 'curve', banner: { type: 'none', value: '' } });
              }
            }}
            className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
              bannerType === id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-slate-200 hover:border-blue-300 bg-white'
            }`}
          >
            <div className="font-medium text-slate-700">{label}</div>
            <div className="text-xs text-slate-500">{desc}</div>
          </button>
        ))}
      </div>
      
      {/* Image Banner Options */}
      {bannerType === 'image' && (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <IconPhoto className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="font-medium text-gray-700 mb-2">Upload Banner Image</h4>
            <p className="text-sm text-gray-500 mb-4">Recommended size: 400x160px</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const result = e.target?.result as string;
                    onDesignChange({ 
                      banner: { 
                        type: 'image', 
                        value: result,
                        height: 160,
                        opacity: 1,
                        blur: false
                      }
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
              id="banner-upload"
            />
            <label 
              htmlFor="banner-upload" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
            >
              <IconPhoto className="w-4 h-4" />
              Choose Image
            </label>
          </div>
          
          {design.banner?.type === 'image' && design.banner.value && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Banner Height</label>
                <input
                  type="range"
                  min="100"
                  max="300"
                  value={design.banner.height || 160}
                  onChange={(e) => onDesignChange({
                    banner: { ...design.banner, height: parseInt(e.target.value) }
                  })}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">{design.banner.height || 160}px</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Opacity</label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={design.banner.opacity || 1}
                  onChange={(e) => onDesignChange({
                    banner: { ...design.banner, opacity: parseFloat(e.target.value) }
                  })}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">{Math.round((design.banner.opacity || 1) * 100)}%</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-700">Blur Effect</div>
                  <div className="text-sm text-slate-500">Add subtle blur to image</div>
                </div>
                <button 
                  onClick={() => onDesignChange({
                    banner: { ...design.banner, blur: !design.banner.blur }
                  })} 
                  className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                    design.banner.blur ? 'bg-blue-500' : 'bg-slate-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                    design.banner.blur ? 'translate-x-7' : 'translate-x-0'
                  } mt-0.5 ml-0.5`} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Curve Banner Options */}
      {bannerType === 'curve' && (
        <div className="text-center py-4">
          <p className="text-gray-600 mb-4">Curve banner options are available in the Curve Banners section.</p>
          <button 
            onClick={() => onNavigate('curves')} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Configure Curves
          </button>
        </div>
      )}
    </div>
  );
};