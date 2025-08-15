import React from 'react';
import { DesignType } from '@/types/editorTypes';
import { StyleVariant } from '../types';
import { getPlatformIcon } from '@/lib/getPlatformIcons';
import { getTheme } from '@/lib/themeSystem';

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

  const theme = getTheme(design.theme || 'dark');

  const getContainerStyles = () => ({
    ...customStyles.container
  });

  const getLinkStyles = (index: number) => {
    const baseStyles = {
      animationDelay: `${index * 200}ms`,
      ...customStyles.link
    };

    // Theme-specific styles
    switch (design.theme) {
      case 'light':
        return {
          ...baseStyles,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          color: '#2d3748'
        };
      case 'dark':
        return {
          ...baseStyles,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          color: '#ffffff'
        };
      case 'glassmorphic':
      default:
        return {
          ...baseStyles,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
          color: '#ffffff'
        };
    }
  };

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
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
            style={{
              background: design.theme === 'light' 
                ? 'linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05))'
                : 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
              transform: 'scale(1.05)',
            }}
          />

          <div
            className="relative transition-all duration-300 group-hover:scale-125"
            style={{ 
              color: design.theme === 'light' ? '#2d3748' : '#ffffff'
            }}
          >
            {getPlatformIcon(link.name, 28)}
          </div>
        </a>
      ))}
    </div>
  );
};