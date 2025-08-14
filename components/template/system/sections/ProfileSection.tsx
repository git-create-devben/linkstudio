import React from 'react';
import { ContentType, DesignType } from '@/types/editorTypes';
import { StyleVariant } from '../types';
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
          <div className="relative">
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
            {profileVerified && toggles.verifiedBadge && (
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm">✓</span>
              </div>
            )}
          </div>
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

              {profileVerified && toggles.verifiedBadge && (
                <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center shadow-xl animate-bounce"
                  style={{
                    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                    animationDuration: '2s'
                  }}>
                  <span className="text-white text-xl">♪</span>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getTextStyles = () => {
    return {
      primaryText: {
        color: design.textPrimaryColor || '#ffffff',
        textAlign: design.textAlignment || 'center' as const,
        fontFamily: design.font || 'Inter, system-ui, sans-serif',
        ...customStyles.name
      },
      secondaryText: {
        color: design.textSecondaryColor || 'rgba(255,255,255,0.9)',
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
          <h1
            className={`${style === 'artistic' ? 'text-3xl' : 'text-2xl'} font-bold mb-4 tracking-wide drop-shadow-lg`}
            style={textStyles.primaryText}
          >
            {profileName}
          </h1>
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