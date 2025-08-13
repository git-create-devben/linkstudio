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
  
  const finalColor = curveColor || curveColors[0].value;
  
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

// Traveler template with adventure-themed styling
const TravelerTemplate: React.FC<TemplateProps> = ({
  content,
  design,
  actions,
  toggles,
  socialLinks,
}) => {
  const { profileName, profileBio, profilePicture } = content;
  const { theme = 'light', banner, customBackground } = design;
  
  const themeConfig = getTheme(theme);
  
  // Travel-themed gradient background
  const travelBackground = customBackground || 
    'linear-gradient(135deg, #74b9ff 0%, #0984e3 25%, #00b894 50%, #00cec9 75%, #fdcb6e 100%)';
  
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center relative overflow-hidden transition-all duration-500"
      style={{ 
        background: travelBackground,
        color: themeConfig.colors.textPrimary,
        fontFamily: design.font || 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Travel-themed animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating clouds */}
        <div className="absolute top-10 left-10 w-20 h-12 bg-white/20 rounded-full animate-pulse" style={{ animationDuration: '4s' }}>
          <div className="absolute top-2 left-4 w-8 h-8 bg-white/15 rounded-full" />
          <div className="absolute top-1 right-2 w-6 h-6 bg-white/15 rounded-full" />
        </div>
        <div className="absolute top-20 right-20 w-16 h-10 bg-white/15 rounded-full animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}>
          <div className="absolute top-1 left-3 w-6 h-6 bg-white/10 rounded-full" />
          <div className="absolute top-2 right-1 w-4 h-4 bg-white/10 rounded-full" />
        </div>
        
        {/* Airplane path */}
        <div className="absolute top-1/4 left-0 w-full h-1">
          <div 
            className="absolute w-8 h-1 bg-white/30 animate-pulse"
            style={{
              clipPath: 'polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%, 20% 50%)',
              animationDuration: '3s'
            }}
          />
        </div>
        
        {/* Mountain silhouettes */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-20">
          <div 
            className="absolute bottom-0 left-0 w-40 h-24 bg-white/30"
            style={{ clipPath: 'polygon(0 100%, 30% 20%, 60% 40%, 100% 0, 100% 100%)' }}
          />
          <div 
            className="absolute bottom-0 left-32 w-48 h-32 bg-white/20"
            style={{ clipPath: 'polygon(0 100%, 25% 10%, 50% 30%, 75% 5%, 100% 100%)' }}
          />
          <div 
            className="absolute bottom-0 right-0 w-36 h-20 bg-white/25"
            style={{ clipPath: 'polygon(0 100%, 40% 25%, 80% 15%, 100% 100%)' }}
          />
        </div>
        
        {/* Travel icons floating */}
        <div className="absolute top-1/3 left-1/4 text-white/15 text-3xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '4s' }}>✈️</div>
        <div className="absolute top-1/2 right-1/4 text-white/15 text-2xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '5s' }}>🗺️</div>
        <div className="absolute bottom-1/3 left-1/3 text-white/15 text-4xl animate-bounce" style={{ animationDelay: '2s', animationDuration: '6s' }}>🏔️</div>
        <div className="absolute top-2/3 right-1/3 text-white/15 text-2xl animate-bounce" style={{ animationDelay: '3s', animationDuration: '4s' }}>📸</div>
        
        {/* Gradient overlay for depth */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(255,255,255,0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(255,255,255,0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Travel Banner Section */}
        {((banner && banner.type !== 'none') || (design.bannerType === 'curve' && design.curveShape)) && (
          <div 
            className="w-full relative overflow-hidden mb-6"
            style={{ height: design.bannerHeight || banner?.height || 150 }}
          >
            {banner?.type === 'image' && banner.value && (
              <>
                <img 
                  src={banner.value} 
                  alt="Banner" 
                  className={`w-full h-full object-cover ${banner.blur ? 'blur-sm' : ''}`}
                  style={{ opacity: banner.opacity || 1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
              </>
            )}
            
            {design.bannerType === 'curve' && design.curveShape && (
              <div 
                className={`w-full h-full transition-all duration-500 ${
                  design.curveAnimated !== false 
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

        {/* Traveler Profile Section */}
        <div className={`${banner && banner.type !== 'none' ? 'pt-4 -mt-18' : 'pt-12'} pb-6 flex flex-col items-center px-6`}>
          {/* Traveler Avatar with adventure effects */}
          {profilePicture && (
            <div className="relative mb-6">
              {/* Compass-like rotating ring */}
              <div 
                className="absolute inset-0 rounded-full border-4 border-white/30 animate-spin" 
                style={{ 
                  animationDuration: '30s',
                  transform: 'scale(1.3)'
                }}
              />
              <div 
                className="absolute inset-0 rounded-full border-2 border-white/20 animate-spin" 
                style={{ 
                  animationDuration: '20s',
                  animationDirection: 'reverse',
                  transform: 'scale(1.2)'
                }}
              />
              
              <div className="relative">
                <div 
                  className="p-1 rounded-full"
                  style={{
                    background: 'linear-gradient(45deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2))',
                  }}
                >
                  <img
                    src={profilePicture || defaultProfilePicture.src}
                    alt={profileName || "Profile"}
                    className="relative w-32 h-32 rounded-full object-cover shadow-2xl transition-all duration-500 hover:scale-105"
                    style={{
                      border: '3px solid rgba(255,255,255,0.5)',
                      filter: 'brightness(1.1) contrast(1.05)'
                    }}
                  />
                </div>
                
                {/* Travel badge */}
                {content.profileVerified && (
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center shadow-xl animate-bounce"
                       style={{
                         background: 'linear-gradient(45deg, #74b9ff, #00b894)',
                         animationDuration: '3s'
                       }}>
                    <span className="text-white text-lg">🌍</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Traveler Name & Bio with adventure typography */}
          <div 
            className="mb-8 text-center max-w-sm"
            style={{ textAlign: design.textAlignment || 'center' }}
          >
            {toggles.profileName && (
              <h1 
                className="text-3xl font-bold mb-4 tracking-wide drop-shadow-lg"
                style={{ 
                  color: design.textPrimaryColor || '#ffffff',
                  fontFamily: design.font || 'Inter, system-ui, sans-serif',
                  textShadow: '0 2px 12px rgba(0,0,0,0.3)'
                }}
              >
                {profileName}
              </h1>
            )}
            {toggles.bio && (
              <p 
                className="text-lg leading-relaxed opacity-90 drop-shadow-md"
                style={{ 
                  color: design.textSecondaryColor || 'rgba(255,255,255,0.95)',
                  fontFamily: design.font || 'Inter, system-ui, sans-serif',
                  textShadow: '0 1px 6px rgba(0,0,0,0.2)'
                }}
              >
                {profileBio}
              </p>
            )}
          </div>

          {/* Travel Social Links with map-pin hover effects */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex gap-3 mb-8 flex-wrap justify-center">
              {socialLinks.map((link, index) => (
                <a 
                  key={link.id} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative p-3 rounded-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.15))',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
                  }}
                >
                  {/* Map pin drop effect */}
                  <div 
                    className="absolute -top-1 left-1/2 w-2 h-2 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-ping" 
                    style={{ transform: 'translateX(-50%)' }}
                  />
                  
                  <div 
                    className="relative transition-all duration-300 group-hover:scale-110"
                    style={{ color: '#ffffff' }}
                  >
                    {getPlatformIcon(link.name, 24)}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
     
        {/* Travel Actions Section */}
        <div className="w-full space-y-4 px-6 pb-12">
          {actions.map((action, index) => {
            switch (action.type) {
              case "LINK_LIST":
                return (
                  <div 
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 200}ms` }}
                    className="animate-fade-in-up"
                  >
                    <LinkListAction action={action} theme={themeConfig} />
                  </div>
                );
              case "CONTACT_FORM":
                return (
                  <div 
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 200}ms` }}
                    className="animate-fade-in-up"
                  >
                    <ContactFormAction action={action} theme={themeConfig} />
                  </div>
                );
              case "TEXT_BLOCK":
                return (
                  <div 
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 200}ms` }}
                    className="animate-fade-in-up"
                  >
                    <TextBlockAction action={action} theme={themeConfig} />
                  </div>
                );
              case "IMAGE_GALLERY":
                return (
                  <div 
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 200}ms` }}
                    className="animate-fade-in-up"
                  >
                    <ImageGalleryAction action={action} theme={themeConfig} />
                  </div>
                );
              case "MUSIC_PLAYER":
                return (
                  <div 
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 200}ms` }}
                    className="animate-fade-in-up"
                  >
                    <MusicPlayerAction action={action} theme={themeConfig} />
                  </div>
                );
              case "LOCATION_MAP":
                return (
                  <div 
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 200}ms` }}
                    className="animate-fade-in-up"
                  >
                    <LocationMapAction action={action} theme={themeConfig} />
                  </div>
                );
              case "VIDEO_SHOWCASE":
                return (
                  <div 
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 200}ms` }}
                    className="animate-fade-in-up"
                  >
                    <VideoShowcaseAction action={action} theme={themeConfig} />
                  </div>
                );
              case "PRODUCT_SHOWCASE":
                return (
                  <div 
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 200}ms` }}
                    className="animate-fade-in-up"
                  >
                    <ProductShowcaseAction action={action} theme={themeConfig} />
                  </div>
                );
              case "CALENDAR_BOOKING":
                return (
                  <div 
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 200}ms` }}
                    className="animate-fade-in-up"
                  >
                    <CalendarBookingAction action={action} theme={themeConfig} />
                  </div>
                );
              case "PHONE_CALL":
                return (
                  <div 
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 200}ms` }}
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

export default TravelerTemplate;