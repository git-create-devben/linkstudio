// components/GoalStep.tsx
'use client';

import React, { useState } from 'react';
// import useGoalSelection from '../hooks/useGoalSelection';
import { saveUserGoal } from '@/actions/onboardingActions';
import { getSupabaseId } from '@/lib/user/getUser';
import useGoalSelection from '@/hooks/useGoalSelection';

const GoalStep = ({
  nextStep,
  formData,
  updateFormData,
}: {
  nextStep: () => void;
  formData: { goal: string | null };
  updateFormData: (field: keyof FormDataType, value: FormDataType[keyof FormDataType]) => void;
}) => {
  const { goals, selectedGoal, selectGoal } = useGoalSelection(formData.goal);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const { userId, loading } = getSupabaseId();

  if (loading) return <p className="flex items-center justify-center text-black">Loading steps...</p>;
  const handleGoalSelect = (goalId: string) => {
    selectGoal(goalId);
    updateFormData('goal', goalId);
  };

  const saveGoalAndProceed = async () => {
    if (!selectedGoal) {
      setError('Please select a goal');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const result = await saveUserGoal(userId, selectedGoal);

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
    <div className="text-center max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Which best describes your goal for using LinkStudio?
      </h2>
      <p className="text-gray-600 mb-8">This helps us personalize your experience.</p>

      <div className="space-y-4 mb-8">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => handleGoalSelect(goal.id)}
            className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${selectedGoal === goal.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
              }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${goal.color}`}>
                {goal.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{goal.title}</h3>
                <p className="text-sm text-gray-600">{goal.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={saveGoalAndProceed}
        disabled={!selectedGoal || isSaving}
        className="w-full bg-gray-900 text-white py-4 px-8 rounded-2xl font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isSaving ? 'Saving...' : 'Continue'}
      </button>
    </div>
  );
};

export default GoalStep;
