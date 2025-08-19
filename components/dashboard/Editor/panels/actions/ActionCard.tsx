"use client";
import React from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import { ActionItemType } from '@/stores/useContentStore';
import { getActionTypeById } from '@/lib/actions/actionTypes';

interface ActionCardProps {
  action: ActionItemType;
  onEdit: (action: ActionItemType) => void;
  onDelete: (action: ActionItemType) => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ action, onEdit, onDelete }) => {
  const actionType = getActionTypeById(action.type);
  const Icon = actionType?.icon || Plus;
  
  const categoryConfig = {
    links: { 
      name: 'Links', 
      color: 'from-blue-500 to-cyan-500', 
      bgColor: 'bg-blue-50',
      icon: '🔗'
    },
    content: { 
      name: 'Content', 
      color: 'from-purple-500 to-pink-500', 
      bgColor: 'bg-purple-50',
      icon: '📝'
    },
    contact: { 
      name: 'Contact', 
      color: 'from-green-500 to-emerald-500', 
      bgColor: 'bg-green-50',
      icon: '💬'
    },
    media: { 
      name: 'Media', 
      color: 'from-orange-500 to-red-500', 
      bgColor: 'bg-orange-50',
      icon: '🎵'
    },
    business: { 
      name: 'Business', 
      color: 'from-indigo-500 to-purple-500', 
      bgColor: 'bg-indigo-50',
      icon: '💼'
    }
  };

  const categoryStyle = categoryConfig[actionType?.category || 'content'];

  return (
    <div className={`group relative p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md ${categoryStyle.bgColor} hover:bg-white`}>
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${categoryStyle.color} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200`}>
          <Icon size={16} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors truncate">
                {action.config.title || actionType?.name || 'Untitled'}
              </h4>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                {actionType?.description || 'Custom action'}
              </p>
              <div className="flex items-center gap-1 flex-wrap">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${categoryStyle.color} text-white`}>
                  {categoryStyle.icon} {categoryStyle.name}
                </span>
                {action.config.title && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    ✓ Ready
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2">
              <button 
                onClick={() => onEdit(action)} 
                className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md transition-all duration-200"
                title="Edit action"
              >
                <Edit size={12} />
              </button>
              <button 
                onClick={() => onDelete(action)} 
                className="p-1.5 text-red-600 hover:bg-red-100 rounded-md transition-all duration-200"
                title="Delete action"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
          
          {/* Compact Preview */}
          <div className="mt-2 p-2 bg-white/50 rounded-md border border-gray-100">
            <div className="text-xs text-gray-600">
              {actionType?.id === 'LINK_LIST' && action.config.links && (
                <span><strong>Links:</strong> {action.config.links.length} items</span>
              )}
              {actionType?.id === 'CONTACT_FORM' && action.config.email && (
                <span><strong>Email:</strong> {action.config.email}</span>
              )}
              {actionType?.id === 'TEXT_BLOCK' && action.config.content && (
                <span><strong>Content:</strong> {action.config.content.length > 30 
                  ? `${action.config.content.substring(0, 30)}...` 
                  : action.config.content}</span>
              )}
              {actionType?.id === 'IMAGE_GALLERY' && action.config.images && (
                <span><strong>Images:</strong> {action.config.images.length} items</span>
              )}
              {!action.config.title && (
                <span className="text-orange-600 font-medium">⚠️ Needs setup</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionCard;