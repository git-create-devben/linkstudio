"use client"
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import StepWelcome from './stepWelcome';
import StepUsername from './stepUsername';
import StepGoal from './stepGoal';
import StepTemplate from './stepTemplate';
import ProgressBar from './progressBar';
import BackButton from './backButton';
import SkipButton from './skipButton';
import StepPlatform from './stepPlatforms';
import StepProfile from './stepProfile';
import OnboardingComplete from './onboardingComplete';
import { fetchOnboardingStatus, updateOnboardingStatus } from '@/actions/onboardingActions';
import { getSupabaseId } from '@/lib/user/getUser';
import { useRouter } from 'next/navigation';
import { useUserContentStore } from '@/stores/useContentStore';

const steps = [
  'Welcome',
  'Username',
  'Profile',
  'Template',
  'Goal',
  'Platforms',
  // 'Links',
  'Complete'
]

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState<number | any>(0);
  const [formData, setFormData] = useState<FormDataType>({
    username: '',
    goal: '',
    template: '',
    platforms: [''],
    links: [''],
    displayName: '',
    bio: '',
    profileImage: null
  });

  const router = useRouter();
  const { userId, loading } = getSupabaseId();
  const { clearLocalStorage } = useUserContentStore();

  // const checkIfOnboardingComplete = useCallback(async () => {
  //   if (!userId) return;
  //   const result = await fetchOnboardingStatus(userId);
  //   if (result?.onboardingCompleted === true) {
  //     router.push('/dashboard');
  //   }
  // }, [userId, router]);

  useEffect(() => {
    const loadStatus = async () => {
      if (!loading && userId) {
        const result = await fetchOnboardingStatus(userId);

        if (result.onboardingCompleted === true) {
          router.push('/dashboard/editor');
          return;
        }

        // If user is starting fresh onboarding (step 0 or 1), clear localStorage
        // to ensure no old template data interferes with new selections
        if (result.onboardingStep <= 1) {
          clearLocalStorage();
        }

        setCurrentStep(result.onboardingStep);
      }
    };

    loadStatus();
  }, [userId, loading, router, clearLocalStorage]);

  const nextStep = useCallback(async () => {
    if (!userId || currentStep >= steps.length - 1) return;
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
    await updateOnboardingStatus(userId, newStep);
  }, [currentStep, userId]);

  const prevStep = useCallback(() => {
    if (!userId || currentStep <= 0) return;
    const newStep = currentStep - 1;
    setCurrentStep(newStep);
    updateOnboardingStatus(userId, newStep).catch(console.error);
  }, [currentStep, userId]);

  const skipStep = useCallback(() => nextStep(), [nextStep]);

  const completeOnboarding = useCallback(async () => {
    if (!userId) return;
    await updateOnboardingStatus(userId, currentStep, true);
  }, [userId, currentStep]);

  const updateFormData = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const stepComponents = useMemo(() => [
    <StepWelcome key="welcome" nextStep={nextStep} />,
    <StepUsername key="username" nextStep={nextStep} formData={formData} updateFormData={updateFormData} />,
    <StepProfile key="profile" nextStep={nextStep} formData={formData} updateFormData={updateFormData} />,
    <StepTemplate key="template" nextStep={nextStep} formData={formData} updateFormData={updateFormData} />,
    <StepGoal key="goal" nextStep={nextStep} formData={formData} updateFormData={updateFormData} />,
    <StepPlatform key="platform" nextStep={nextStep} formData={formData} updateFormData={updateFormData} />,
    <OnboardingComplete key="complete" completeOnboarding={completeOnboarding} />
  ], [nextStep, formData, updateFormData, completeOnboarding]);

  if (loading) {
    return (
      <div className="relative p-6">
        <p className="flex items-center justify-center text-black">Loading...</p>
      </div>
    );
  }

  if (typeof currentStep !== 'number' || currentStep < 0 || currentStep >= stepComponents.length) {
    return <p className="flex items-center justify-center text-black">Invalid onboarding step</p>;
  }

  return (
    <div className="relative p-6">
      <BackButton currentStep={currentStep} onClick={prevStep} />
      <SkipButton currentStep={currentStep} onClick={skipStep} />
      <ProgressBar steps={steps} currentStep={currentStep} />
      {stepComponents[currentStep]}
    </div>
  );
};

export default OnboardingFlow;