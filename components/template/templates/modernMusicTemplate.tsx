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

// Modern Music template with vibrant, music-focused styling
const ModernMusicTemplate: React.FC<TemplateProps> = ({
  content,
  design,
  actions,
  toggles,
  socialLinks,
}) => {
  const { profileName, profileBio, profilePicture } = content;
  const { theme = 'dark', banner, customBackground } = design;
  
  const themeConfig = getTheme(theme);
  
  // Music-themed gradient background
  const musicBackground = customBackground || 
    'linear-gradient(135deg, #667eea 0%, #764ba2 20%, #f093fb 40%, #f5576c 60%, #4facfe 80%, #00f2fe 100%)';
  
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center relative overflow-hidden transition-all duration-500"
      style={{ 
        background: musicBackground,
        color: themeConfig.colors.textPrimary,
        fontFamily: design.font || 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Music-themed animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Vinyl record animation */}
        <div 
          className="absolute top-10 right-10 w-32 h-32 rounded-full border-8 border-white/10 animate-spin"
          style={{ 
            animationDuration: '20s',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 30%, transparent 31%, transparent 40%, rgba(255,255,255,0.05) 41%, rgba(255,255,255,0.05) 60%, transparent 61%)'
          }}
        >
          <div className="absolute inset-4 rounded-full bg-white/5" />
          <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20" />
        </div>
        
        {/* Sound waves */}
        <div className="absolute bottom-20 left-10">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 bg-white/20 animate-pulse"
              style={{
                left: `${i * 8}px`,
                width: '4px',
                height: `${20 + Math.sin(i) * 15}px`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>
        
        {/* Musical notes floating */}
        <div className="absolute top-1/4 left-1/4 text-white/10 text-4xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>♪</div>
        <div className="absolute top-1/3 right-1/3 text-white/10 text-3xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>♫</div>
        <div className="absolute bottom-1/3 left-1/5 text-white/10 text-5xl animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}>♬</div>
        
        {/* Gradient mesh overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 20% 70%, rgba(255,255,255,0.08) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Music Banner Section */}
        {((banner && banner.type !== 'none') || (design.bannerType === 'curve' && design.curveShape)) && (
          <div 
            className="w-full relative overflow-hidden mb-6"
            style={{ height: design.bannerHeight || banner?.height || 160 }}
          >
            {banner?.type === 'image' && banner.value && (
              <>
                <img 
                  src={banner.value} 
                  alt="Banner" 
                  className={`w-full h-full object-cover ${banner.blur ? 'blur-sm' : ''}`}
                  style={{ opacity: banner.opacity || 1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
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

        {/* Music Artist Profile Section */}
        <div className={`${banner && banner.type !== 'none' ? 'pt-4 -mt-20' : 'pt-12'} pb-6 flex flex-col items-center px-6`}>
          {/* Artist Avatar with music-themed effects */}
          {profilePicture && (
            <div className="relative mb-6">
              {/* Pulsing music aura */}
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
                  className="p-1 rounded-full"
                  style={{
                    background: 'linear-gradient(45deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2))',
                  }}
                >
                  <img
                    src={profilePicture || defaultProfilePicture.src}
                    alt={profileName || "Profile"}
                    className="relative w-36 h-36 rounded-full object-cover shadow-2xl transition-all duration-500 hover:scale-105"
                    style={{
                      border: '3px solid rgba(255,255,255,0.4)',
                      filter: 'brightness(1.1) contrast(1.1)'
                    }}
                  />
                </div>
                
                {/* Music note verified badge */}
                {content.profileVerified && (
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
          )}
          
          {/* Artist Name & Bio with music typography */}
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
                  textShadow: '0 2px 15px rgba(0,0,0,0.4)'
                }}
              >
                {profileName}
              </h1>
            )}
            {toggles.bio && (
              <p 
                className="text-lg leading-relaxed opacity-90 drop-shadow-md"
                style={{ 
                  color: design.textSecondaryColor || 'rgba(255,255,255,0.9)',
                  fontFamily: design.font || 'Inter, system-ui, sans-serif',
                  textShadow: '0 1px 8px rgba(0,0,0,0.3)'
                }}
              >
                {profileBio}
              </p>
            )}
          </div>

          {/* Music Social Links with beat-sync animation */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex gap-4 mb-8 flex-wrap justify-center">
              {socialLinks.map((link, index) => (
                <a 
                  key={link.id} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative p-4 rounded-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-3 hover:rotate-6"
                  style={{
                    animationDelay: `${index * 200}ms`,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))',
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                  }}
                >
                  {/* Beat pulse effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" 
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2))',
                      transform: 'scale(1.1)',
                      animationDuration: '1s'
                    }}
                  />
                  
                  <div 
                    className="relative transition-all duration-300 group-hover:scale-125"
                    style={{ color: '#ffffff' }}
                  >
                    {getPlatformIcon(link.name, 28)}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
     
        {/* Music Actions Section */}
        <div className="w-full space-y-4 px-6 pb-12">
          {actions.map((action, index) => {
            switch (action.type) {
              case "LINK_LIST":
                return (
                  <div 
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 250}ms` }}
                    className="animate-fade-in-up"
                  >
                    <LinkListAction action={action} theme={themeConfig} />
                  </div>
                );
              case "CONTACT_FORM":
                return (
                  <div 
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 250}ms` }}
                    className="animate-fade-in-up"
                  >
                    <ContactFormAction action={action} theme={themeConfig} />
                  </div>
                );
              case "TEXT_BLOCK":
                return (
                  <div 
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 250}ms` }}
                    className="animate-fade-in-up"
                  >
                    <TextBlockAction action={action} theme={themeConfig} />
                  </div>
                );
              case "IMAGE_GALLERY":
                return (
                  <div 
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 250}ms` }}
                    className="animate-fade-in-up"
                  >
                    <ImageGalleryAction action={action} theme={themeConfig} />
                  </div>
                );
              case "MUSIC_PLAYER":
                return (
                  // <div 
                  //   key={action.id}
                  //   style={{ animationDelay: `${(index + 1) * 250}ms` }}
                  //   className="animate-fade-in-up"
                  // >
                    <MusicPlayerAction action={action} theme={themeConfig} />
                  // </div>
                );
              case "LOCATION_MAP":
                return (
                  <div 
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 250}ms` }}
                    className="animate-fade-in-up"
                  >
                    <LocationMapAction action={action} theme={themeConfig} />
                  </div>
                );
              case "VIDEO_SHOWCASE":
                return (
                  <div 
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 250}ms` }}
                    className="animate-fade-in-up"
                  >
                    <VideoShowcaseAction action={action} theme={themeConfig} />
                  </div>
                );
              case "PRODUCT_SHOWCASE":
                return (
                  <div 
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 250}ms` }}
                    className="animate-fade-in-up"
                  >
                    <ProductShowcaseAction action={action} theme={themeConfig} />
                  </div>
                );
              case "CALENDAR_BOOKING":
                return (
                  <div 
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 250}ms` }}
                    className="animate-fade-in-up"
                  >
                    <CalendarBookingAction action={action} theme={themeConfig} />
                  </div>
                );
              case "PHONE_CALL":
                return (
                  <div 
                    key={action.id}
                    style={{ animationDelay: `${(index + 1) * 250}ms` }}
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

export default ModernMusicTemplate;