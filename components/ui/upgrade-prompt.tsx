// components/ui/upgrade-prompt.tsx
"use client";

import React from 'react';
import { Crown, Zap, Users, Star } from 'lucide-react';
import { Button } from './button';
import { useRouter } from 'next/navigation';
import { PlanType, getPlanDisplayName, getMinimumPlanForFeature, PlanLimits } from '@/lib/planUtils';

interface UpgradePromptProps {
  feature: keyof PlanLimits;
  message?: string;
  variant?: 'inline' | 'modal' | 'banner';
  size?: 'sm' | 'md' | 'lg';
}

const planIcons = {
  free: Star,
  starter: Zap,
  pro: Users,
  premium: Crown,
};

const planColors = {
  free: 'from-gray-500 to-gray-600',
  starter: 'from-blue-500 to-blue-600',
  pro: 'from-purple-500 to-purple-600',
  premium: 'from-yellow-500 to-yellow-600',
};

export function UpgradePrompt({ 
  feature, 
  message, 
  variant = 'inline', 
  size = 'md' 
}: UpgradePromptProps) {
  const router = useRouter();
  const requiredPlan = getMinimumPlanForFeature(feature);
  const PlanIcon = planIcons[requiredPlan];

  const sizeClasses = {
    sm: 'p-4 text-sm',
    md: 'p-6 text-base',
    lg: 'p-8 text-lg',
  };

  const handleUpgrade = () => {
    router.push('/payment');
  };

  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <PlanIcon className={`w-5 h-5 text-${requiredPlan === 'premium' ? 'yellow' : requiredPlan === 'pro' ? 'purple' : 'blue'}-600`} />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {message || `Upgrade to ${getPlanDisplayName(requiredPlan)} to unlock this feature`}
              </p>
            </div>
          </div>
          <Button onClick={handleUpgrade} size="sm" className="ml-4">
            Upgrade
          </Button>
        </div>
      </div>
    );
  }

  if (variant === 'modal') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
          <div className={`bg-gradient-to-r ${planColors[requiredPlan]} p-6 text-white text-center`}>
            <PlanIcon className="w-12 h-12 mx-auto mb-3" />
            <h3 className="text-xl font-bold">Upgrade Required</h3>
            <p className="text-sm opacity-90">
              {getPlanDisplayName(requiredPlan)} Plan
            </p>
          </div>
          <div className="p-6">
            <p className="text-gray-600 mb-6 text-center">
              {message || `This feature requires a ${getPlanDisplayName(requiredPlan)} plan or higher.`}
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpgrade}
                className="flex-1"
              >
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default inline variant
  return (
    <div className={`bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-xl ${sizeClasses[size]} text-center`}>
      <div className="flex flex-col items-center space-y-4">
        <div className={`bg-gradient-to-r ${planColors[requiredPlan]} w-12 h-12 rounded-full flex items-center justify-center`}>
          <PlanIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">
            {getPlanDisplayName(requiredPlan)} Feature
          </h3>
          <p className="text-gray-600 mb-4">
            {message || `Upgrade to ${getPlanDisplayName(requiredPlan)} to unlock this feature and more!`}
          </p>
          <Button onClick={handleUpgrade} className="w-full">
            Upgrade to {getPlanDisplayName(requiredPlan)}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function FeatureGate({ 
  user, 
  feature, 
  children, 
  fallback, 
  variant = 'inline' 
}: {
  user: any;
  feature: keyof PlanLimits;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  variant?: 'inline' | 'modal' | 'banner';
}) {
  const requiredPlan = getMinimumPlanForFeature(feature);
  const userPlan = user?.plan?.toLowerCase() as PlanType || 'free';
  
  // Check if user has access to this feature
  const hasAccess = user?.isActive && 
    [ 'pro', 'premium'].includes(userPlan) && 
    ['pro', 'premium'].indexOf(userPlan) >= ['pro', 'premium'].indexOf(requiredPlan);

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return <UpgradePrompt feature={feature} variant={variant} />;
}
