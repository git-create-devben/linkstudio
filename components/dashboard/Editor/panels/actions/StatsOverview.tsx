"use client";
import React from 'react';
import { Zap, Eye, Sparkles } from 'lucide-react';

interface StatsOverviewProps {
  totalActions: number;
  configuredActions: number;
  totalCategories: number;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ 
  totalActions, 
  configuredActions, 
  totalCategories 
}) => {
  return (
    <div className="grid grid-cols-3 gap-3 mb-4">
      <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <Zap size={12} className="text-white" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{totalActions}</p>
            <p className="text-xs text-gray-600">Actions</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <Eye size={12} className="text-white" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{configuredActions}</p>
            <p className="text-xs text-gray-600">Ready</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles size={12} className="text-white" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{totalCategories}</p>
            <p className="text-xs text-gray-600">Types</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;