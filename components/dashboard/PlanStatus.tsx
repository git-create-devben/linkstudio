"use client";

import React from 'react';
import { Crown, Zap, Users, Star, ChevronRight } from 'lucide-react';
import { getUserPlan, getPlanDisplayName, PlanType } from '@/lib/planUtils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { User } from '@/context/userContext';

interface PlanStatusProps {
  user: User | null;
  compact?: boolean;
}

const planIcons = {
  free: Star,
  starter: Zap,
  pro: Users,
  premium: Crown,
};

const planColors = {
  free: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    icon: 'text-gray-600'
  },
  starter: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    icon: 'text-blue-600'
  },
  pro: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    icon: 'text-purple-600'
  },
  premium: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    icon: 'text-yellow-600'
  },
};

export function PlanStatus({ user, compact = false }: PlanStatusProps) {
  const router = useRouter();
  const userPlan = getUserPlan(user);
  const PlanIcon = planIcons[userPlan];
  const colors = planColors[userPlan];

  const handleUpgrade = () => {
    router.push('/payment');
  };

  if (compact) {
    return (
      <div 
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors hover:opacity-80 ${colors.bg} ${colors.text}`}
        onClick={userPlan === 'free' ? handleUpgrade : undefined}
      >
        <PlanIcon size={14} className={colors.icon} />
        <span>{getPlanDisplayName(userPlan)}</span>
        {userPlan === 'free' && <ChevronRight size={14} />}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
            <PlanIcon size={20} className={colors.icon} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {getPlanDisplayName(userPlan)} Plan
            </h3>
            <p className="text-sm text-gray-500">
              {userPlan === 'free' 
                ? 'Upgrade to unlock premium features'
                : user?.billingCycle === 'yearly' 
                  ? 'Billed yearly'
                  : 'Billed monthly'
              }
            </p>
          </div>
        </div>
        
        {userPlan === 'free' && (
          <Button 
            onClick={handleUpgrade}
            size="sm"
            className="ml-4"
          >
            Upgrade
          </Button>
        )}
        
        {userPlan !== 'free' && (
          <Button 
            variant="outline"
            size="sm"
            onClick={() => router.push('/payment')}
            className="ml-4"
          >
            Manage Plan
          </Button>
        )}
      </div>
    </div>
  );
}

export function PlanBadge({ user }: { user: User | null }) {
  const userPlan = getUserPlan(user);
  const PlanIcon = planIcons[userPlan];
  const colors = planColors[userPlan];

  if (userPlan === 'free') return null;

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
      <PlanIcon size={12} className={colors.icon} />
      <span>{getPlanDisplayName(userPlan)}</span>
    </div>
  );
}
