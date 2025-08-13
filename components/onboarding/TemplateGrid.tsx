"use client";
import React, { useState } from 'react';
import { X, Eye, Palette, Type, MousePointer, Sparkles } from 'lucide-react';
import { templates } from '@/components/template/templateData';
import PhoneMockup from '@/components/phoneMockup';
import { Button } from '@/components/ui/button';

interface TemplateGridProps {
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
}

interface TemplateCustomizeModalProps {
  template: any;
  onClose: () => void;
  onUseTemplate: () => void;
}

const TemplatePreviewModal: React.FC<TemplateCustomizeModalProps> = ({
  template,
  onClose,
  onUseTemplate
}) => {

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl relative flex flex-col overflow-hidden max-h-[90vh]">
        {/* Preview */}
        <div className="flex-1  sm:p-6 flex items-center justify-center bg-gray-50 overflow-hidden">
          <div className="w-full max-w-[280px] aspect-2/4 sm:max-w-[320px] py-2">
            <PhoneMockup>
              <div className="w-full h-full overflow-hidden">
                {template.preview}
              </div>
            </PhoneMockup>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 order-2 sm:order-1"
            >
              Cancel
            </Button>
            <Button
              onClick={onUseTemplate}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white order-1 sm:order-2"
            >
              Use this template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TemplateGrid: React.FC<TemplateGridProps> = ({ selectedTemplate, onSelect }) => {
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [selectedTemplateForCustomize, setSelectedTemplateForCustomize] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories from templates
  const templateCategories = [...new Set(templates.map(t => t.category))];
  
  const categoryIcons: Record<string, string> = {
    content: '🎬',
    business: '💼',
    creative: '🎨',
    store: '🛍️',
    sports: '⚽',
    food: '🍕',
    realestate: '🏠',
    beauty: '💄',
    events: '🎉'
  };

  const categories = [
    { id: 'all', name: 'All', icon: '📱' },
    ...templateCategories.map(cat => ({
      id: cat,
      name: cat === 'content' ? 'Content Creators' : 
            cat === 'business' ? 'Business' :
            cat === 'creative' ? 'Creative' :
            cat.charAt(0).toUpperCase() + cat.slice(1),
      icon: categoryIcons[cat] || '📱'
    }))
  ];

  // Filter templates based on selected category
  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const handleTemplateClick = (template: any) => {
    setSelectedTemplateForCustomize(template);
    setShowCustomizeModal(true);
  };

  const handleUseTemplate = () => {
    if (selectedTemplateForCustomize) {
      onSelect(selectedTemplateForCustomize.id);
      setShowCustomizeModal(false);
    }
  };

  return (
    <div className="w-full">
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
          Pick a template for your Link in Bio page
        </h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Choose a design that matches your style. You can customize it later.
        </p>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full whitespace-nowrap text-xs sm:text-sm font-medium transition-colors ${selectedCategory === category.id
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            <span className="text-sm sm:text-base">{category.icon}</span>
            <span className="hidden sm:inline">{category.name}</span>
            <span className="sm:hidden">{category.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="group cursor-pointer"
            onClick={() => handleTemplateClick(template)}
          >
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200">
              {/* Template Preview */}
              <div className="aspect-[3/4] bg-gray-50 overflow-hidden relative">
                <img
                  src={`/images/templates/${template.id}.png`}
                  alt={`${template.name} template`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />

                {/* Fallback to live preview */}
                <div className="scale-50 origin-top-left w-[200%] h-[200%] pointer-events-none hidden">
                  {template.preview}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-gray-900 font-medium flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Preview
                  </div>
                </div>

                {/* Selection Indicator */}
                {selectedTemplate === template.id && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-gray-900 text-xs sm:text-sm truncate">{template.name}</h3>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2 sm:line-clamp-none">{template.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Customize Modal */}
      {showCustomizeModal && selectedTemplateForCustomize && (
        <TemplatePreviewModal
          template={selectedTemplateForCustomize}
          onClose={() => setShowCustomizeModal(false)}
          onUseTemplate={handleUseTemplate}
        />
      )}
    </div>
  );
};

export default TemplateGrid;