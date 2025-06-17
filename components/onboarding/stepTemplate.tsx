// pages/components/TemplateStep.tsx or wherever you're using it
import { saveUserTemplate } from '@/actions/onboardingActions';
import TemplateSelector from '@/components/template/templateSelector';
import { getSupabaseId } from '@/lib/user/getUser';
import { useState } from 'react';

const TemplateStep = ({
  nextStep,
  formData,
  updateFormData
}: {
  nextStep: () => void;
  formData: { template: string };
  updateFormData: (field: keyof FormDataType, value: FormDataType[keyof FormDataType]) => void;
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const { userId, loading } = getSupabaseId();

  if (loading) return <p className="flex items-center justify-center text-black">Loading steps...</p>;


  const saveTemplateAndProceed = async () => {
    setIsSaving(true);
    setError('');

    try {
      const result = await saveUserTemplate(userId, formData.template);

      if (result.success) {
        nextStep(); // Proceed to the next step if the goal is saved successfully
      } else {
        setError(result.message || 'Failed to save goal');
      }
    } catch (error) {
      setError('An error occurred while saving the goal');
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Select a template</h2>
      <p className="text-gray-600 mb-8">
        Pick the style that feels right - you can add your content later
      </p>

      <TemplateSelector
        selectedTemplate={formData.template}
        onSelect={(id) => updateFormData('template', id)}
      />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={saveTemplateAndProceed}
        disabled={!formData.template || isSaving}
        className="w-full bg-gray-900 text-white py-4 px-8 rounded-2xl font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isSaving ? 'Saving...' : 'Continue'}
      </button>
    </div>
  );
};

export default TemplateStep;