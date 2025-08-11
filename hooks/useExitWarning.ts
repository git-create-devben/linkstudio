"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UseExitWarningProps {
  isDirty: boolean;
  message?: string;
}

const useExitWarning = ({ 
  isDirty, 
  message = "You have unsaved changes. Are you sure you want to leave?" 
}: UseExitWarningProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    const handleRouteChange = (url: string) => {
      if (isDirty && !window.confirm(message)) {
        // Prevent route change
        router.push(window.location.pathname);
        throw 'Route change aborted.';
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // For Next.js router changes, we need a different approach
    // This is a simplified version - in a real app you might use Next.js router events
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty, message, router]);

  return null;
};

export default useExitWarning;
