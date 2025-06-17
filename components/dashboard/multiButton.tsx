import React from "react";
import { motion } from "framer-motion";

interface MultiButtonProps {
  username: string;
  onPublish?: () => void;
  isPublishing?: boolean;
  isDisabled?: boolean;
}

const MultiButton: React.FC<MultiButtonProps> = ({
  username,
  onPublish,
  isPublishing = false,
  isDisabled = false,
}) => {
  const handlePreview = () => {
    window.open(`/${username}`, "_blank");
  };

  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePreview}
        disabled={isDisabled}
        className={`
          px-4 py-2 rounded-full
          bg-gray-200/80 hover:bg-gray-200
          dark:bg-gray-800/80 dark:hover:bg-gray-800
          backdrop-blur-sm
          text-sm font-medium
          text-black
          transition-all duration-200
          cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        Preview
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onPublish}
        disabled={isDisabled || isPublishing}
        className={`
          px-4 py-2 rounded-full
          bg-blue-600 hover:bg-blue-700
          text-white
          text-sm font-medium
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center gap-2
          cursor-pointer
        `}
      >
        {isPublishing ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Publishing...
          </>
        ) : (
          "Publish"
        )}
      </motion.button>
    </div>
  );
};

export default MultiButton;
