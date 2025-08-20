"use client";
import { ActionItemType } from "@/stores/useContentStore";
import { Theme } from "@/lib/themeSystem";
import { useUserContentStore } from "@/stores/useContentStore";
import { Clock } from "lucide-react";
import Image from "next/image";

interface CommunityPostActionProps {
  action: ActionItemType;
  theme: Theme;
}

const CommunityPostAction = ({ action, theme }: CommunityPostActionProps) => {
  const { design } = useUserContentStore();

  const {
    title = "Community Post",
    content = "Share your thoughts with the community...",
    imageUrl,
    publishedDate
  } = action.config;

  // Format date or use default
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Just now";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
      });
    } catch {
      return "Just now";
    }
  };

  return (
    <div className="w-full space-y-4">
      {title && (
        <h2
          className="text-xl font-bold text-center drop-shadow-md transition-all duration-300"
          style={{
            color: design.textPrimaryColor || theme.colors.textPrimary,
            fontFamily: design.font || 'Inter, system-ui, sans-serif'
          }}
        >
          {title}
        </h2>
      )}

      <div
        className="rounded-2xl backdrop-blur-sm border transition-all duration-300 overflow-hidden"
        style={{
          background: theme.colors.cardBackground,
          border: `1px solid ${theme.colors.border}`,
          boxShadow: `0 8px 32px ${theme.colors.shadow}`
        }}
      >
        {/* Post Image */}
        {imageUrl && (
          <div className="relative w-full h-48 sm:h-64">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        )}

        {/* Post Content */}
        <div className="p-6 space-y-4">
          {content && (
            <p
              className="text-base leading-relaxed"
              style={{
                color: design.textSecondaryColor || theme.colors.textSecondary,
                fontFamily: design.font || 'Inter, system-ui, sans-serif'
              }}
            >
              {content}
            </p>
          )}

          {/* Post Metadata */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            <Clock
              size={16}
              className="transition-colors duration-300"
              style={{ color: design.textPrimaryColor || theme.colors.textPrimary }}
            />
            <span
              className="text-sm"
              style={{
                color: design.textSecondaryColor || theme.colors.textSecondary,
                fontFamily: design.font || 'Inter, system-ui, sans-serif'
              }}
            >
              {formatDate(publishedDate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostAction;