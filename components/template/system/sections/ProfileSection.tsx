import React from 'react';
import { ContentType, DesignType } from '@/types/editorTypes';
import { StyleVariant } from '../types';
import { getTheme } from '@/lib/themeSystem';
import defaultProfilePicture from '@/public/Devben Portfolio.webp';

interface ProfileSectionProps {
  content: ContentType;
  design: DesignType;
  toggles: Record<string, boolean>;
  style: 'minimal' | 'featured' | 'artistic';
  customStyles?: StyleVariant['profile'];
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  content,
  design,
  toggles,
  style,
  customStyles = {}
}) => {
  const { profileName, profileBio, profilePicture, profileVerified } = content;
  const hasBanner = design.banner && design.banner.type !== 'none';
  const theme = getTheme(design.theme || 'dark');

  const getProfileContainerClass = () => {
    const baseClass = `${hasBanner ? 'pt-4 mt-20' : 'pt-12'} pb-6 flex flex-col items-center px-6`;

    switch (style) {
      case 'minimal':
        return `${baseClass} space-y-4`;
      case 'featured':
        return `${baseClass} space-y-6`;
      case 'artistic':
        return `${baseClass} space-y-6`;
      default:
        return `${baseClass} space-y-4`;
    }
  };

  const getAvatarComponent = () => {
    if (!profilePicture || !toggles.profileImage) return null;

    const baseAvatarClass = "object-cover shadow-2xl transition-all duration-500 hover:scale-105";

    switch (style) {
      case 'minimal':
        return (
          <img
            src={profilePicture || defaultProfilePicture.src}
            alt={profileName || "Profile"}
            className={`w-32 h-32 rounded-full ${baseAvatarClass}`}
            style={{
              border: '3px solid white',
              ...customStyles.avatar
            }}
          />
        );

      case 'featured':
        return (
          <img
            src={profilePicture || defaultProfilePicture.src}
            alt={profileName || "Profile"}
            className={`w-36 h-36 rounded-full ${baseAvatarClass}`}
            style={{
              border: '4px solid rgba(255,255,255,0.8)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              ...customStyles.avatar
            }}
          />
        );

      case 'artistic':
        return (
          <div className="relative mb-6">
            {/* Artistic aura effects */}
            <div
              className="absolute inset-0 rounded-full blur-2xl scale-150 animate-pulse"
              style={{
                background: 'linear-gradient(45deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
                animationDuration: '2s'
              }}
            />
            <div
              className="absolute inset-0 rounded-full blur-xl scale-125 animate-pulse"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.05))',
                animationDuration: '3s',
                animationDelay: '0.5s'
              }}
            />

            <div className="relative">
              <div
                className="-mt-10 p-1 rounded-full"
                style={{
                  background: design.customBackground || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                <img
                  src={profilePicture || defaultProfilePicture.src}
                  alt={profileName || "Profile"}
                  className={`relative w-36 h-36 rounded-full ${baseAvatarClass}`}
                  style={{
                    border: `3px solid ${design.customBackground || '#667eea'}`,
                    filter: 'brightness(1.1) contrast(1.1)',
                    ...customStyles.avatar
                  }}
                />
              </div>


            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getVerifiedBadgeComponent = () => {
    const badgeStyle = content.verifiedBadgeStyle || 'music'; // Default to music style

    switch (badgeStyle) {
      case 'simple':
        return (
          <div className="inline-flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full shadow-lg">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        );

      case 'premium':
        return (
          <div className="relative inline-flex items-center justify-center">
            <div className="w-7 h-7 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        );

      case 'music':
      default:
        return (
          <div className="relative inline-flex items-center justify-center">
            {/* Animated glow effect */}
            <div className="absolute inset-0 w-8 h-8 rounded-full animate-pulse"
              style={{
                background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
                filter: 'blur(4px)',
                animationDuration: '2s'
              }}
            />

            {/* Main badge */}
            <div className="relative w-7 h-7 rounded-full flex items-center justify-center shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                border: '2px solid rgba(255,255,255,0.3)'
              }}
            >
              {/* Music note icon instead of checkmark */}
              <svg className="w-4 h-4 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 0 0-1.196-.98l-10 2A1 1 0 0 0 6 5v6.114A4.369 4.369 0 0 0 5 11a4 4 0 1 0 4 4V7.114l8-1.6v4.9A4.369 4.369 0 0 0 16 10a4 4 0 1 0 4 4V3zM5 17a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm11 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
              </svg>
            </div>
          </div>
        );
    }
  };

  const getTextStyles = () => {
    return {
      primaryText: {
        color: design.textPrimaryColor || theme.colors.textPrimary,
        textAlign: design.textAlignment || 'center' as const,
        fontFamily: design.font || 'Inter, system-ui, sans-serif',
        ...customStyles.name
      },
      secondaryText: {
        color: design.textSecondaryColor || theme.colors.textSecondary,
        textAlign: design.textAlignment || 'center' as const,
        fontFamily: design.font || 'Inter, system-ui, sans-serif',
        ...customStyles.bio
      }
    };
  };

  const textStyles = getTextStyles();

  return (
    <div className={getProfileContainerClass()}>
      {getAvatarComponent()}

      <div
        className="text-center max-w-sm"
        style={{ textAlign: design.textAlignment || 'center' }}
      >
        {toggles.profileName && profileName && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1
              className={`${style === 'artistic' ? 'text-3xl' : 'text-2xl'} font-bold tracking-wide drop-shadow-lg`}
              style={textStyles.primaryText}
            >
              {profileName}
            </h1>
            {profileVerified && toggles.verifiedBadge && getVerifiedBadgeComponent()}
          </div>
        )}

        {toggles.bio && profileBio && (
          <p
            className="text-lg leading-relaxed opacity-90 drop-shadow-md"
            style={textStyles.secondaryText}
          >
            {profileBio}
          </p>
        )}
      </div>
    </div>
  );
};