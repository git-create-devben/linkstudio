// hooks/useGoalSelection.ts
import { JSX, useState } from 'react';
import { Users, Zap, Share2 } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

const useGoalSelection = (initialGoal: string | null = null) => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(initialGoal);

  const goals: Goal[] = [
    {
      id: 'creator',
      title: 'Creator',
      description: 'Build my following and explore ways to monetize my audience.',
      icon: <Zap className="w-8 h-8 text-purple-600" />,
      color: 'from-purple-100 to-pink-100',
    },
    {
      id: 'business',
      title: 'Business',
      description: 'Grow my business and reach more customers.',
      icon: <Users className="w-8 h-8 text-blue-600" />,
      color: 'from-blue-100 to-indigo-100',
    },
    {
      id: 'personal',
      title: 'Personal',
      description: 'Share links with my friends and connections.',
      icon: <Share2 className="w-8 h-8 text-green-600" />,
      color: 'from-green-100 to-emerald-100',
    },
  ];

  const selectGoal = (goalId: string) => {
    setSelectedGoal(goalId);
  };

  return { goals, selectedGoal, selectGoal };
};

export default useGoalSelection;
