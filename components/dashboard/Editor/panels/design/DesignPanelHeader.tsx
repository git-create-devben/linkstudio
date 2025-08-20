import React from 'react';
import { X, Palette } from 'lucide-react';

interface DesignPanelHeaderProps {
  onClose: () => void;
}

export const DesignPanelHeader: React.FC<DesignPanelHeaderProps> = ({ onClose }) => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-slate-200 bg-white/50">
      <div className="flex items-center gap-2">
        <Palette className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-bold">Design Studio</h2>
      </div>
      <button 
        onClick={onClose} 
        className="p-2 hover:bg-slate-200 rounded-lg transition-colors duration-200 lg:block hidden"
      >
        <X size={18} />
      </button>
    </header>
  );
};