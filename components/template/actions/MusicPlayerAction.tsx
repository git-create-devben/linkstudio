"use client"
import { ActionItemType } from "@/stores/useContentStore";
import { Theme, getButtonStyle } from "@/lib/themeSystem";
import { useUserContentStore } from "@/stores/useContentStore";
import { useState } from "react";

interface MusicPlayerActionProps {
  action: ActionItemType;
  theme: Theme;
}

const MusicPlayerAction = ({ action, theme }: MusicPlayerActionProps) => {
  const { design } = useUserContentStore();
  const [isPlaying, setIsPlaying] = useState(false);

  const spotifyUrl = action.config.spotifyUrl;
  const soundcloudUrl = action.config.soundcloudUrl;

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
        {/* Spotify Player */}
        {spotifyUrl && (
          <div className="mb-4">
            <iframe
              src={spotifyUrl}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg"
            />
          </div>
        )}

        {/* SoundCloud Player */}
        {soundcloudUrl && (
          <div className="mb-4">
            <iframe
              width="100%"
              height="166"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(soundcloudUrl)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
              className="rounded-lg"
            />
          </div>
        )}

        {/* Custom Music Player UI (if no embed URLs) */}
        {!spotifyUrl && !soundcloudUrl && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: design.textPrimaryColor || theme.colors.textPrimary }}
            >
              Music Player
            </h3>
            <p
              className="text-sm opacity-80"
              style={{ color: design.textSecondaryColor || theme.colors.textSecondary }}
            >
              Add your Spotify or SoundCloud links to display your music here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayerAction;