import React from 'react';
import { X, ChevronRight, Instagram, Twitter, Facebook } from 'lucide-react';
import { SocialPlatform } from '@/types/editorTypes';
import { socialPlatforms } from './panels/socialLink';

interface PlatformSelectorProps {
  onClose: () => void;
  onSelect: (platform: SocialPlatform) => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ 
  onClose, 
  onSelect 
}) => {
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold">Add Social Link</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-4">
          Get more followers by adding links to your social media.
        </p>
        
        <div className="space-y-2">
          {Object.values(socialPlatforms).map((platform) => (
            <button
              key={platform.id}
              onClick={() => onSelect(platform)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{platform.icon}</span>
                <span className="font-medium">{platform.name}</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlatformSelector;