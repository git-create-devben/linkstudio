import React from 'react';
import { TemplateProps } from '@/types/editorTypes';
import { UniversalTemplate } from '../system/UniversalTemplate';

const TravelerTemplate: React.FC<TemplateProps> = (props) => {
  return <UniversalTemplate templateId="traveler" {...props} />;
};

export default TravelerTemplate;