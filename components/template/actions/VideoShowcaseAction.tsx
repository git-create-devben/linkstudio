"use client";
import { ActionItemType } from "@/stores/useContentStore";
import { Theme } from "@/lib/themeSystem";
import { useUserContentStore } from "@/stores/useContentStore";
import { useState } from "react";

interface VideoShowcaseActionProps {
  action: ActionItemType;
  theme: Theme;
}

const VideoShowcaseAction = ({ action, theme }: VideoShowcaseActionProps) => {
  const { design } = useUserContentStore();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const youtubeUrl = action.config.youtubeUrl;
  const vimeoUrl = action.config.vimeoUrl;

  // Extract video ID from YouTube URL
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  // Extract video ID from Vimeo URL
  const getVimeoEmbedUrl = (url: string) => {
    const regExp = /vimeo\.com\/(\d+)/;
    const match = url.match(regExp);
    return match ? `https://player.vimeo.com/video/${match[1]}` : null;
  };

  return (
    <div className="w-full space-y-4">
      {action.config.title && (
        <h2 
          className="text-xl font-bold text-center drop-shadow-md transition-all duration-300"
          style={{ 
            color: design.textPrimaryColor || theme.colors.textPrimary,
            fontFamily: design.font || 'Inter, system-ui, sans-serif'
          }}
        >
          {action.config.title}
        </h2>
      )}
      
      <div 
        className="p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300"
        style={{
          background: theme.colors.cardBackground,
          border: `1px solid ${theme.colors.border}`,
          boxShadow: `0 8px 32px ${theme.colors.shadow}`
        }}
      >
        {/* YouTube Video */}
        {youtubeUrl && (
          <div className="mb-4">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
              <iframe
                src={getYouTubeEmbedUrl(youtubeUrl) || ''}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        )}

        {/* Vimeo Video */}
        {vimeoUrl && (
          <div className="mb-4">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
              <iframe
                src={getVimeoEmbedUrl(vimeoUrl) || ''}
                title="Vimeo video"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        )}

        {/* Placeholder when no videos */}
        {!youtubeUrl && !vimeoUrl && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ color: design.textPrimaryColor || theme.colors.textPrimary }}
            >
              Video Showcase
            </h3>
            <p 
              className="text-sm opacity-80"
              style={{ color: design.textSecondaryColor || theme.colors.textSecondary }}
            >
              Add your YouTube or Vimeo video links to showcase your content
            </p>
          </div>
        )}

        {/* Video Description */}
        {action.config.description && (youtubeUrl || vimeoUrl) && (
          <div className="mt-4 p-3 rounded-lg bg-black/5">
            <p 
              className="text-sm leading-relaxed"
              style={{ 
                color: design.textSecondaryColor || theme.colors.textSecondary,
                fontFamily: design.font || 'Inter, system-ui, sans-serif'
              }}
            >
              {action.config.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoShowcaseAction;