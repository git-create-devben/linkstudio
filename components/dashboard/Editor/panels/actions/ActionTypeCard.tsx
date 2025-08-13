"use client";
import React from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { ActionTypeConfig } from '@/lib/actions/actionTypes';

interface ActionTypeCardProps {
  actionType: ActionTypeConfig;
  categoryStyle: {
    name: string;
    color: string;
    bgColor: string;
    icon: string;
  };
  onSelect: (actionTypeId: string) => void;
  isHovered: boolean;
  onHover: (actionTypeId: string | null) => void;
}

const ActionTypeCard: React.FC<ActionTypeCardProps> = ({ 
  actionType, 
  categoryStyle, 
  onSelect, 
  isHovered, 
  onHover 
}) => {
  return (
    <div
      onClick={() => onSelect(actionType.id)}
      onMouseEnter={() => onHover(actionType.id)}
      onMouseLeave={() => onHover(null)}
      className={`group relative p-3 rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer transition-all duration-200 hover:shadow-md ${categoryStyle.bgColor} hover:bg-white`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${categoryStyle.color} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200`}>
          <actionType.icon size={16} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {actionType.name}
          </h4>
          <p className="text-xs text-gray-600 line-clamp-2">
            {actionType.description}
          </p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shadow-sm">
            <Plus size={12} className="text-white" />
          </div>
        </div>
      </div>
      
      {/* Hover Tooltip */}
      {isHovered && (
        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md shadow-lg p-1 z-10 animate-pulse">
          <div className="flex items-center gap-1 text-xs font-medium">
            <Sparkles size={10} />
            <span>Add</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionTypeCard;