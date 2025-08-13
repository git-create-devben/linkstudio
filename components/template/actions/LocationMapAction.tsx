import { ActionItemType } from "@/stores/useContentStore";
import { Theme } from "@/lib/themeSystem";
import { useUserContentStore } from "@/stores/useContentStore";

interface LocationMapActionProps {
  action: ActionItemType;
  theme: Theme;
}

const LocationMapAction = ({ action, theme }: LocationMapActionProps) => {
  const { design } = useUserContentStore();

  const address = action.config.address;
  const showMap = action.config.showMap !== false;

  // Create Google Maps embed URL
  const mapUrl = address ? `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(address)}` : null;

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
        className="p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300"
        style={{
          background: theme.colors.cardBackground,
          border: `1px solid ${theme.colors.border}`,
          boxShadow: `0 8px 32px ${theme.colors.shadow}`
        }}
      >
        {address ? (
          <div className="space-y-4">
            {/* Address Display */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p 
                  className="text-base leading-relaxed"
                  style={{ 
                    color: design.textSecondaryColor || theme.colors.textSecondary,
                    fontFamily: design.font || 'Inter, system-ui, sans-serif'
                  }}
                >
                  {address}
                </p>
              </div>
            </div>

            {/* Map Placeholder (since we don't have a real API key) */}
            {showMap && (
              <div className="relative">
                <div 
                  className="w-full h-48 rounded-lg bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center relative overflow-hidden"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)
                    `
                  }}
                >
                  {/* Map Grid Pattern */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px'
                    }}
                  />
                  
                  {/* Location Pin */}
                  <div className="relative z-10 text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-red-500 flex items-center justify-center shadow-lg animate-bounce">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">📍 You are here</p>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 left-4 w-3 h-3 bg-blue-400 rounded-full opacity-60" />
                  <div className="absolute top-8 right-6 w-2 h-2 bg-green-400 rounded-full opacity-60" />
                  <div className="absolute bottom-6 left-8 w-4 h-4 bg-yellow-400 rounded-full opacity-60" />
                  <div className="absolute bottom-4 right-4 w-2 h-2 bg-purple-400 rounded-full opacity-60" />
                </div>
                
                {/* Get Directions Button */}
                <div className="mt-4">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Get Directions
                  </a>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 opacity-60">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p 
              style={{ 
                color: design.textSecondaryColor || theme.colors.textSecondary,
                fontFamily: design.font || 'Inter, system-ui, sans-serif'
              }}
            >
              Add your location to display it here...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationMapAction;