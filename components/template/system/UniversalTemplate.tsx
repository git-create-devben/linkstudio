import React from 'react';
import { TemplateProps } from '@/types/editorTypes';
import { TemplateEngine } from './TemplateEngine';
import { templateConfigs, templateStyles } from '../configs/templateConfigs';

interface UniversalTemplateProps extends TemplateProps {
  templateId: string;
}

export const UniversalTemplate: React.FC<UniversalTemplateProps> = ({
  templateId,
  ...props
}) => {
  const config = templateConfigs[templateId];
  const customStyles = templateStyles[templateId];



  if (!config) {
    console.warn(`Template config not found for: ${templateId}`);
    return <div>Template not found</div>;
  }

  return (
    <TemplateEngine
      {...props}
      config={config}
      customStyles={customStyles}
    />
  );
};