// components/StepProfile.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Camera, Plus, X } from 'lucide-react';
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
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { userId, loading } = getSupabaseId();

  if (loading) return <p className="flex items-center justify-center text-black">Loading...</p>;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateFormData('profileImage', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    updateFormData('profileImage', null);
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
            <div className={`w-full h-full rounded-full overflow-hidden ${!imagePreview ? 'bg-gray-100' : ''} flex items-center justify-center group`}>
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Profile preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-white hover:text-blue-200 transition-colors"
                    >
                      Change Photo
                    </button>
                  </div>
                </>
              ) : (
                <Camera className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            {!imagePreview && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
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

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={isSaving}
          className="w-full bg-blue-600 text-white py-4 px-8 rounded-2xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSaving ? 'Saving...' : 'Complete Setup'}
        </button>
      </form>
    </div>
  );
};

export default StepProfile;
