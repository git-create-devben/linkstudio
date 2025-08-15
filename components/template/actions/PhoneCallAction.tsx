"use client";
import { ActionItemType } from "@/stores/useContentStore";
import { Theme, getButtonStyle } from "@/lib/themeSystem";
import { useUserContentStore } from "@/stores/useContentStore";
import { Phone, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface PhoneNumber {
  number: string;
  label: string;
  description?: string;
  hours?: string;
  location?: string;
}

interface PhoneCallActionProps {
  action: ActionItemType;
  theme: Theme;
}

const PhoneCallAction = ({ action, theme }: PhoneCallActionProps) => {
  const { design } = useUserContentStore();
  const buttonStyle = getButtonStyle(design, theme);

  // Support both single number and multiple numbers
  const phoneNumbers: PhoneNumber[] = action.config.phoneNumbers || 
    (action.config.phoneNumber ? [{
      number: action.config.phoneNumber,
      label: action.config.title || 'Call Now',
      description: action.config.description
    }] : []);

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned;
  };

  const displayPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length === 11 && cleaned[0] === '1') {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  };

  const PhoneCard = ({ phoneData, index }: { phoneData: PhoneNumber; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:shadow-lg"
      style={{
        background: theme.colors.cardBackground,
        border: `1px solid ${theme.colors.border}`,
        boxShadow: `0 4px 16px ${theme.colors.shadow}`
      }}
    >
      <div className="text-center space-y-4">
        {/* Phone Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Phone size={24} className="text-white" />
        </div>

        {/* Phone Info */}
        <div className="space-y-2">
          <h3 
            className="text-lg font-semibold"
            style={{ 
              color: design.textPrimaryColor || theme.colors.textPrimary,
              fontFamily: design.font || 'Inter, system-ui, sans-serif'
            }}
          >
            {phoneData.label}
          </h3>
          
          <p 
            className="text-xl font-bold"
            style={{ 
              color: design.textPrimaryColor || theme.colors.textPrimary,
              fontFamily: design.font || 'Inter, system-ui, sans-serif'
            }}
          >
            {displayPhoneNumber(phoneData.number)}
          </p>
          
          {phoneData.description && (
            <p 
              className="text-sm opacity-80"
              style={{ 
                color: design.textSecondaryColor || theme.colors.textSecondary,
                fontFamily: design.font || 'Inter, system-ui, sans-serif'
              }}
            >
              {phoneData.description}
            </p>
          )}
        </div>

        {/* Additional Info */}
        {(phoneData.hours || phoneData.location) && (
          <div className="space-y-2 pt-2 border-t border-white/10">
            {phoneData.hours && (
              <div className="flex items-center justify-center gap-2 text-sm">
                <Clock size={14} className="text-blue-400" />
                <span 
                  style={{ 
                    color: design.textSecondaryColor || theme.colors.textSecondary,
                    fontFamily: design.font || 'Inter, system-ui, sans-serif'
                  }}
                >
                  {phoneData.hours}
                </span>
              </div>
            )}
            {phoneData.location && (
              <div className="flex items-center justify-center gap-2 text-sm">
                <MapPin size={14} className="text-red-400" />
                <span 
                  style={{ 
                    color: design.textSecondaryColor || theme.colors.textSecondary,
                    fontFamily: design.font || 'Inter, system-ui, sans-serif'
                  }}
                >
                  {phoneData.location}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Call Button */}
        <a
          href={`tel:${formatPhoneNumber(phoneData.number)}`}
          className={`inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${buttonStyle.className}`}
          style={{
            ...buttonStyle.style,
            fontFamily: design.font || 'Inter, system-ui, sans-serif'
          }}
        >
          <Phone size={18} />
          Call Now
        </a>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full space-y-6">
      {action.config.title && phoneNumbers.length > 1 && (
        <h2 
          className="text-xl font-bold text-center drop-shadow-md"
          style={{ 
            color: design.textPrimaryColor || theme.colors.textPrimary,
            fontFamily: design.font || 'Inter, system-ui, sans-serif'
          }}
        >
          {action.config.title}
        </h2>
      )}
      
      {phoneNumbers.length > 0 ? (
        <div className={`grid gap-6 ${
          phoneNumbers.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
          phoneNumbers.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {phoneNumbers.map((phoneData, index) => (
            <PhoneCard key={index} phoneData={phoneData} index={index} />
          ))}
        </div>
      ) : (
        <div 
          className="p-8 rounded-2xl backdrop-blur-sm border text-center"
          style={{
            background: theme.colors.cardBackground,
            border: `1px solid ${theme.colors.border}`,
            boxShadow: `0 8px 32px ${theme.colors.shadow}`
          }}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-500/20 flex items-center justify-center">
            <Phone size={24} className="text-gray-400" />
          </div>
          <p 
            className="text-sm"
            style={{ 
              color: design.textSecondaryColor || theme.colors.textSecondary,
              fontFamily: design.font || 'Inter, system-ui, sans-serif'
            }}
          >
            Add phone numbers to enable calling
          </p>
        </div>
      )}
    </div>
  );
};

export default PhoneCallAction;