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

// Creative template with vibrant, artistic styling
const CreativeTemplate: React.FC<TemplateProps> = ({
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
  
  // Creative background with vibrant gradients
  const creativeBackground = customBackground || 
    'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)';
  
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center relative overflow-hidden transition-all duration-500"
      style={{ 
        background: creativeBackground,
        color: themeConfig.colors.textPrimary,
        fontFamily: design.font || 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Creative animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <div 
          className="absolute top-20 left-10 w-20 h-20 rounded-full blur-xl animate-bounce"
          style={{ 
            background: 'linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
            animationDelay: '0s',
            animationDuration: '3s'
          }} 
        />
        <div 
          className="absolute top-40 right-16 w-16 h-16 rotate-45 blur-lg animate-pulse"
          style={{ 
            background: 'linear-gradient(45deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
            animationDelay: '1s',
            animationDuration: '4s'
          }} 
        />
        <div 
          className="absolute bottom-32 left-20 w-12 h-12 rounded-full blur-md animate-bounce"
          style={{ 
            background: 'linear-gradient(45deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))',
            animationDelay: '2s',
            animationDuration: '5s'
          }} 
        />
        <div 
          className="absolute bottom-20 right-10 w-24 h-6 rounded-full blur-lg animate-pulse"
          style={{ 
            background: 'linear-gradient(90deg, rgba(255,255,255,0.2), transparent)',
            animationDelay: '0.5s',
            animationDuration: '6s'
          }} 
        />
        
        {/* Artistic mesh gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(255,255,255,0.05) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Creative Banner Section */}
        {((banner && banner.type !== 'none') || (design.bannerType === 'curve' && design.curveShape)) && (
          <div 
            className="w-full relative overflow-hidden mb-6"
            style={{ height: design.bannerHeight || banner?.height || 140 }}
          >
            {/* Banner image support */}
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
            
            {/* Curve System */}
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

        {/* Creative Profile Section */}
        <div className={`${banner && banner.type !== 'none' ? 'pt-4 -mt-20' : 'pt-12'} pb-6 flex flex-col items-center px-6`}>
          {/* Artistic Avatar with creative effects */}
          {profilePicture && (
            <div className="relative mb-6">
              {/* Multiple glow layers for artistic effect */}
              <div 
                className="absolute inset-0 rounded-full blur-2xl scale-125 animate-pulse" 
                style={{ 
                  background: 'linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
                  animationDuration: '4s'
                }}
              />
              <div 
                className="absolute inset-0 rounded-full blur-xl scale-110 animate-pulse" 
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
                  animationDuration: '3s',
                  animationDelay: '1s'
                }}
              />
              
              <div className="relative">
                <div 
                  className="p-1 rounded-full"
                  style={{
                    background: 'linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
                  }}
                >
                  <img
                    src={profilePicture || defaultProfilePicture.src}
                    alt={profileName || "Profile"}
                    className="relative w-32 h-32 rounded-full object-cover shadow-2xl transition-all duration-500 hover:scale-105"
                    style={{
                      border: '2px solid rgba(255,255,255,0.3)',
                      filter: 'brightness(1.1) contrast(1.1)'
                    }}
                  />
                </div>
                
                {/* Creative verified badge */}
                {content.profileVerified && (
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center shadow-xl animate-bounce"
                       style={{
                         background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                         animationDuration: '2s'
                       }}>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Creative Name & Bio with artistic typography */}
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
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
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
                  textShadow: '0 1px 5px rgba(0,0,0,0.2)'
                }}
              >
                {profileBio}
              </p>
            )}
          </div>

          {/* Creative Social Links with artistic hover effects */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex gap-3 mb-8 flex-wrap justify-center">
              {socialLinks.map((link, index) => (
                <a 
                  key={link.id} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative p-3 rounded-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:rotate-3"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Hover glow effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md" 
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2))',
                      transform: 'scale(1.2)'
                    }}
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
     
        {/* Creative Actions Section */}
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

export default CreativeTemplate;