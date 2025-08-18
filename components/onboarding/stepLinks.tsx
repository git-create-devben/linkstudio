// import { saveUserLinks } from "@/actions/onboardingActions";
import { getSupabaseId } from '@/lib/user/getUser';
import { Globe } from "lucide-react";
import { useState } from "react";

const StepLinks = ({
  nextStep,
  formData,
  updateFormData
}: {
  nextStep: () => void;
  formData: { links: string[] };
  updateFormData: (field: keyof FormDataType, value: FormDataType[keyof FormDataType]) => void;
}) => {

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const { userId, loading } = getSupabaseId ();
  if (loading) return <p className="flex items-center justify-center text-black">Loading...</p>;


  const saveLinksAndProceed = async () => {
    setIsSaving(true);
    setError('');
    const cleanedLinks = formData.links.filter(link => link.trim() !== '');
    try {
      // const result = await saveUserLinks(userId, cleanedLinks);

      // if (result.success) {
      //   nextStep();
      // } else {
      //   setError(JSON.stringify(result.message) || 'Failed to save links');
      // }
    } catch (error) {
      setError('An error occurred while saving the links, try again');
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="text-center max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Add your links</h2>
      <p className="text-gray-600 mb-8">Complete the fields below to add your content to your new MyLinks.</p>

      <div className="space-y-4 mb-8">
        <h3 className="text-left font-semibold text-gray-900">Additional links</h3>
        {formData.links.map((link, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5 text-gray-600" />
            </div>
            <input
              type="url"
              placeholder="url"
              value={link}
              onChange={(e) => {
                const newLinks = [...formData.links];
                newLinks[index] = e.target.value;
                updateFormData('links', newLinks);
              }}
              className="flex-1 p-4 border border-gray-200 rounded-xl text-black focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={saveLinksAndProceed}
        disabled={formData.links.length === 0 || !formData.links || isSaving}
        className="w-full bg-gray-900 text-white py-4 px-8 rounded-2xl font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isSaving ? 'Saving...' : 'Continue'}
      </button>
    </div>
  )
};

export default StepLinks; 