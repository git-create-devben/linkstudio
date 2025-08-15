import React, { useState, useMemo } from 'react';
import { X, ChevronRight, Search, Sparkles } from 'lucide-react';
import { SocialPlatform } from '@/types/editorTypes';
import { socialPlatforms, getPlatformIcon } from '@/lib/getPlatformIcons';

interface PlatformSelectorProps {
  onClose: () => void;
  onSelect: (platform: SocialPlatform) => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ 
  onClose, 
  onSelect 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Categorize platforms
  const allCategories = {
    'Social Media': socialPlatforms.filter(p => ['instagram', 'twitter', 'facebook', 'linkedin', 'tiktok', 'threads', 'snapchat', 'pinterest', 'reddit'].includes(p.id)),
    'Video & Content': socialPlatforms.filter(p => ['youtube', 'vimeo', 'twitch'].includes(p.id)),
    'Music & Audio': socialPlatforms.filter(p => ['spotify', 'apple', 'soundcloud', 'bandcamp'].includes(p.id)),
    'Professional': socialPlatforms.filter(p => ['github', 'dribbble', 'behance', 'medium'].includes(p.id)),
    'Communication': socialPlatforms.filter(p => ['discord', 'whatsapp', 'telegram', 'zoom'].includes(p.id)),
    'Business & Other': socialPlatforms.filter(p => ['calendly', 'paypal', 'patreon', 'website', 'email'].includes(p.id))
  };
  
  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return allCategories;
    
    const searchLower = searchTerm.toLowerCase();
    const filtered = Object.entries(allCategories).reduce((acc, [categoryName, platforms]) => {
      const matchingPlatforms = platforms.filter(platform => 
        platform.name.toLowerCase().includes(searchLower) ||
        platform.id.toLowerCase().includes(searchLower)
      );
      
      if (matchingPlatforms.length > 0) {
        acc[categoryName as keyof typeof allCategories] = matchingPlatforms;
      }

      return acc;
    }, {} as typeof allCategories);
    
    return filtered;
  }, [searchTerm, allCategories]);

  const totalPlatforms = Object.values(filteredCategories).reduce((sum, platforms) => sum + platforms.length, 0);

  return (
    <>
      <div className="sticky top-0 z-10 bg-gradient-to-r from-white via-gray-50/50 to-white border-b border-gray-100 backdrop-blur-sm">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Choose Platform
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {totalPlatforms} platforms available
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="px-6 pb-4">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search platforms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50/80 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 hover:bg-white hover:border-gray-300"
            />
          </div>
        </div>
      </div>
      
      <div className="p-6 pt-2">
        {totalPlatforms === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
              <Search size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium mb-1">No platforms found</p>
            <p className="text-sm text-gray-400">Try a different search term</p>
          </div>
        ) : (
          <div className="space-y-6 max-h-96 overflow-y-auto custom-scrollbar">
            {Object.entries(filteredCategories).map(([categoryName, platforms]) => (
              platforms.length > 0 && (
                <div key={categoryName}>
                  <div className="flex items-center gap-2 mb-3">
                    <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                      {categoryName}
                    </h4>
                    <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                      {platforms.length}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    {platforms.map((platform) => (
                      <button
                        key={platform.id}
                        onClick={() => onSelect(platform)}
                        className="group w-full flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50/30 rounded-2xl transition-all duration-200 border-2 border-transparent hover:border-blue-100 hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 shadow-sm" 
                            style={{ backgroundColor: platform.color + '15' }}
                          >
                            <div style={{ color: platform.color }}>
                              {getPlatformIcon(platform.id, 24)}
                            </div>
                          </div>
                          <div className="text-left">
                            <span className="font-semibold text-gray-900 block text-base group-hover:text-gray-800">
                              {platform.name}
                            </span>
                            <span className="text-sm text-gray-500 font-mono">
                              {platform.placeholder}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                          </div>
                          <ChevronRight 
                            size={18} 
                            className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" 
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </>
  );
};

export default PlatformSelector;