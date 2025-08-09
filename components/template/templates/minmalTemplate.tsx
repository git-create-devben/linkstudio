import React from "react";
import { TemplateProps } from "@/types/editorTypes";
import LinkListAction from "../actions/LinkListAction";
import { getPlatformIcon } from "@/lib/getPlatformIcons";
import defaultProfilePicture from "@/public/Devben Portfolio.webp"

// Your main template component
const MinimalTemplate: React.FC<TemplateProps> = ({
  content,
  design,
  actions,
  toggles,
  socialLinks,
}) => {
  // Destructure for cleaner access
  const { profileName, profileBio, profilePicture, coverImage } = content;
  const { background, color } = design;

  // Create beautiful gradient background that respects user's design choice
  // If background is already a gradient, use it; otherwise create a beautiful gradient
  const isGradient = background?.includes('gradient');
  const gradientBackground = isGradient 
    ? background 
    : `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`;
  
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center relative overflow-hidden"
      style={{ 
        background: gradientBackground,
        color: '#FFFFFF'
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-80 -left-40 w-60 h-60 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl" />
      </div>

      <div className="w-full max-w-md mx-auto pb-8 flex flex-col items-center relative z-10">
        {/* Header Section with improved spacing */}
        <div className="pt-8 pb-6 flex flex-col items-center">
          {/* Avatar with enhanced styling */}
          {profilePicture && (
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-lg scale-110" />
              <img
                src={profilePicture || defaultProfilePicture.src}
                alt={profileName || "Profile"}
                className="relative w-24 h-24 rounded-full border-3 border-white/30 shadow-2xl object-cover backdrop-blur-sm"
              />
              {/* Optional verified badge */}
              {content.profileVerified && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          )}
          
          {/* Name & Bio with improved typography */}
          <div className="text-center mb-6">
            {toggles.profileName && (
              <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-lg">
                {profileName}
              </h1>
            )}
            {toggles.bio && (
              <p className="text-lg text-white/90 leading-relaxed max-w-xs mx-auto">
                {profileBio}
              </p>
            )}
          </div>

          {/* Enhanced Social Links */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex gap-4 mb-8">
              {socialLinks.map((link) => (
                <a 
                  key={link.id} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110 hover:rotate-6 shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative text-white group-hover:text-white/90 transition-colors duration-300">
                    {getPlatformIcon(link.name, 24)}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
     
        {/* --- DYNAMIC ACTIONS SECTION --- */}
        <div className="w-full space-y-4 px-6">
          {actions.map((action) => {
            // Use a switch to render the correct component for each action type
            switch (action.type) {
              case "LINK_LIST":
                return <LinkListAction key={action.id} action={action} />;
              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default MinimalTemplate;