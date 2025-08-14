"use client";

import { useState, useEffect } from "react";
import { useUserContentStore } from "@/stores/useContentStore";
import { toast } from "sonner";
import { 
  Save, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Loader2,
  Eye,
  ExternalLink,
  Crown 
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { canUserAccessFeature } from "@/lib/planUtils";

const EditorHeader = () => {
  const { 
    isDirty, 
    isSaving, 
    saveError, 
    lastSaved, 
    saveAllChanges,
    content,
    design 
  } = useUserContentStore();
  const user = useUser();
  
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  // Determine if current edits require upgrade
  const requiresUpgrade = () => {
    const hasAdvanced = canUserAccessFeature(user, 'advancedCustomization');
    const hasVerified = canUserAccessFeature(user, 'verifiedBadge');

    const usingAdvancedDesign = Boolean(
      // custom solid color (non-gradient) or image background
      (design.customBackground && !design.customBackground.includes('gradient')) ||
      // banner image
      (design as any).banner?.type === 'image' ||
      // curves
      (design as any).bannerType === 'curve' || (design as any).curveShape
    );

    const usingVerified = content.profileVerified === true;

    if (!hasAdvanced && usingAdvancedDesign) return true;
    if (!hasVerified && usingVerified) return true;
    return false;
  };

  // Show unsaved changes indicator
  useEffect(() => {
    if (isDirty) {
      setShowUnsavedWarning(true);
      const timer = setTimeout(() => setShowUnsavedWarning(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isDirty]);

  const handleSave = async () => {
    try {
      if (requiresUpgrade()) {
        setShowUpgrade(true);
        return;
      }
      await saveAllChanges();
      toast.success("✨ Changes saved successfully!");
    } catch (error) {
      toast.error("Failed to save changes. Please try again.");
    }
  };

  const handlePublish = async () => {
    try {
      if (requiresUpgrade()) {
        setShowUpgrade(true);
        return;
      }
      await saveAllChanges();
      toast.success("🚀 Profile published successfully!");
      // Here you could also trigger any publish-specific logic
    } catch (error) {
      toast.error("Failed to publish. Please try again.");
    }
  };

  const formatLastSaved = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return "Just saved";
    if (diffInMinutes === 1) return "1 minute ago";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return "1 hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Project info */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-lg font-bold text-slate-800">
              {content.profileName}'s Profile
            </h1>
            <div className="flex items-center gap-3 mt-1">
              {/* Save status */}
              <div className="flex items-center gap-2 text-sm">
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                    <span className="text-blue-600">Saving...</span>
                  </>
                ) : isDirty ? (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    <span className="text-amber-600">Unsaved changes</span>
                  </>
                ) : lastSaved ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-slate-600">
                      {formatLastSaved(lastSaved)}
                    </span>
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500">Not saved yet</span>
                  </>
                )}
              </div>

              {/* Error indicator */}
              {saveError && (
                <div className="flex items-center gap-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{saveError}</span>
                </div>
              )}
            </div>
          </div>

          {/* Unsaved changes pulse indicator */}
          {showUnsavedWarning && isDirty && (
            <div className="animate-pulse bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium border border-amber-200">
              Changes made
            </div>
          )}
        </div>

        {/* Right side - Action buttons */}
        <div className="flex items-center gap-3">
          {/* Preview button */}
          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-200">
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          {/* View Live button */}
          <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200">
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">View Live</span>
          </button>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={!isDirty || isSaving}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isDirty && !isSaving
                ? "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
                : "bg-slate-50 text-slate-400 cursor-not-allowed"
            }`}
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">
              {isSaving ? "Saving..." : "Save"}
            </span>
          </button>

          {/* Publish button */}
          <button
            onClick={handlePublish}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            <span>
              {isSaving ? "Publishing..." : "Publish"}
            </span>
          </button>
        </div>
      </div>
    </div>

      {/* Upgrade Modal */}
      <Dialog open={showUpgrade} onOpenChange={setShowUpgrade}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" /> Upgrade required
            </DialogTitle>
            <DialogDescription>
              You’re using Pro design features. Upgrade your plan to save or publish these changes.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end mt-4">
            <Button variant="outline" onClick={() => setShowUpgrade(false)}>Cancel</Button>
            <Button onClick={() => { setShowUpgrade(false); window.location.href = '/payment'; }} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Upgrade now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditorHeader;
