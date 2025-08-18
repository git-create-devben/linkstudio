import { getTheme } from '@/lib/themeSystem';
import { DesignType } from '@/types/editorTypes';
import React from 'react';

interface TemplateLayoutProps {
  layout: 'centered' | 'card' | 'fullscreen';
  spacing: 'compact' | 'normal' | 'spacious';
  children: React.ReactNode;
  background?: string;
  design: DesignType;
  type: 'gradient' | 'image' | 'pattern' | 'animated';
}

const layoutStyles = {
  centered: 'flex flex-col items-center justify-start py-8',
  card: 'flex items-start justify-center p-4 py-8',
  fullscreen: 'w-full py-8'
};

const spacingStyles = {
  compact: 'space-y-3',
  normal: 'space-y-6',
  spacious: 'space-y-12'
};

export const TemplateLayout: React.FC<TemplateLayoutProps> = ({
  layout,
  spacing,
  children,
  background,
  type,
  design
}) => {
  const theme = getTheme(design.theme || 'dark');

  const getBackgroundStyle = () => {
    switch (type) {
      case 'gradient':
        return {
          background: design.customBackground || theme.colors.background
        };

      case 'animated':
        return {
          background: design.customBackground || theme.colors.background
        };

      case 'image':
        return design.banner?.type === 'image' && design.banner.value ? {
          backgroundImage: `url(${design.banner.value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        } : {
          background: design.customBackground || theme.colors.background
        };

      case 'pattern':
        return {
          background: design.customBackground || theme.colors.background
        };

      default:
        return {
          background: design.customBackground || theme.colors.background
        };
    }
  };
  return (
    <div className={`${layoutStyles[layout]} ${spacingStyles[spacing]} relativen transition-all duration-500`}
      style={getBackgroundStyle()}>
      {children}
    </div>
  );
};