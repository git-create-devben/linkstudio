// context/UserContext.tsx
'use client';

import { createContext, useContext } from 'react';

interface User {
  id: string;
  email: string;
  fullName: string;
  // Add other user properties as needed
}

const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);

export default UserContext;
