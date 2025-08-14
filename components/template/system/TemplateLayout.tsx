import React from 'react';

interface TemplateLayoutProps {
  layout: 'centered' | 'card' | 'fullscreen';
  spacing: 'compact' | 'normal' | 'spacious';
  children: React.ReactNode;
}

const layoutStyles = {
  centered: 'min-h-screen flex flex-col items-center justify-start',
  card: 'min-h-screen flex items-center justify-center p-4',
  fullscreen: 'min-h-screen w-full'
};

const spacingStyles = {
  compact: 'space-y-3',
  normal: 'space-y-6',
  spacious: 'space-y-12'
};

export const TemplateLayout: React.FC<TemplateLayoutProps> = ({
  layout,
  spacing,
  children
}) => {
  return (
    <div className={`${layoutStyles[layout]} ${spacingStyles[spacing]} relative overflow-hidden`}>
      {children}
    </div>
  );
};