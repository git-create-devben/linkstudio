"use client"
import { useState, useEffect } from "react";
import { getSupabaseId } from '@/lib/user/getUser';

const StepUsername = ({
  nextStep,
  formData,
  updateFormData,
}: {
  nextStep: () => void;
  formData: { username: string };
  updateFormData: (field: keyof FormDataType, value: FormDataType[keyof FormDataType]) => void;
}) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [error, setError] = useState('');
  const { userId, loading } = getSupabaseId();

  if (loading) return <p className="flex items-center justify-center text-black">Loading...</p>;

  const checkUsernameAvailability = async () => {
    if (!formData.username || !userId) {
      setError('Username or user ID is missing');
      return;
    }

    setIsChecking(true);
    setError('');

    try {
      const response = await fetch('/onboarding/api/checkUsername', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: formData.username, userId }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAvailable(data.available);
        if (data.available) {
          nextStep();
        } else {
          setError('Username is not available');
        }
      } else {
        setError(data.message || 'Failed to check username availability');
      }
    } catch (error) {
      setError('An error occurred while checking username availability');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="text-center max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose your MyLinks username</h2>
      <p className="text-gray-600 mb-8">
        for <span className="font-medium">user@privaterelay.appleid.com</span>. You can always change it later.
      </p>
      <div className="bg-gray-50 rounded-2xl p-4 mb-4">
        <div className="flex items-center text-gray-700">
          <span className="text-lg">mylinks.com/</span>
          <input
            type="text"
            placeholder="username"
            value={formData.username}
            onChange={(e) => updateFormData('username', e.target.value)}
            className="bg-transparent border-none outline-none flex-1 text-lg"
          />
        </div>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={checkUsernameAvailability}
        disabled={!formData.username || isChecking}
        className="w-full bg-gray-900 text-white py-4 px-8 rounded-2xl disabled:bg-gray-300"
      >
        {isChecking ? 'Checking...' : 'Continue'}
      </button>
    </div>
  );
};

export default StepUsername;