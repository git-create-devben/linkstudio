import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { buttonStyles, buttonAnimations, buttonGradients } from '@/lib/themeSystem';

interface ButtonDesignSelectorProps {
  design: any;
  onBack: () => void;
  onDesignChange: (update: any) => void;
}

export const ButtonDesignSelector: React.FC<ButtonDesignSelectorProps> = ({
  design,
  onBack,
  onDesignChange
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="text-lg font-semibold">Button Design</h3>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">Button Style</label>
          <div className="grid grid-cols-2 gap-2">
            {buttonStyles.map((style) => (
              <button 
                key={style.id} 
                onClick={() => onDesignChange({ buttonStyle: style.id })} 
                className={`p-4 border-2 transition-all duration-200 text-sm font-medium ${
                  (design.buttonStyle || 'default') === style.id 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-slate-200 hover:border-blue-300 bg-white text-slate-700'
                } ${style.className}`} 
                title={style.description}
              >
                <div className="mb-2">{style.name}</div>
                <div className="text-xs opacity-70">{style.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">Button Color Type</label>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => onDesignChange({ buttonColor: undefined })} 
              className={`p-4 border-2 transition-all duration-200 text-sm font-medium ${
                !design.buttonColor 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-slate-200 hover:border-blue-300 bg-white text-slate-700'
              }`}
            >
              Solid
            </button>
            <button 
              onClick={() => onDesignChange({ buttonColor: buttonGradients[0].value })} 
              className={`p-4 border-2 transition-all duration-200 text-sm font-medium ${
                design.buttonColor && design.buttonColor.startsWith('linear-gradient') 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-slate-200 hover:border-blue-300 bg-white text-slate-700'
              }`}
            >
              Gradient
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">Button Colors</label>
          <div className="space-y-3">
            {design.buttonColor && design.buttonColor.startsWith('linear-gradient') ? (
              <div className="grid grid-cols-3 gap-2">
                {buttonGradients.map((gradient) => (
                  <button 
                    key={gradient.id} 
                    onClick={() => onDesignChange({ 
                      buttonColor: gradient.value, 
                      buttonTextColor: gradient.textColor 
                    })} 
                    className={`h-16 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                      design.buttonColor === gradient.value 
                        ? 'border-blue-500' 
                        : 'border-slate-200'
                    }`} 
                    style={{ background: gradient.value }} 
                    title={gradient.name} 
                  />
                ))}
              </div>
            ) : (
              <div>
                <label className="text-sm text-slate-600 mb-2 block">Background Color</label>
                <input 
                  type="color" 
                  value={design.buttonColor || '#ffffff'} 
                  onChange={(e) => onDesignChange({ buttonColor: e.target.value })} 
                  className="w-full h-10 px-1 py-1 border rounded-lg" 
                />
              </div>
            )}
            <div>
              <label className="text-sm text-slate-600 mb-2 block">Text Color</label>
              <input 
                type="color" 
                value={design.buttonTextColor || '#000000'} 
                onChange={(e) => onDesignChange({ buttonTextColor: e.target.value })} 
                className="w-full h-10 px-1 py-1 border rounded-lg" 
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">Hover Animation</label>
          <div className="grid grid-cols-2 gap-2">
            {buttonAnimations.map((animation) => (
              <button 
                key={animation.id} 
                onClick={() => onDesignChange({ buttonAnimation: animation.id })} 
                className={`p-3 border-2 transition-all duration-200 text-sm font-medium ${
                  (design.buttonAnimation || 'scale') === animation.id 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-slate-200 hover:border-blue-300 bg-white text-slate-700'
                } ${animation.className}`} 
                title={animation.description}
              >
                {animation.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};