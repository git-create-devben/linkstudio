import React from 'react';
import { TemplateProps } from '@/types/editorTypes';
import { UniversalTemplate } from '../system/UniversalTemplate';

const CreativeTemplate: React.FC<TemplateProps> = (props) => {
  return <UniversalTemplate templateId="creative" {...props} />;
};

export default CreativeTemplate;