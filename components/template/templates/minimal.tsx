import React from 'react';
import { TemplateProps } from '@/types/editorTypes';
import { UniversalTemplate } from '../system/UniversalTemplate';

const MinimalTemplate: React.FC<TemplateProps> = (props) => {
    return <UniversalTemplate templateId="minimal" {...props} />;
};

export default MinimalTemplate;