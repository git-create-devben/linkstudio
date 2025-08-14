import React from 'react';
import { ArrowLeft, Crown, Lock } from 'lucide-react';
import { curveShapes, curveColors } from '@/lib/themeSystem';

interface CurvesSelectorProps {
  design: any;
  hasAdvancedCustomization: boolean;
  onBack: () => void;
  onDesignChange: (update: any) => void;
  onUpgrade: () => void;
}

export const CurvesSelector: React.FC<CurvesSelectorProps> = ({
  design,
  hasAdvancedCustomization,
  onBack,
  onDesignChange,
  onUpgrade
}) => {
  const availableShapes = hasAdvancedCustomization 
    ? curveShapes 
    : curveShapes.filter(shape => shape.tier === 'free');
  
  const availableColors = hasAdvancedCustomization 
    ? curveColors 
    : curveColors.filter(color => color.tier === 'free');
  
  const lockedShapes = curveShapes.filter(shape => shape.tier === 'premium');
  const lockedColors = curveColors.filter(color => color.tier === 'premium');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="text-lg font-semibold">Curve Banners</h3>
      </div>
      
      {!hasAdvancedCustomization && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Limited Selection</span>
          </div>
          <p className="text-xs text-yellow-700 mt-1">
            Upgrade to access all {curveShapes.length} curve shapes and {curveColors.length} colors.
          </p>
        </div>
      )}
      
      <div>
        <h4 className="font-medium text-slate-700 mb-3">Shape ({availableShapes.length} available)</h4>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {availableShapes.map((shape) => (
            <button 
              key={shape.id} 
              onClick={() => onDesignChange({ curveShape: shape.id, bannerType: 'curve' })} 
              className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                design.curveShape === shape.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-200 hover:border-blue-300 bg-white'
              }`} 
              title={shape.description}
            >
              <div className="w-full h-6 mb-2 bg-gradient-to-r from-blue-400 to-purple-400" style={{ clipPath: shape.clipPath }} />
              <div className="text-xs font-medium text-slate-700">{shape.name}</div>
              <div className="text-xs text-slate-500">{shape.category}</div>
            </button>
          ))}
          
          {/* Show locked shapes for free users */}
          {!hasAdvancedCustomization && lockedShapes.slice(0, 4).map((shape) => (
            <div 
              key={`locked-${shape.id}`} 
              className="p-3 rounded-lg border-2 border-dashed border-gray-300 relative bg-gray-50"
              title={`${shape.name} - Premium Only`}
            >
              <div className="w-full h-6 mb-2 bg-gradient-to-r from-gray-300 to-gray-400" style={{ clipPath: shape.clipPath }} />
              <div className="text-xs font-medium text-gray-500">{shape.name}</div>
              <div className="text-xs text-gray-400">{shape.category}</div>
              <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-[1px] flex items-center justify-center rounded-lg">
                <div className="bg-white/90 rounded-full p-1">
                  <Lock className="w-3 h-3 text-gray-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {design.curveShape && (
        <div>
          <h4 className="font-medium text-slate-700 mb-3">Color ({availableColors.length} available)</h4>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {availableColors.map((colorItem) => (
              <button 
                key={colorItem.id} 
                onClick={() => onDesignChange({ curveColor: colorItem.value })} 
                className={`p-2 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                  design.curveColor === colorItem.value 
                    ? 'border-blue-500 ring-2 ring-blue-200' 
                    : 'border-slate-200 hover:border-blue-300'
                }`} 
                title={colorItem.name}
              >
                <div className="w-full h-6 rounded mb-1" style={{ background: colorItem.value }} />
                <div className="text-xs font-medium text-slate-700 truncate">{colorItem.name}</div>
              </button>
            ))}
            
            {/* Show locked colors for free users */}
            {!hasAdvancedCustomization && lockedColors.slice(0, 3).map((colorItem) => (
              <div 
                key={`locked-${colorItem.id}`} 
                className="p-2 rounded-lg border-2 border-dashed border-gray-300 relative"
                title={`${colorItem.name} - Premium Only`}
              >
                <div className="w-full h-6 rounded mb-1 bg-gray-300" />
                <div className="text-xs font-medium text-gray-500 truncate">{colorItem.name}</div>
                <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-[1px] flex items-center justify-center rounded-lg">
                  <div className="bg-white/90 rounded-full p-1">
                    <Lock className="w-2 h-2 text-gray-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-700">Live Animation</div>
                <div className="text-sm text-slate-500">Enable smooth curve animations</div>
              </div>
              <button 
                onClick={() => onDesignChange({ curveAnimated: !design.curveAnimated })} 
                className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                  design.curveAnimated !== false ? 'bg-blue-500' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                  design.curveAnimated !== false ? 'translate-x-7' : 'translate-x-0'
                } mt-0.5 ml-0.5`} />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {!hasAdvancedCustomization && (
        <button 
          onClick={onUpgrade}
          className="w-full mt-4 p-3 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
        >
          <Crown className="w-4 h-4" />
          Unlock All Curve Designs
        </button>
      )}
    </div>
  );
};