import React from 'react';
import { curveShapes, curveColors } from '@/lib/themeSystem';

interface DesignPreviewProps {
  design: any;
  currentTheme: any;
}

export const DesignPreview: React.FC<DesignPreviewProps> = ({ design, currentTheme }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
      <h3 className="text-base font-semibold mb-3">Live Preview</h3>
      <div 
        className="h-24 rounded-lg flex items-center justify-center text-white font-medium shadow-inner relative overflow-hidden"
        style={{ 
          background: design.customBackground || currentTheme.colors.background,
          fontFamily: design.font || 'Inter, system-ui, sans-serif'
        }}
      >
        {design.curveShape && (
          <div 
            className={`absolute top-0 left-0 w-full h-full ${curveShapes.find(s => s.id === design.curveShape)?.animationClass || ''}`}
            style={{
              background: design.curveColor || curveColors[0].value,
              clipPath: curveShapes.find(s => s.id === design.curveShape)?.clipPath || 'none'
            }}
          />
        )}
        <div className="text-center relative z-10">
          <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-2" />
          <div 
            className="text-sm opacity-90"
            style={{ color: design.textPrimaryColor || currentTheme.colors.textPrimary }}
          >
            Your Profile
          </div>
        </div>
      </div>
    </div>
  );
};