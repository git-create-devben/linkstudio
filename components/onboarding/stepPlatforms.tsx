import { saveUserPlatform} from "@/actions/onboardingActions";
import { getSupabaseId } from '@/lib/user/getUser';
import { Instagram, Youtube, Music, MessageSquare, Globe } from "lucide-react";
import { useState } from "react";

const StepPlatform = ({
    nextStep,
    formData,
    updateFormData
  }: {
    nextStep: () => void;
    formData: { platforms: string[] };
    updateFormData: (field: keyof FormDataType, value: FormDataType[keyof FormDataType]) => void;
  }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const { userId, loading } = getSupabaseId();
    const platforms = [
      { id: 'instagram', name: 'Instagram', icon: <Instagram className="w-6 h-6" />, color: 'from-pink-500 to-orange-500' },
      { id: 'youtube', name: 'YouTube', icon: <Youtube className="w-6 h-6" />, color: 'from-red-500 to-red-600' },
      { id: 'tiktok', name: 'TikTok', icon: <Music className="w-6 h-6" />, color: 'from-gray-800 to-gray-900' },
      { id: 'twitter', name: 'X (Twitter)', icon: <MessageSquare className="w-6 h-6" />, color: 'from-gray-700 to-gray-800' },
      { id: 'spotify', name: 'Spotify', icon: <Music className="w-6 h-6" />, color: 'from-green-500 to-green-600' },
      { id: 'website', name: 'Personal Website', icon: <Globe className="w-6 h-6" />, color: 'from-blue-500 to-blue-600' }
    ];

    const togglePlatform = (platformId: string) => {
      const updatedPlatforms = formData.platforms.includes(platformId)
        ? formData.platforms.filter(p => p !== platformId)
        : [...formData.platforms, platformId];
      updateFormData('platforms', updatedPlatforms);
    };

   
  
    if (loading) return <p className="flex items-center justify-center text-black">Loading steps...</p>;
  
  
    const savePlatformAndProceed = async () => {
      setIsSaving(true);
      setError('');
  
      try {
        const result = await saveUserPlatform(userId, formData.platforms);
  
        if (result.success) {
          nextStep(); 
        } else {
          setError(result.message || 'Failed to save platform');
        }
      } catch (error) {
        setError('An error occurred while saving the platform');
      } finally {
        setIsSaving(false);
      }
    };
    return (
      <div className="text-center max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Which platforms are you on?</h2>
        <p className="text-gray-600 mb-8">Pick up to five to get started. You can update at any time.</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => togglePlatform(platform.id)}
              disabled={!formData.platforms.includes(platform.id) && formData.platforms.length >= 5}
              className={`p-4 rounded-2xl border-2 transition-all ${
                formData.platforms.includes(platform.id)
                  ? 'border-blue-500 bg-blue-50'
                  : formData.platforms.length >= 5
                  ? 'border-gray-200 opacity-50 cursor-not-allowed'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} mx-auto mb-3 flex items-center justify-center text-white`}>
                {platform.icon}
              </div>
              <p className="font-medium text-gray-900">{platform.name}</p>
            </button>
          ))}
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <button
          onClick={savePlatformAndProceed}
          disabled={formData.platforms.length === 0 || !formData.platforms || isSaving}
          className="w-full bg-gray-900 text-white py-4 px-8 rounded-2xl font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
           {isSaving ? 'Saving...' : 'Continue'}
        </button>
      </div>
    );
  };

export default StepPlatform;
