// pages/components/TemplateStep.tsx or wherever you're using it
import { saveUserTemplate } from '@/actions/onboardingActions';
import TemplateGrid from './TemplateGrid';
import { getSupabaseId } from '@/lib/user/getUser';
import { useState } from 'react';
import { useUserContentStore } from '@/stores/useContentStore';

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
  const { clearLocalStorage, forceResetToTemplate } = useUserContentStore();

  if (loading) return <p className="flex items-center justify-center text-black">Loading...</p>;

  const handleTemplateSelect = async (templateId: string) => {
    updateFormData('template', templateId);

    setIsSaving(true);
    setError('');

    try {
      // Clear localStorage and immediately set the new template in the store
      clearLocalStorage();
      
      // Force reset the store to the new template immediately
      forceResetToTemplate(templateId);
      
      const result = await saveUserTemplate(userId, templateId);

      if (result.success) {
        nextStep(); // Proceed to the next step if the template is saved successfully
      } else {
        setError(result.message || 'Failed to save template');
      }
    } catch (error) {
      console.error('Error saving template:', error);
      setError('An error occurred while saving the template');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <TemplateGrid
        selectedTemplate={formData.template}
        onSelect={handleTemplateSelect}
      />

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      )}

      {isSaving && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-900 font-medium">Setting up your template...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateStep;