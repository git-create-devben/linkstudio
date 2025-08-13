"use client";
import React from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { ActionItemType } from '@/stores/useContentStore';
import ActionCard from './ActionCard';
import StatsOverview from './StatsOverview';

interface MainViewProps {
  actionItems: ActionItemType[];
  categories: string[];
  onClose: () => void;
  onAddNew: () => void;
  onEditAction: (action: ActionItemType) => void;
  onDeleteAction: (id: string) => void;
}

const MainView: React.FC<MainViewProps> = ({
  actionItems,
  categories,
  onClose,
  onAddNew,
  onEditAction,
  onDeleteAction
}) => {
  const configuredActions = actionItems.filter(a => a.config.title).length;

  return (
    <div className="flex flex-col h-full text-gray-900 bg-gray-50">
      {/* Compact Header */}
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Actions</h2>
            <p className="text-xs text-gray-600">Manage interactive elements</p>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={16} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        {/* Stats Overview */}
        <StatsOverview 
          totalActions={actionItems.length}
          configuredActions={configuredActions}
          totalCategories={categories.length}
        />

        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-gray-900">Your Actions</h3>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {actionItems.length}
              </span>
            </div>
            <button
              onClick={onAddNew}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-md hover:scale-105 transition-all duration-200 font-medium text-sm"
            >
              <Plus size={14} />
              Add New
            </button>
          </div>
          
          {actionItems.length > 0 ? (
            <div className="grid gap-3">
              {actionItems.map((action) => (
                <ActionCard
                  key={action.id}
                  action={action}
                  onEdit={onEditAction}
                  onDelete={onDeleteAction}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg bg-white">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
                <Sparkles size={20} className="text-white" />
              </div>
              <h3 className="text-base font-semibold mb-2 text-gray-900">Ready to start?</h3>
              <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto">
                Add interactive elements to make your page engaging.
              </p>
              <button
                onClick={onAddNew}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-md hover:scale-105 transition-all duration-200 font-semibold text-sm"
              >
                <Plus size={16} />
                Create First Action
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MainView;