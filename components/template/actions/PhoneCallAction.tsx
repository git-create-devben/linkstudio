"use client";
import { ActionItemType } from "@/stores/useContentStore";
import { Theme, getButtonStyle } from "@/lib/themeSystem";
import { useUserContentStore } from "@/stores/useContentStore";

interface PhoneCallActionProps {
  action: ActionItemType;
  theme: Theme;
}

const PhoneCallAction = ({ action, theme }: PhoneCallActionProps) => {
  const { design } = useUserContentStore();
  const buttonStyle = getButtonStyle(design, theme);

  const phoneNumber = action.config.phoneNumber;
  const description = action.config.description;

  const formatPhoneNumber = (phone: string) => {
    // Remove all non-digit characters for the tel: link
    const cleaned = phone.replace(/\D/g, '');
    return cleaned;
  };

  const displayPhoneNumber = (phone: string) => {
    // Format for display (you can customize this based on your needs)
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length === 11 && cleaned[0] === '1') {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    return phone; // Return original if can't format
  };

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
        {phoneNumber ? (
          <div className="text-center space-y-4">
            {/* Phone Icon */}
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>

            {/* Phone Number Display */}
            <div className="mb-4">
              <p 
                className="text-2xl font-bold mb-2"
                style={{ 
                  color: design.textPrimaryColor || theme.colors.textPrimary,
                  fontFamily: design.font || 'Inter, system-ui, sans-serif'
                }}
              >
                {displayPhoneNumber(phoneNumber)}
              </p>
              
              {description && (
                <p 
                  className="text-base opacity-80"
                  style={{ 
                    color: design.textSecondaryColor || theme.colors.textSecondary,
                    fontFamily: design.font || 'Inter, system-ui, sans-serif'
                  }}
                >
                  {description}
                </p>
              )}
            </div>

            {/* Call Button */}
            <a
              href={`tel:${formatPhoneNumber(phoneNumber)}`}
              className={`inline-flex items-center gap-3 px-6 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${buttonStyle.className}`}
              style={{
                ...buttonStyle.style,
                fontFamily: design.font || 'Inter, system-ui, sans-serif'
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {action.config.title || 'Call Now'}
            </a>

            {/* Additional Info */}
            <div className="mt-6 p-4 rounded-lg bg-black/5">
              <div className="flex items-center justify-center gap-2 text-sm opacity-80">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span 
                  style={{ 
                    color: design.textSecondaryColor || theme.colors.textSecondary,
                    fontFamily: design.font || 'Inter, system-ui, sans-serif'
                  }}
                >
                  Tap to call directly from your device
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 opacity-60">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <p 
              style={{ 
                color: design.textSecondaryColor || theme.colors.textSecondary,
                fontFamily: design.font || 'Inter, system-ui, sans-serif'
              }}
            >
              Add your phone number to enable calling...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneCallAction;