import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserContentStore } from "@/stores/useContentStore";
import { Save, Upload, ChevronDown, Crown, Sparkles, Copy, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { canUserAccessFeature, getUserPlan } from "@/lib/planUtils";
import { curveShapes } from "@/lib/themeSystem";

interface MultiButtonProps {
  username: string;
  onPublish?: () => void;
  isPublishing?: boolean;
  isDisabled?: boolean;
  className?: string;
  loading?: boolean; // <-- Add loading prop
}

const MultiButton: React.FC<MultiButtonProps> = ({
  username,
  onPublish,
  isPublishing = false,
  isDisabled = false,
  className = "",
  loading = false,
}) => {
  const { isDirty, isSaving, saveAllChanges, content, design, actionItems } = useUserContentStore();
  const user = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paidFeatures, setPaidFeatures] = useState<string[]>([]);
  const [linkCopied, setLinkCopied] = useState(false);

  // Determine if current edits require upgrade and what features
  const checkPaidFeatures = () => {
    const features: string[] = [];
    const userPlan = getUserPlan(user);

    // Get user's current plan capabilities
    const hasAdvanced = canUserAccessFeature(user, 'advancedCustomization');
    const hasVerified = canUserAccessFeature(user, 'verifiedBadge');
    const hasAnalytics = canUserAccessFeature(user, 'analytics');
    const hasRemoveBranding = canUserAccessFeature(user, 'removeBranding');

    // Check action limits first (most common issue)
    const actionCount = actionItems?.length || 0;
    const maxActions = userPlan === 'free' ? 2 : userPlan === 'starter' ? 8 : -1;
    if (maxActions !== -1 && actionCount > maxActions) {
      features.push(`${actionCount} actions (limit: ${maxActions})`);
    }

    // Check verified badge
    if (content.profileVerified === true && !hasVerified) {
      features.push('Verified Badge');
    }

    // Check analytics
    if ((content as any).analyticsEnabled === true && !hasAnalytics) {
      features.push('Analytics');
    }

    // Check remove branding  
    if ((design as any).removeBranding === true && !hasRemoveBranding) {
      features.push('Remove Branding');
    }

    // Check advanced customization features (be more specific)
    if (!hasAdvanced) {
      const advancedFeatures = [];

      // Custom solid backgrounds (non-gradient)
      if (design.customBackground &&
        design.customBackground !== '' &&
        !design.customBackground.includes('gradient') &&
        !design.customBackground.includes('linear') &&
        !design.customBackground.includes('radial')) {
        advancedFeatures.push('Custom solid background');
      }

      // Banner images
      if ((design as any).banner?.type === 'image') {
        advancedFeatures.push('Banner image');
      }

      // Curve shapes - only premium curves require upgrade
      if ((design as any).bannerType === 'curve' && (design as any).curveShape) {
        const currentShape = curveShapes.find(s => s.id === (design as any).curveShape);
        if (currentShape?.tier === 'premium') {
          advancedFeatures.push(`Premium curve: ${currentShape.name}`);
        }
      }

      if (advancedFeatures.length > 0) {
        features.push(`Advanced Design: ${advancedFeatures.join(', ')}`);
      }
    }

    return features;
  };

  const requiresUpgrade = () => {
    return checkPaidFeatures().length > 0;
  };

  const handleSave = async () => {
    try {
      await saveAllChanges();
      toast.success("✨ Changes saved successfully!");
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to save changes. Please try again.");
    }
  };

  const handlePublish = async () => {
    try {
      const features = checkPaidFeatures();
      if (features.length > 0) {
        setPaidFeatures(features);
        setShowUpgrade(true);
        setIsOpen(false);
        return;
      }

      await saveAllChanges();
      setShowSuccess(true);
      setIsOpen(false);
      if (onPublish) {
        onPublish();
      }
      toast.success("🚀 Profile published successfully!");
    } catch (error) {
      toast.error("Failed to publish. Please try again.");
    }
  };

  const getUserProfileUrl = () => {
    if (!username) return '';
    return `${window.location.origin}/${username}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getUserProfileUrl());
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  if (loading) {
    return (
      <div className={`flex gap-2 ${className}`}>
        <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
        <div className="w-10 h-8 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  const menuItems = [
    {
      label: isSaving ? "Saving..." : "Save Changes",
      icon: isSaving ? <div className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />,
      onClick: handleSave,
      disabled: !isDirty || isSaving || isDisabled,
    },
    {
      label: isPublishing ? "Publishing..." : "Publish Changes",
      icon: isPublishing ? <div className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />,
      onClick: handlePublish,
      disabled: isDisabled || isPublishing || isSaving,
    },
  ];

  return (
    <>
      <div className={`relative inline-block text-left ${className}`}>
        <div className="flex rounded-md shadow-sm">
          <button
            onClick={handleSave}
            disabled={!isDirty || isDisabled || isPublishing || isSaving}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-l-md ${!isDirty || isDisabled || isPublishing || isSaving
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-br from-blue-200 via-white to-purple-200 group-hover:bg-blue-600 transition-colors duration-300 text-black hover:bg-indigo-700"
              }`}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`inline-flex items-center px-2 py-2 -ml-px text-sm font-medium transition-colors rounded-r-md ${isDisabled || isPublishing || isSaving
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-br from-blue-200 via-white to-purple-200 group-hover:bg-blue-600 transition-colors duration-300 text-black hover:bg-indigo-700"
              }`}
            aria-expanded="true"
            aria-haspopup="true"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              tabIndex={-1}
            >
              <div className="py-1" role="none">
                {menuItems.map((item, index) => (
                  <button
                    key={item.label}
                    onClick={(e) => {
                      e.stopPropagation();
                      item.onClick();
                    }}
                    disabled={item.disabled}
                    className={`${item.disabled
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                      } group flex w-full items-center px-4 py-2 text-sm`}
                    role="menuitem"
                    tabIndex={-1}
                  >
                    <span className="flex items-center w-5 mr-3">
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Upgrade Modal */}
      <Dialog open={showUpgrade} onOpenChange={setShowUpgrade}>
        <DialogContent className="max-w-md bg-white rounded-lg shadow-lg p-6 text-black">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" /> Upgrade Required
            </DialogTitle>
            <DialogDescription>
              You're using paid features that require an upgrade to publish your profile.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Features you're using:</p>
            <ul className="space-y-2">
              {paidFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 justify-end mt-6 text-white">
            <Button variant="outline" onClick={() => setShowUpgrade(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowUpgrade(false);
                window.location.href = '/payment';
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              Upgrade Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal with Confetti Effect */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-md bg-white rounded-lg shadow-lg p-6 text-black">
          <div className="text-center space-y-4">
            {/* Confetti Animation */}
            <div className="relative">
              <div className="text-6xl animate-bounce">🎉</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping ml-4" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-ping ml-4" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>

            <DialogHeader>
              <DialogTitle className="text-2xl">Profile Published!</DialogTitle>
              <DialogDescription className="text-base">
                Your profile is now live and ready to share with the world.
              </DialogDescription>
            </DialogHeader>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <p className="text-sm font-medium text-gray-700">Your live link:</p>
              <div className="flex items-center gap-2 bg-white border rounded-lg p-3">
                <code className="flex-1 text-sm text-blue-600 truncate">
                  {getUserProfileUrl()}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyToClipboard}
                  className="shrink-0 text-white"
                >
                  {linkCopied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex gap-3 justify-center pt-2 text-white">
              <Button
                variant="outline"
                onClick={() => window.open(getUserProfileUrl(), '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Live
              </Button>
              <Button onClick={() => setShowSuccess(false)} className="text-black">
                Continue Editing
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MultiButton;