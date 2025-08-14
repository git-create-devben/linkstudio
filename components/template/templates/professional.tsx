import React from 'react';
import { TemplateProps } from '@/types/editorTypes';
import { UniversalTemplate } from '../system/UniversalTemplate';

const ProfessionalTemplate: React.FC<TemplateProps> = (props) => {
  return <UniversalTemplate templateId="professional" {...props} />;
};

export default ProfessionalTemplate;