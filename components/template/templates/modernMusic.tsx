import React from 'react';
import { TemplateProps } from '@/types/editorTypes';
import { UniversalTemplate } from '../system/UniversalTemplate';

const ModernMusicTemplate: React.FC<TemplateProps> = (props) => {
  return <UniversalTemplate templateId="modernMusic" {...props} />;
};

export default ModernMusicTemplate;