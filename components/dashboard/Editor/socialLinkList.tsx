import React from 'react';
import { Edit, MoreHorizontal } from 'lucide-react';
import { SocialLink } from '@/types/editorTypes';
import SocialLinkItem from './socialLinkItem';

interface SocialLinksListProps {
  links: SocialLink[];
  onEdit: (linkId: string) => void;
  onDelete: (linkId: string) => void;
}

const SocialLinksList: React.FC<SocialLinksListProps> = ({ 
  links, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="space-y-3 ">
      {links?.map((link) => (
        <SocialLinkItem
          key={link.id}
          link={link}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default SocialLinksList;