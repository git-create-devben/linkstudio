import React from 'react';
import { DesignType } from '@/types/editorTypes';
import { StyleVariant } from '../types';
import { getPlatformIcon } from '@/lib/getPlatformIcons';

interface SocialLink {
  id: string;
  name: string;
  url: string;
}

interface SocialLinksSectionProps {
  socialLinks?: SocialLink[];
  design: DesignType;
  customStyles?: StyleVariant['social'];
}

export const SocialLinksSection: React.FC<SocialLinksSectionProps> = ({
  socialLinks,
  design,
  customStyles = {}
}) => {
  if (!socialLinks || socialLinks.length === 0) return null;

  const getContainerStyles = () => ({
    ...customStyles.container
  });

  const getLinkStyles = (index: number) => ({
    animationDelay: `${index * 200}ms`,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255,255,255,0.4)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    ...customStyles.link
  });

  return (
    <div className="flex gap-4 mb-4 flex-wrap justify-center" style={getContainerStyles()}>
      {socialLinks.map((link, index) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-4 rounded-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-3 hover:rotate-6"
          style={getLinkStyles(index)}
        >
          {/* Hover effect */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2))',
              transform: 'scale(1.1)',
              animationDuration: '1s'
            }}
          />

          <div
            className="relative transition-all duration-300 group-hover:scale-125"
            style={{ color: '#ffffff' }}
          >
            {getPlatformIcon(link.name, 28)}
          </div>
        </a>
      ))}
    </div>
  );
};