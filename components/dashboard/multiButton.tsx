import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserContentStore } from "@/stores/useContentStore";
import { Save, Eye, Upload, ChevronDown } from "lucide-react";
import { toast } from "sonner";

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
  const { isDirty, isSaving, saveAllChanges } = useUserContentStore();
  const [isOpen, setIsOpen] = useState(false);

  const handlePreview = () => {
    window.open(`/${username}`, "_blank");
    setIsOpen(false);
  };

  const handleSave = async () => {
    try {
      await saveAllChanges();
      toast.success("✨ Changes saved successfully!");
    } catch (error) {
      toast.error("Failed to save changes. Please try again.");
    }
  };

  const handlePublish = async () => {
    if (isDirty) {
      await handleSave();
    }
    if (onPublish) {
      onPublish();
      toast.success("🚀 Profile published successfully!");
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
      label: "Preview",
      icon: <Eye className="w-4 h-4" />,
      onClick: handlePreview,
      disabled: false,
    },
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
    <div className={`relative inline-block text-left ${className}`}>
      <div className="flex rounded-md shadow-sm">
        <button
          onClick={handleSave}
          disabled={isDisabled || isPublishing || isSaving}
          className={`inline-flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-l-md ${
            isDisabled || isPublishing || isSaving
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-br from-blue-200 via-white to-purple-200 group-hover:bg-blue-600 transition-colors duration-300 text-black hover:bg-indigo-700"
          }`}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center px-2 py-2 -ml-px text-sm font-medium transition-colors rounded-r-md ${
            isDisabled || isPublishing || isSaving
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
                  className={`${
                    item.disabled
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
  );
};

export default MultiButton;