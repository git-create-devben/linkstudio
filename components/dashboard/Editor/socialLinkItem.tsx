import React from 'react';
import { Edit, MoreHorizontal, Instagram, Twitter, DeleteIcon } from 'lucide-react';
import { SocialLink } from '@/types/editorTypes';
import { getPlatformIcon } from '@/lib/getPlatformIcons';


interface SocialLinkItemProps {
  link: SocialLink;
  onEdit: (linkId: string) => void;
  onDelete: (linkId: string) => void;
}

const SocialLinkItem: React.FC<SocialLinkItemProps> = ({
  link,
  onEdit,
  onDelete
}) => {


  return (
    <div className="w-full p-4 rounded-xl transition-all duration-200 hover:bg-gray-50/80 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getPlatformIcon(link.name, 24)}
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">
              @{link.url ? (link.url.split('@')[1] || link.url.split('@@')[1]) || link.url : ''}
            </span>
            {/* <div className="text-sm text-gray-500">
              {link.views || 0} views • {link.clicks || 0} clicks
            </div> */}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(link.id)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Edit size={18} />
          </button>
          <button 
            onClick={() => onDelete(link.id)}
            className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <DeleteIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialLinkItem;