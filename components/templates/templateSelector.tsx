import { templates } from './templateData';

type Props = {
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
};

const TemplateSelector = ({ selectedTemplate, onSelect }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.id)}
          className={`p-4 rounded-2xl border-2 transition-all ${
            selectedTemplate === template.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          {template.preview}
          <div className="mt-4 text-center">
            <h3 className="font-semibold text-gray-900">{template.name}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;