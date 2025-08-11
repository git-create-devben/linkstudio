// context/UserContext.tsx
'use client';

import { createContext, useContext } from 'react';

export interface User {
  id: string;
  email: string;
  username: string | null;
  plan: string | null;
  isActive: boolean;
  billingCycle: string | null;
  subscriptionId: string | null;
  createdAt: Date;
  profile: {
    id: string;
    profileImageUrl: string | null;
    displayName: string | null;
    bio: string | null;
    templateId: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    pageViews: number;
  } | null;
}

const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);

export default UserContext;
