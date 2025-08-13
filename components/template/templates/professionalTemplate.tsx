import React from "react";
import { TemplateProps } from "@/types/editorTypes";
import LinkListAction from "../actions/LinkListAction";
import ContactFormAction from "../actions/ContactFormAction";
import TextBlockAction from "../actions/TextBlockAction";
import ImageGalleryAction from "../actions/ImageGalleryAction";
import MusicPlayerAction from "../actions/MusicPlayerAction";
import LocationMapAction from "../actions/LocationMapAction";
import VideoShowcaseAction from "../actions/VideoShowcaseAction";
import ProductShowcaseAction from "../actions/ProductShowcaseAction";
import CalendarBookingAction from "../actions/CalendarBookingAction";
import PhoneCallAction from "../actions/PhoneCallAction";
import { getPlatformIcon } from "@/lib/getPlatformIcons";
import { getTheme, curveShapes, curveColors } from "@/lib/themeSystem";
import defaultProfilePicture from "@/public/Devben Portfolio.webp"

// Helper function to get curve style from shape and color
const getCurveStyle = (shapeId?: string, curveColor?: string, animated?: boolean) => {
  if (!shapeId) return {};

  const shape = curveShapes.find(s => s.id === shapeId);
  if (!shape) return {};

  const finalColor = curveColor || curveColors[0].value; // Default to first color

  return {
    clipPath: shape.clipPath,
    borderRadius: shape.borderRadius,
    background: shape.background
      ? `${finalColor}, ${shape.background}`
      : finalColor,
    ...(animated !== false && {
      animation: shape.animationClass?.replace('animate-', '') + ' 6s ease-in-out infinite'
    })
  };
};

