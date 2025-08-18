"use client"
import { Monitor, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const MobileNotice = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the notice
    const dismissed = localStorage.getItem('mobile-notice-dismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show notice on mobile/tablet screens
    const checkScreenSize = () => {
      setIsVisible(window.innerWidth < 1024); // Show on screens smaller than lg (1024px)
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('mobile-notice-dismissed', 'true');
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-4 mb-4 mx-4 rounded-lg shadow-sm">
      <div className="flex items-start gap-3">
        <div className="bg-amber-100 p-2 rounded-lg flex-shrink-0">
          <Monitor className="w-5 h-5 text-amber-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-amber-800 mb-1">
            Best Experience on Desktop
          </h3>
          <p className="text-sm text-amber-700 mb-3">
            For the best editing experience with full design customization options, 
            we recommend using MyLinks on a desktop or laptop computer.
          </p>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleDismiss}
              className="border-amber-300 text-amber-700 hover:bg-amber-100 text-xs"
            >
              Got it
            </Button>
            <span className="text-xs text-amber-600">
              Mobile editing has limited features
            </span>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-amber-500 hover:text-amber-700 p-1 rounded-full hover:bg-amber-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MobileNotice;