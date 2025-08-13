import { ONBOARDING_STEPS } from "@/lib/constants";

export function getStepProgress(currentStep: number): number {
  return Math.round((currentStep / (ONBOARDING_STEPS.length - 1)) * 100);
}

export function isValidStep(step: number): boolean {
  return step >= 0 && step < ONBOARDING_STEPS.length;
}

export function getStepName(step: number): string {
  return ONBOARDING_STEPS[step] || "Unknown";
}

export function canGoBack(step: number): boolean {
  return step > 0;
}

export function canSkip(step: number): boolean {
  // Allow skipping all steps except Welcome and Complete
  return step > 0 && step < ONBOARDING_STEPS.length - 1;
}