// Professional template with clean, corporate styling
const ProfessionalTemplate: React.FC<TemplateProps> = ({
  content,
  design,
  actions,
  toggles,
  socialLinks,
}) => {
  // Destructure for cleaner access
  const { profileName, profileBio, profilePicture } = content;
  const { theme = 'light', banner, customBackground } = design;

  // Get theme configuration
  const themeConfig = getTheme(theme);

  // Determine background - custom takes precedence over theme
  const finalBackground = customBackground || (theme === 'light' ? '#f8fafc' : themeConfig.colors.background);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center relative overflow-hidden transition-all duration-500"
      style={{
        background: finalBackground,
        color: themeConfig.colors.textPrimary,
        fontFamily: design.font || 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Professional background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: theme === 'light'
            ? `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, rgba(255, 177, 153, 0.1) 0%, transparent 50%),
               radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.05) 0%, transparent 50%)`
            : `radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)`
        }} />

        {/* Subtle grid pattern for professional look */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      {/* Header with professional styling */}
      <div className="w-full max-w-lg mx-auto relative z-10">
        {/* Banner/Header Section */}
        {((banner && banner.type !== 'none') || (design.bannerType === 'curve' && design.curveShape)) && (
          <div
            className="w-full relative overflow-hidden mb-8"
            style={{ height: design.bannerHeight || banner?.height || 120 }}
          >
            {/* Legacy banner image support */}
            {banner?.type === 'image' && banner.value && (
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

            {/* Legacy banner curve support */}
            {banner?.type === 'curve' && banner.value && !design.curveShape && (
              <div
                className="w-full h-full transition-all duration-500"
                style={{
                  background: banner.value,
                  opacity: banner.opacity || 1
                }}
              />
            )}

            {/* New Curve System */}
            {design.bannerType === 'curve' && design.curveShape && (
              <div
                className={`w-full h-full transition-all duration-500 ${design.curveAnimated !== false
                  ? curveShapes.find(s => s.id === design.curveShape)?.animationClass || ''
                  : ''
                  }`}
                style={{
                  opacity: design.bannerOpacity || 1,
                  ...getCurveStyle(design.curveShape, design.curveColor, design.curveAnimated)
                }}
              />
            )}
          </div>
        )}

        {/* Professional Profile Section */}
        <div className={`${banner && banner.type !== 'none' ? 'pt-6 -mt-16' : 'pt-12'} pb-8 flex flex-col items-center px-6`}>
          {/* Professional Avatar with subtle shadow */}
          {profilePicture && (
            <div className="relative mb-6">
              <div
                className="absolute inset-0 rounded-full blur-xl scale-110 transition-all duration-500"
                style={{
                  backgroundColor: theme === 'light'
                    ? 'rgba(99, 179, 237, 0.15)'
                    : 'rgba(255, 255, 255, 0.1)'
                }}
              />
              <div className="relative">
                <img
                  src={profilePicture || defaultProfilePicture.src}
                  alt={profileName || "Profile"}
                  className="relative w-28 h-28 rounded-full object-cover transition-all duration-300 ring-4 ring-white/20 shadow-xl"
                  style={{
                    border: `3px solid ${theme === 'light' ? '#ffffff' : themeConfig.colors.border}`,
                  }}
                />
                {/* Professional verified badge */}
                {content.profileVerified && (
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Professional Name & Bio */}
          <div
            className="mb-8 text-center max-w-md"
            style={{ textAlign: design.textAlignment || 'center' }}
          >
            {toggles.profileName && (
              <h1
                className="text-2xl font-semibold mb-3 tracking-tight"
                style={{
                  color: design.textPrimaryColor || themeConfig.colors.textPrimary,
                  fontFamily: design.font || 'Inter, system-ui, sans-serif'
                }}
              >
                {profileName}
              </h1>
            )}
            {toggles.bio && (
              <p
                className="text-base leading-relaxed opacity-80"
                style={{
                  color: design.textSecondaryColor || themeConfig.colors.textSecondary,
                  fontFamily: design.font || 'Inter, system-ui, sans-serif'
                }}
              >
                {profileBio}
              </p>
            )}
          </div>

          {/* Professional Social Links */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex gap-2 mb-8 flex-wrap justify-center">
              {socialLinks.map((link, index) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2.5 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
                  style={{
                    animationDelay: `${index * 80}ms`,
                    background: theme === 'light'
                      ? 'rgba(255, 255, 255, 0.8)'
                      : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${theme === 'light' ? 'rgba(0,0,0,0.08)' : themeConfig.colors.border}`,
                    backdropFilter: 'blur(10px)',
                    boxShadow: theme === 'light'
                      ? '0 2px 8px rgba(0,0,0,0.04)'
                      : '0 2px 8px rgba(0,0,0,0.2)'
                  }}
                >
                  <div
                    className="transition-colors duration-300"
                    style={{ color: themeConfig.colors.textPrimary }}
                  >
                    {getPlatformIcon(link.name, 20)}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Professional Actions Section */}
        <div className="w-full space-y-3 px-6 pb-12">
          {actions.map((action, index) => {
            switch (action.type) {
              case "LINK_LIST":
                return (
                  <div
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    className="animate-fade-in-up"
                  >
                    <LinkListAction action={action} theme={themeConfig} />
                  </div>
                );
              case "CONTACT_FORM":
                return (
                  <div
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    className="animate-fade-in-up"
                  >
                    <ContactFormAction action={action} theme={themeConfig} />
                  </div>
                );
              case "TEXT_BLOCK":
                return (
                  <div
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    className="animate-fade-in-up"
                  >
                    <TextBlockAction action={action} theme={themeConfig} />
                  </div>
                );
              case "IMAGE_GALLERY":
                return (
                  <div
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    className="animate-fade-in-up"
                  >
                    <ImageGalleryAction action={action} theme={themeConfig} />
                  </div>
                );
              case "MUSIC_PLAYER":
                return (
                  <div
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    className="animate-fade-in-up"
                  >
                    <MusicPlayerAction action={action} theme={themeConfig} />
                  </div>
                );
              case "LOCATION_MAP":
                return (
                  <div
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    className="animate-fade-in-up"
                  >
                    <LocationMapAction action={action} theme={themeConfig} />
                  </div>
                );
              case "VIDEO_SHOWCASE":
                return (
                  <div
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    className="animate-fade-in-up"
                  >
                    <VideoShowcaseAction action={action} theme={themeConfig} />
                  </div>
                );
              case "PRODUCT_SHOWCASE":
                return (
                  <div
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    className="animate-fade-in-up"
                  >
                    <ProductShowcaseAction action={action} theme={themeConfig} />
                  </div>
                );
              case "CALENDAR_BOOKING":
                return (
                  <div
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    className="animate-fade-in-up"
                  >
                    <CalendarBookingAction action={action} theme={themeConfig} />
                  </div>
                );
              case "PHONE_CALL":
                return (
                  <div
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    className="animate-fade-in-up"
                  >
                    <PhoneCallAction action={action} theme={themeConfig} />
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

export default ProfessionalTemplate;
