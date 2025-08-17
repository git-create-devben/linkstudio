// components/StepProfile.tsx
'use client';

import React, { useState, useRef } from 'react';
import { Camera, Plus, X, Upload, AlertCircle } from 'lucide-react';
import { saveUserProfile } from '@/actions/onboardingActions';
import { getSupabaseId } from '@/lib/user/getUser';

const StepProfile = ({
  nextStep,
  formData,
  updateFormData,
}: {
  nextStep: () => void;
  formData: { displayName: string; bio: string; profileImage: File | null };
  updateFormData: (field: keyof FormDataType, value: FormDataType[keyof FormDataType]) => void;
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { userId, loading } = getSupabaseId();

  if (loading) return <p className="flex items-center justify-center text-black">Loading...</p>;

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    setError('');
    setIsUploadingImage(true);

    try {
      updateFormData('profileImage', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setIsUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setError('Failed to process image');
      setIsUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    updateFormData('profileImage', null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const result = await saveUserProfile(userId, formData.bio, formData.displayName, formData.profileImage);

      if (result.success) {
        nextStep();
      } else {
        setError(result.message || 'Failed to save profile');
      }
    } catch (error) {
      setError('An error occurred while saving the profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="text-center max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Add profile details</h2>
      <p className="text-gray-600 mb-8">Add your profile image, name, and bio.</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className={`w-full h-full rounded-full overflow-hidden ${!imagePreview ? 'bg-gray-100' : ''} flex items-center justify-center group relative`}>
              {isUploadingImage ? (
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-6 h-6 text-blue-500 animate-pulse mb-2" />
                  <span className="text-xs text-gray-500">Processing...</span>
                </div>
              ) : imagePreview ? (
                <>
                  <img src={imagePreview} alt="Profile preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-white hover:text-blue-200 transition-colors text-sm"
                      disabled={isUploadingImage}
                    >
                      Change Photo
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <Camera className="w-8 h-8 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">Add Photo</span>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            {!imagePreview && !isUploadingImage && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                disabled={isUploadingImage}
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
            )}
            {imagePreview && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-2">Display Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.displayName}
                onChange={(e) => updateFormData('displayName', e.target.value)}
                className="w-full text-black p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                placeholder="Tell people about yourself"
                value={formData.bio}
                onChange={(e) => updateFormData('bio', e.target.value)}
                rows={3}
                className="w-full text-black p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
              <p className="text-right text-sm text-gray-500 mt-1">{formData.bio.length}/160</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSaving || isUploadingImage}
          className="w-full bg-blue-600 text-white py-4 px-8 rounded-2xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving Profile...
            </>
          ) : isUploadingImage ? (
            <>
              <Upload className="w-4 h-4 animate-pulse" />
              Processing Image...
            </>
          ) : (
            'Complete Setup'
          )}
        </button>
      </form>
    </div>
  );
};

export default StepProfile;
