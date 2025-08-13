"use client";
import React, { useState } from 'react';
import { Eye, Code, Smartphone, Monitor, Tablet, X } from 'lucide-react';
import { templates } from './templateData';
import PhoneMockup from '../phoneMockup';
import { useUserContentStore } from '@/stores/useContentStore';

interface TemplatePreviewProps {
  templateId: string;
  onClose: () => void;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ templateId, onClose }) => {
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const { content, design, actionItems, socialLinks } = useUserContentStore();
  
  const template = templates.find(t => t.id === templateId);
  
  if (!template) return null;

  const getViewportClass = () => {
    switch (viewMode) {
      case 'mobile':
        return 'w-[375px] h-[667px]';
      case 'tablet':
        return 'w-[768px] h-[1024px]';
      case 'desktop':
        return 'w-[1200px] h-[800px]';
      default:
        return 'w-[375px] h-[667px]';
    }
  };

  // Create live preview with actual user data
  const LivePreview = () => {
    const TemplateComponent = template.preview.type;
    return (
      <TemplateComponent
        content={{
          ...content,
          profileName: content.profileName || template.name,
          profileBio: content.profileBio || template.description,
        }}
        design={design}
        actions={actionItems}
        socialLinks={socialLinks}
        toggles={template.toggles}
      />
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Template Preview</h2>
            </div>
            <div className="h-6 w-px bg-gray-300" />
            <span className="text-sm font-medium text-gray-600">{template.name}</span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Viewport Controls */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'mobile' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('tablet')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'tablet' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Tablet View"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'desktop' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-gray-50 p-8 overflow-auto">
          <div className="flex items-center justify-center min-h-full">
            <div className={`${getViewportClass()} bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300`}>
              {viewMode === 'mobile' ? (
                <PhoneMockup>
                  <LivePreview />
                </PhoneMockup>
              ) : (
                <div className="w-full h-full overflow-auto">
                  <LivePreview />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Preview updates automatically as you make changes
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Close Preview
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Use This Template
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;