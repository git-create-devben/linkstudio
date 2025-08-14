import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface EffectsSelectorProps {
  design: any;
  onBack: () => void;
  onDesignChange: (update: any) => void;
}

export const EffectsSelector: React.FC<EffectsSelectorProps> = ({
  design,
  onBack,
  onDesignChange
}) => {
  const availableEffects = [
    { id: 'vinyl-spin', name: 'Vinyl Spin', desc: 'Spinning vinyl record', category: 'music' },
    { id: 'sound-waves', name: 'Sound Waves', desc: 'Animated sound bars', category: 'music' },
    { id: 'floating-notes', name: 'Floating Notes', desc: 'Musical notes animation', category: 'music' },
    { id: 'parallax', name: 'Parallax', desc: 'Depth effect layers', category: 'creative' },
    { id: 'color-shift', name: 'Color Shift', desc: 'Shifting color effects', category: 'creative' },
    { id: 'floating-elements', name: 'Floating Elements', desc: 'Floating particles', category: 'general' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="text-lg font-semibold">Visual Effects</h3>
      </div>
      
      <div>
        <h4 className="font-medium text-slate-700 mb-3">Template Effects</h4>
        <div className="grid grid-cols-1 gap-2 mb-6">
          {availableEffects.map((effect) => {
            const isActive = design.effects?.includes(effect.id);
            return (
              <button 
                key={effect.id} 
                onClick={() => {
                  const currentEffects = design.effects || [];
                  const newEffects = isActive 
                    ? currentEffects.filter((e: string) => e !== effect.id)
                    : [...currentEffects, effect.id];
                  onDesignChange({ effects: newEffects });
                }}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                  isActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-slate-200 hover:border-blue-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-700">{effect.name}</div>
                    <div className="text-xs text-slate-500">{effect.desc}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                      {effect.category}
                    </span>
                    {isActive && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-slate-700 mb-3">Animation Settings</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Animation Speed</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'slow', name: 'Slow', desc: 'Relaxed pace' },
                { id: 'normal', name: 'Normal', desc: 'Standard speed' },
                { id: 'fast', name: 'Fast', desc: 'Quick & snappy' }
              ].map((speed) => (
                <button 
                  key={speed.id} 
                  onClick={() => onDesignChange({ animationSpeed: speed.id })} 
                  className={`p-2 rounded-lg border-2 transition-all duration-200 ${
                    (design.animationSpeed || 'normal') === speed.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-200 hover:border-blue-300 bg-white'
                  }`}
                >
                  <div className="text-sm font-medium text-slate-700">{speed.name}</div>
                  <div className="text-xs text-slate-500">{speed.desc}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-700">Reduced Motion</div>
                <div className="text-sm text-slate-500">Disable animations for accessibility</div>
              </div>
              <button 
                onClick={() => onDesignChange({ reducedMotion: !design.reducedMotion })} 
                className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                  design.reducedMotion ? 'bg-blue-500' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                  design.reducedMotion ? 'translate-x-7' : 'translate-x-0'
                } mt-0.5 ml-0.5`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};