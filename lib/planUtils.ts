// lib/planUtils.ts
export type PlanType = 'free' | 'starter' | 'pro' | 'premium';

export interface PlanLimits {
  maxActions: number;
  analytics: boolean;
  customDomain: boolean;
  templates: string[];
  socialLinks: number;
  emailCapture: boolean;
  whatsappIntegration: boolean;
  removeBranding: boolean;
  customCSS: boolean;
  advancedCustomization: boolean;
  verifiedBadge: boolean;
  prioritySupport: boolean;
  miniShop: boolean;
  customFavicon: boolean;
  customDevelopment: boolean;
  slaGuarantee: boolean;
}

export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  free: {
    maxActions: 2,
    analytics: false,
    customDomain: false,
    templates: ['minimal'], // Only basic template
    socialLinks: 3,
    emailCapture: false,
    whatsappIntegration: false,
    removeBranding: false,
    customCSS: false,
    advancedCustomization: false,
    verifiedBadge: false,
    prioritySupport: false,
    miniShop: false,
    customFavicon: false,
    customDevelopment: false,
    slaGuarantee: false,
  },
  starter: {
    maxActions: 5,
    analytics: true, // Standard analytics only
    customDomain: true,
    templates: ['minimal', 'standard', 'modern'],
    socialLinks: 10,
    emailCapture: true,
    whatsappIntegration: false,
    removeBranding: false,
    customCSS: false,
    advancedCustomization: false,
    verifiedBadge: true,
    prioritySupport: true,
    miniShop: false,
    customFavicon: false,
    customDevelopment: false,
    slaGuarantee: false,
  },
  pro: {
    maxActions: -1, // Unlimited
    analytics: true, // Advanced analytics
    customDomain: true,
    templates: ['minimal', 'standard', 'modern', 'premium'],
    socialLinks: -1, // Unlimited
    emailCapture: true,
    whatsappIntegration: true,
    removeBranding: true,
    customCSS: true,
    advancedCustomization: true,
    verifiedBadge: true,
    prioritySupport: true,
    miniShop: false,
    customFavicon: false,
    customDevelopment: false,
    slaGuarantee: false,
  },
  premium: {
    maxActions: -1, // Unlimited
    analytics: true, // Advanced analytics with custom reports
    customDomain: true,
    templates: ['minimal', 'standard', 'modern', 'premium', 'enterprise'],
    socialLinks: -1, // Unlimited
    emailCapture: true,
    whatsappIntegration: true,
    removeBranding: true,
    customCSS: true,
    advancedCustomization: true,
    verifiedBadge: true,
    prioritySupport: true,
    miniShop: true,
    customFavicon: true,
    customDevelopment: true,
    slaGuarantee: true,
  },
};

export interface UserWithPlan {
  id: string;
  email: string;
  username: string | null;
  plan: string | null;
  isActive: boolean;
  createdAt: Date;
  profile?: any;
}

export function getUserPlan(user: UserWithPlan | null): PlanType {
  if (!user || !user.plan || !user.isActive) {
    return 'free';
  }
  
  const plan = user.plan.toLowerCase() as PlanType;
  return PLAN_LIMITS[plan] ? plan : 'free';
}

export function getPlanLimits(plan: PlanType): PlanLimits {
  return PLAN_LIMITS[plan];
}

export function canUserAddAction(user: UserWithPlan | null, currentActionCount: number): boolean {
  const plan = getUserPlan(user);
  const limits = getPlanLimits(plan);
  
  return limits.maxActions === -1 || currentActionCount < limits.maxActions;
}

export function canUserAddSocialLink(user: UserWithPlan | null, currentSocialLinksCount: number): boolean {
  const plan = getUserPlan(user);
  const limits = getPlanLimits(plan);
  
  return limits.socialLinks === -1 || currentSocialLinksCount < limits.socialLinks;
}

export function canUserAccessFeature(user: UserWithPlan | null, feature: keyof PlanLimits): boolean {
  const plan = getUserPlan(user);
  const limits = getPlanLimits(plan);
  
  return Boolean(limits[feature]);
}

export function getPlanDisplayName(plan: PlanType): string {
  const names = {
    free: 'Free',
    starter: 'Starter',
    pro: 'Pro',
    premium: 'Premium'
  };
  return names[plan];
}

export function isFeatureDisabled(user: UserWithPlan | null, feature: keyof PlanLimits): boolean {
  return !canUserAccessFeature(user, feature);
}

// Helper to get upgrade message for a specific feature
export function getUpgradeMessage(feature: keyof PlanLimits): string {
  const messages: Record<keyof PlanLimits, string> = {
    maxActions: 'Upgrade to add more actions to your page',
    analytics: 'Upgrade to access detailed analytics',
    customDomain: 'Upgrade to use your custom domain',
    templates: 'Upgrade to access more templates',
    socialLinks: 'Upgrade to add more social links',
    emailCapture: 'Upgrade to capture visitor emails',
    whatsappIntegration: 'Upgrade for WhatsApp catalog integration',
    removeBranding: 'Upgrade to remove LinkStudio branding',
    customCSS: 'Upgrade for custom CSS & HTML',
    advancedCustomization: 'Upgrade for advanced customization',
    verifiedBadge: 'Upgrade to get a verified badge',
    prioritySupport: 'Upgrade for priority support',
    miniShop: 'Upgrade to enable mini-shop features',
    customFavicon: 'Upgrade for custom favicon',
    customDevelopment: 'Contact us for custom development',
    slaGuarantee: 'Upgrade for SLA guarantee',
  };
  
  return messages[feature] || 'Upgrade your plan to access this feature';
}

// Get the minimum plan required for a feature
export function getMinimumPlanForFeature(feature: keyof PlanLimits): PlanType {
  const plans: PlanType[] = ['free', 'starter', 'pro', 'premium'];
  
  for (const plan of plans) {
    if (PLAN_LIMITS[plan][feature]) {
      return plan;
    }
  }
  
  return 'premium'; // Default to premium if not found
}
