import { templates } from '@/components/template/templateData';
import PhoneMockup from '../phoneMockup';

type Props = {
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
};

const TemplateSelector = ({ selectedTemplate, onSelect }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      {templates.map((template: any) => (
        <div
          key={template.id}
          onClick={() => onSelect(template.id)}
          className={` py-4 px-1 cursor-pointer rounded-2xl border-2 transition-all ${selectedTemplate === template.id
              ? 'border-blue-400 bg-blue-5'
              : 'border-gray-200 hover:border-gray-300'
            }`}
        >
          <div className="pointer-events-none h-80">
            <PhoneMockup>
              {template.preview}
            </PhoneMockup>

          </div>
          <div className="mt-2 text-center">
            <h3 className="font-semibold text-gray-900">{template.name}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateSelector;