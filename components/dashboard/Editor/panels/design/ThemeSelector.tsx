import React from 'react';
import { ArrowLeft, Sun, Moon, Sparkles } from 'lucide-react';
import { ThemeMode } from '@/lib/themeSystem';

interface ThemeSelectorProps {
  design: any;
  onBack: () => void;
  onDesignChange: (update: any) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  design,
  onBack,
  onDesignChange
}) => {
  const themes = [
    { key: 'light' as ThemeMode, icon: Sun, label: 'Light Mode', desc: 'Clean and bright', bg: 'from-blue-100 to-purple-100' },
    { key: 'dark' as ThemeMode, icon: Moon, label: 'Dark Mode', desc: 'Easy on the eyes', bg: 'from-slate-700 to-slate-900' },
    { key: 'glassmorphic' as ThemeMode, icon: Sparkles, label: 'Glassmorphic', desc: 'Modern glass effect', bg: 'from-purple-500 to-pink-500' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="text-lg font-semibold">Theme Mode</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {themes.map(({ key, icon: Icon, label, desc, bg }) => {
          const isActive = design.theme === key;
          return (
            <button 
              key={key} 
              onClick={() => onDesignChange({ theme: key })} 
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                isActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${bg} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">{label}</div>
                  <div className="text-sm text-slate-500">{desc}</div>
                </div>
                {isActive && <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};