import React from 'react';
import { Edit, Crown, Lock } from 'lucide-react';

interface DesignOptionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onEdit: () => void;
  isLocked?: boolean;
  onUpgrade?: () => void;
}

export const DesignOptionCard: React.FC<DesignOptionCardProps> = ({
  icon,
  title,
  description,
  onEdit,
  isLocked = false,
  onUpgrade
}) => {
  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm border border-slate-200 relative ${isLocked ? 'opacity-60' : ''}`}>
      {isLocked && (
        <div className="absolute inset-0 bg-gray-50/80 backdrop-blur-[2px] rounded-xl flex items-center justify-center z-10">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm">
            <Lock className="w-4 h-4 text-gray-500" />
            <Crown className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-600">Pro Feature</span>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">{icon}</div>
          <div>
            <h3 className="font-semibold text-slate-800">{title}</h3>
            <p className="text-sm text-slate-500">{description}</p>
          </div>
        </div>
        <button 
          onClick={isLocked && onUpgrade ? onUpgrade : onEdit}
          className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-sm font-medium"
        >
          {isLocked ? <Crown className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
          {isLocked ? 'Upgrade' : 'Edit'}
        </button>
      </div>
    </div>
  );
};