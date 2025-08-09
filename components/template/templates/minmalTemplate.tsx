import React from "react";
import { TemplateProps } from "@/types/editorTypes";
import LinkListAction from "../actions/LinkListAction";
import { getPlatformIcon } from "@/lib/getPlatformIcons";
import { getTheme } from "@/lib/themeSystem";
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
  const { profileName, profileBio, profilePicture } = content;
  const { theme = 'dark', banner, customBackground } = design;
  
  // Get theme configuration
  const themeConfig = getTheme(theme);
  
  // Determine background - custom takes precedence over theme
  const finalBackground = customBackground || themeConfig.colors.background;
  
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center relative overflow-hidden transition-all duration-500"
      style={{ 
        background: finalBackground,
        color: themeConfig.colors.textPrimary
      }}
    >
      {/* Animated background elements - adjusted based on theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl transition-all duration-1000" 
          style={{ 
            backgroundColor: theme === 'light' ? 'rgba(99, 179, 237, 0.1)' : 'rgba(255, 255, 255, 0.1)'
          }} 
        />
        <div 
          className="absolute top-80 -left-40 w-60 h-60 rounded-full blur-2xl transition-all duration-1000 delay-200" 
          style={{ 
            backgroundColor: theme === 'light' ? 'rgba(236, 72, 153, 0.08)' : 'rgba(255, 255, 255, 0.05)'
          }} 
        />
        <div 
          className="absolute bottom-20 right-20 w-40 h-40 rounded-full blur-xl transition-all duration-1000 delay-400" 
          style={{ 
            backgroundColor: theme === 'light' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255, 255, 255, 0.1)'
          }} 
        />
      </div>

      {/* Banner Section */}
      {banner && banner.type !== 'none' && (
        <div 
          className="w-full relative overflow-hidden"
          style={{ height: banner.height || 200 }}
        >
          {banner.type === 'image' && banner.value && (
            <>
              <img 
                src={banner.value} 
                alt="Banner" 
                className={`w-full h-full object-cover ${banner.blur ? 'blur-sm' : ''}`}
                style={{ opacity: banner.opacity || 1 }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
            </>
          )}
          {banner.type === 'gradient' && banner.value && (
            <div 
              className="w-full h-full"
              style={{ 
                background: banner.value,
                opacity: banner.opacity || 1
              }}
            />
          )}
        </div>
      )}

      <div className="w-full max-w-md mx-auto pb-8 flex flex-col items-center relative z-10">
        {/* Header Section with improved spacing */}
        <div className={`${banner && banner.type !== 'none' ? 'pt-6 -mt-12' : 'pt-8'} pb-6 flex flex-col items-center`}>
          {/* Avatar with enhanced styling */}
          {profilePicture && (
            <div className="relative mb-4">
              <div 
                className="absolute inset-0 rounded-full blur-lg scale-110 transition-all duration-300" 
                style={{ 
                  backgroundColor: theme === 'light' 
                    ? 'rgba(99, 179, 237, 0.2)' 
                    : 'rgba(255, 255, 255, 0.2)'
                }}
              />
              <div className="relative">
                <img
                  src={profilePicture || defaultProfilePicture.src}
                  alt={profileName || "Profile"}
                  className="relative w-28 h-28 rounded-full shadow-2xl object-cover transition-all duration-300"
                  style={{
                    border: `3px solid ${themeConfig.colors.border}`,
                    filter: theme === 'glassmorphic' ? 'brightness(1.1)' : 'none'
                  }}
                />
                {/* Optional verified badge */}
                {content.profileVerified && (
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-3 border-white shadow-lg transition-all duration-300 hover:scale-110">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Name & Bio with improved typography */}
          <div className="text-center mb-6">
            {toggles.profileName && (
              <h1 
                className="text-3xl font-bold mb-3 drop-shadow-lg transition-all duration-300"
                style={{ color: themeConfig.colors.textPrimary }}
              >
                {profileName}
              </h1>
            )}
            {toggles.bio && (
              <p 
                className="text-lg leading-relaxed max-w-xs mx-auto transition-all duration-300"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                {profileBio}
              </p>
            )}
          </div>

          {/* Enhanced Social Links */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex gap-3 mb-8 flex-wrap justify-center">
              {socialLinks.map((link, index) => (
                <a 
                  key={link.id} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`group relative p-3 rounded-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl ${themeConfig.cardStyle}`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    background: themeConfig.colors.cardBackground,
                    border: `1px solid ${themeConfig.colors.border}`
                  }}
                >
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                    }}
                  />
                  <div 
                    className="relative transition-colors duration-300"
                    style={{ color: themeConfig.colors.textPrimary }}
                  >
                    {getPlatformIcon(link.name, 24)}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
     
        {/* --- DYNAMIC ACTIONS SECTION --- */}
        <div className="w-full space-y-4 px-6">
          {actions.map((action, index) => {
            // Use a switch to render the correct component for each action type
            switch (action.type) {
              case "LINK_LIST":
                return (
                  <div 
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 150}ms` }}
                    className="animate-fade-in-up"
                  >
                    <LinkListAction action={action} theme={themeConfig} />
                  </div>
                );
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