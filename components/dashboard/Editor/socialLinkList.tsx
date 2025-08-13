import React from 'react';
import { Edit, MoreHorizontal } from 'lucide-react';
import { SocialLink } from '@/types/editorTypes';
import SocialLinkItem from './socialLinkItem';

interface SocialLinksListProps {
  links: SocialLink[];
  onEdit: (linkId: string) => void;
  onDelete: (linkId: string) => void;
  deletingId?: string | null;
}

const SocialLinksList: React.FC<SocialLinksListProps> = ({ 
  links, 
  onEdit, 
  onDelete,
  deletingId 
}) => {
  return (
    <div className="space-y-4">
      {links?.map((link) => (
        <SocialLinkItem
          key={link.id}
          link={link}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={deletingId === link.id}
        />
      ))}
    </div>
  );
};

export default SocialLinksList;