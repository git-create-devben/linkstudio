import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { templateConfigs } from '@/components/template/configs/templateConfigs';

interface LayoutSelectorProps {
  design: any;
  onBack: () => void;
  onDesignChange: (update: any) => void;
}

export const LayoutSelector: React.FC<LayoutSelectorProps> = ({
  design,
  onBack,
  onDesignChange
}) => {
  const currentTemplate = design.layout || 'minimal';
  const availableTemplates = Object.keys(templateConfigs);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="text-lg font-semibold">Layout & Spacing</h3>
      </div>
      
      <div>
        <h4 className="font-medium text-slate-700 mb-3">Template Layout</h4>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {availableTemplates.map((templateId) => {
            const config = templateConfigs[templateId];
            return (
              <button 
                key={templateId} 
                onClick={() => onDesignChange({ layout: templateId })} 
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                  currentTemplate === templateId 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-slate-200 hover:border-blue-300 bg-white'
                }`}
              >
                <div className="font-medium text-slate-700 capitalize">{templateId}</div>
                <div className="text-xs text-slate-500">
                  {config.layout} • {config.profileStyle} • {config.actionStyle}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-slate-700 mb-3">Spacing</h4>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { id: 'compact', name: 'Compact', desc: 'Tight spacing' },
            { id: 'normal', name: 'Normal', desc: 'Balanced spacing' },
            { id: 'spacious', name: 'Spacious', desc: 'Generous spacing' }
          ].map((spacing) => (
            <button 
              key={spacing.id} 
              onClick={() => onDesignChange({ spacing: spacing.id })} 
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                (design.spacing || 'normal') === spacing.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-200 hover:border-blue-300 bg-white'
              }`}
            >
              <div className="text-sm font-medium text-slate-700">{spacing.name}</div>
              <div className="text-xs text-slate-500">{spacing.desc}</div>
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-slate-700 mb-3">Profile Style</h4>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { id: 'minimal', name: 'Minimal', desc: 'Clean & simple' },
            { id: 'featured', name: 'Featured', desc: 'Enhanced styling' },
            { id: 'artistic', name: 'Artistic', desc: 'Creative effects' }
          ].map((style) => (
            <button 
              key={style.id} 
              onClick={() => onDesignChange({ profileStyle: style.id })} 
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                (design.profileStyle || 'minimal') === style.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-200 hover:border-blue-300 bg-white'
              }`}
            >
              <div className="text-sm font-medium text-slate-700">{style.name}</div>
              <div className="text-xs text-slate-500">{style.desc}</div>
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-slate-700 mb-3">Action Style</h4>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { id: 'buttons', name: 'Buttons', desc: 'Traditional style' },
            { id: 'cards', name: 'Cards', desc: 'Card-based layout' },
            { id: 'list', name: 'List', desc: 'Compact list view' }
          ].map((style) => (
            <button 
              key={style.id} 
              onClick={() => onDesignChange({ actionStyle: style.id })} 
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                (design.actionStyle || 'buttons') === style.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-200 hover:border-blue-300 bg-white'
              }`}
            >
              <div className="text-sm font-medium text-slate-700">{style.name}</div>
              <div className="text-xs text-slate-500">{style.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};