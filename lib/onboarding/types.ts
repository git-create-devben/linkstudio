// Onboarding-related types
export interface FormDataType {
  username: string;
  goal: string;
  template: string;
  platforms: string[];
  links: string[];
  displayName: string;
  bio: string;
  profileImage: File | null;
}

export interface OnboardingStepProps {
  nextStep: () => void;
  formData?: FormDataType;
  updateFormData?: (field: string, value: any) => void;
  completeOnboarding?: () => Promise<void>;
}

export interface OnboardingStatus {
  onboardingStep: number;
  onboardingCompleted: boolean;
}