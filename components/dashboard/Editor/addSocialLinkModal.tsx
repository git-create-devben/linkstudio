import React, { useEffect, useState } from 'react';
import { SocialLink, SocialPlatform } from '@/types/editorTypes';
import PlatformSelector from './platFormSelector';
// import SocialLinkForm from './socialLinkForm';
import { socialPlatforms } from './panels/socialLink';
import { X } from 'lucide-react';

interface AddSocialLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (platform: string, handle: string) => void;
  initialData?: SocialLink;
}

const AddSocialLinkModal: React.FC<AddSocialLinkModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | null>(null);
  const [handle, setHandle] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (isOpen && initialData) {
      const platformKey = initialData.name;
      const platformData = socialPlatforms[platformKey];

      if (platformData) {
        setSelectedPlatform({ name: platformKey, baseUrl: platformData.baseUrl, icon: platformData.icon } as SocialPlatform);
        const handleValue = initialData.url.replace(platformData.baseUrl, '');
        setHandle(handleValue);
      }
    } else {
      setSelectedPlatform(null);
      setHandle('');
    }
  }, [isOpen, initialData]);

  const handleSubmit = () => {
    if (selectedPlatform && handle) {
      onSave(selectedPlatform as any, handle);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/65 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 max-h-[80vh] overflow-hidden text-black">
        {selectedPlatform ? (
          <>
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Add Social link</h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {initialData?.name} Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={initialData?.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!username.trim()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Done
                </button>
              </div>
            </form>
          </>
        ) : (
          <PlatformSelector
            onClose={onClose}
            onSelect={(platform) => setSelectedPlatform(platform)}
          />
        )}
      </div>
    </div>
  );
};

export default AddSocialLinkModal;
