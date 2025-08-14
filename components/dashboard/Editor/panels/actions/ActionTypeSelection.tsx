"use client";
import React from 'react';
import { ArrowLeft, Sparkles, Zap } from 'lucide-react';
import { actionTypes, getActionTypesByCategory, getAllCategories } from '@/lib/actions/actionTypes';
import ActionTypeCard from './ActionTypeCard';
import SearchBar from './SearchBar';

interface ActionTypeSelectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  hoveredAction: string | null;
  onHoverAction: (actionId: string | null) => void;
  onSelectAction: (actionTypeId: string) => void;
  onBack: () => void;
}

const ActionTypeSelection: React.FC<ActionTypeSelectionProps> = ({
  searchQuery,
  onSearchChange,
  hoveredAction,
  onHoverAction,
  onSelectAction,
  onBack
}) => {
  const categories = getAllCategories();
  
  const categoryConfig = {
    links: { 
      name: 'Links', 
      color: 'from-blue-500 to-cyan-500', 
      bgColor: 'bg-blue-50',
      icon: '🔗',
      description: 'Connect to your content'
    },
    content: { 
      name: 'Content', 
      color: 'from-purple-500 to-pink-500', 
      bgColor: 'bg-purple-50',
      icon: '📝',
      description: 'Share your story'
    },
    contact: { 
      name: 'Contact', 
      color: 'from-green-500 to-emerald-500', 
      bgColor: 'bg-green-50',
      icon: '💬',
      description: 'Get in touch'
    },
    media: { 
      name: 'Media', 
      color: 'from-orange-500 to-red-500', 
      bgColor: 'bg-orange-50',
      icon: '🎵',
      description: 'Showcase your work'
    },
    business: { 
      name: 'Business', 
      color: 'from-indigo-500 to-purple-500', 
      bgColor: 'bg-indigo-50',
      icon: '💼',
      description: 'Professional tools'
    }
  };

  const filteredActionTypes = actionTypes.filter(action => 
    action.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    action.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    action.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full text-gray-900 bg-gray-50">
      {/* Compact Header */}
      <div className="flex items-center gap-3 p-4 bg-white border-b border-gray-200">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Add Action</h2>
            <p className="text-xs text-gray-600">Choose what to add</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Search */}
        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          placeholder="Search actions... (e.g., 'contact form')"
        />

        {/* Action Grid */}
        {searchQuery ? (
          // Search Results
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-semibold text-gray-900">
                Results ({filteredActionTypes.length})
              </h3>
            </div>
            <div className="grid gap-2">
              {filteredActionTypes.map((actionType) => {
                const categoryStyle = categoryConfig[actionType.category];
                return (
                  <ActionTypeCard
                    key={actionType.id}
                    actionType={actionType}
                    categoryStyle={categoryStyle}
                    onSelect={onSelectAction}
                    isHovered={hoveredAction === actionType.id}
                    onHover={onHoverAction}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          // Category View
          <div className="space-y-4">
            {categories.map((category) => {
const categoryStyle = categoryConfig[category as keyof typeof categoryConfig];
              const categoryActions = getActionTypesByCategory(category);
              
              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${categoryStyle.color} flex items-center justify-center shadow-sm`}>
                      <span className="text-sm">{categoryStyle.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{categoryStyle.name}</h3>
                      <p className="text-xs text-gray-600">{categoryStyle.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {categoryActions.map((actionType) => (
                      <ActionTypeCard
                        key={actionType.id}
                        actionType={actionType}
                        categoryStyle={categoryStyle}
                        onSelect={onSelectAction}
                        isHovered={hoveredAction === actionType.id}
                        onHover={onHoverAction}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionTypeSelection;