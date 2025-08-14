import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TypographySelectorProps {
  design: any;
  onBack: () => void;
  onDesignChange: (update: any) => void;
}

export const TypographySelector: React.FC<TypographySelectorProps> = ({
  design,
  onBack,
  onDesignChange
}) => {
  const fonts = [
    'Inter', 'Lora', 'Roboto', 'Open Sans', 'Montserrat', 
    'Playfair Display', 'Source Sans Pro', 'Poppins', 'Oswald', 'Raleway'
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="text-lg font-semibold">Typography</h3>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">Font Family</label>
          <div className="space-y-2">
            {fonts.map((font) => (
              <button 
                key={font} 
                onClick={() => onDesignChange({ font })} 
                className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                  design.font === font 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-slate-200 hover:border-blue-300 bg-white'
                }`} 
                style={{ fontFamily: font }}
              >
                <div className="font-medium">{font}</div>
                <div className="text-sm text-slate-500">The quick brown fox jumps over</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">Text Alignment</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'left', name: 'Left', icon: '←' },
              { id: 'center', name: 'Center', icon: '↔' },
              { id: 'right', name: 'Right', icon: '→' }
            ].map((alignment) => (
              <button 
                key={alignment.id} 
                onClick={() => onDesignChange({ textAlignment: alignment.id })} 
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                  (design.textAlignment || 'center') === alignment.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-slate-200 hover:border-blue-300 bg-white'
                }`}
              >
                <div className="text-lg mb-1">{alignment.icon}</div>
                <div className="text-sm font-medium text-slate-700">{alignment.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">Text Colors</label>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-slate-600 mb-2 block">Primary Text Color</label>
              <input 
                type="color" 
                value={design.textPrimaryColor || '#ffffff'} 
                onChange={(e) => onDesignChange({ textPrimaryColor: e.target.value })} 
                className="w-full h-10 px-1 py-1 border rounded-lg" 
              />
            </div>
            <div>
              <label className="text-sm text-slate-600 mb-2 block">Secondary Text Color</label>
              <input 
                type="color" 
                value={design.textSecondaryColor || '#cccccc'} 
                onChange={(e) => onDesignChange({ textSecondaryColor: e.target.value })} 
                className="w-full h-10 px-1 py-1 border rounded-lg" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};