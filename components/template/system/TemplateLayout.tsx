import React from 'react';

interface TemplateLayoutProps {
  layout: 'centered' | 'card' | 'fullscreen';
  spacing: 'compact' | 'normal' | 'spacious';
  children: React.ReactNode;
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
  children
}) => {
  return (
    <div className={`${layoutStyles[layout]} ${spacingStyles[spacing]} relative`}>
      {children}
    </div>
  );
};