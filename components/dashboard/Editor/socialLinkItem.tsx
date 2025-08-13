import React from 'react';
import { Edit, Trash2, ExternalLink, Loader2, Eye, MousePointer } from 'lucide-react';
import { SocialLink } from '@/types/editorTypes';
import { getPlatformIcon, socialPlatforms } from '@/lib/getPlatformIcons';

interface SocialLinkItemProps {
  link: SocialLink;
  onEdit: (linkId: string) => void;
  onDelete: (linkId: string) => void;
  isDeleting?: boolean;
}

const SocialLinkItem: React.FC<SocialLinkItemProps> = ({
  link,
  onEdit,
  onDelete,
  isDeleting = false
}) => {
  // Find platform data for colors and additional info
  const platformData = socialPlatforms.find(p => 
    p.name.toLowerCase() === link.name.toLowerCase() || 
    p.id === link.name.toLowerCase()
  );
  
  // Extract username from URL
  const getDisplayHandle = () => {
    if (!link.url || !platformData) return link.url;
    
    try {
      const handle = link.url.replace(platformData.baseUrl, '');
      return handle.startsWith('@') ? handle : '@' + handle;
    } catch {
      return link.url;
    }
  };

  const displayHandle = getDisplayHandle();
  const platformColor = platformData?.color || '#6B7280';

  return (
    <div className={`group relative w-full bg-white border-2 border-gray-100 rounded-2xl transition-all duration-300 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100/50 ${isDeleting ? 'opacity-50 pointer-events-none' : 'hover:scale-[1.02]'}`}>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Platform Icon with animated background */}
            <div 
              className="relative p-3 rounded-2xl transition-all duration-300 group-hover:scale-110"
              style={{ backgroundColor: platformColor + '15' }}
            >
              <div style={{ color: platformColor }}>
                {getPlatformIcon(link.name, 28)}
              </div>
              
              {/* Glow effect on hover */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-md"
                style={{ backgroundColor: platformColor }}
              />
            </div>
            
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 text-lg truncate">
                  {displayHandle}
                </span>
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={14} className="text-gray-500 hover:text-gray-700" />
                </a>
              </div>
              
              <div className="flex items-center gap-1">
                <span 
                  className="text-sm font-medium capitalize"
                  style={{ color: platformColor }}
                >
                  {platformData?.name || link.name}
                </span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-xs text-gray-500">
                  Connected
                </span>
              </div>
              
              {/* Stats - can be uncommented when available */}
              {/* <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Eye size={12} />
                  <span>{link.views || 0} views</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MousePointer size={12} />
                  <span>{link.clicks || 0} clicks</span>
                </div>
              </div> */}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onEdit(link.id)}
              className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
              disabled={isDeleting}
            >
              <Edit size={16} />
            </button>
            
            <button 
              onClick={() => onDelete(link.id)}
              className="p-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Trash2 size={16} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Loading overlay */}
      {isDeleting && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm font-medium">Deleting...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialLinkItem;