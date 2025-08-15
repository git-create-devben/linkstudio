"use client";
import { ActionItemType, useUserContentStore } from "@/stores/useContentStore";
import { Theme, getButtonStyle } from "@/lib/themeSystem";
import { MessageCircle, Phone } from "lucide-react";

interface WhatsAppChatActionProps {
  action: ActionItemType;
  theme: Theme;
}

const buildWhatsAppLink = (phone: string, message: string) => {
  const p = phone.replace(/[^0-9]/g, '');
  const text = encodeURIComponent(message || '');
  return `https://wa.me/${p}?text=${text}`;
};

const WhatsAppChatAction = ({ action, theme }: WhatsAppChatActionProps) => {
  const { design } = useUserContentStore();
  const buttonStyle = getButtonStyle(design, theme);
  const { phoneNumber, message, title } = action.config;
  const url = phoneNumber ? buildWhatsAppLink(phoneNumber, message || '') : undefined;

  return (
    <div className="w-full space-y-3">
      {title && (
        <h2 
          className="text-xl font-bold text-center" 
          style={{ 
            color: design.textPrimaryColor || theme.colors.textPrimary, 
            fontFamily: design.font || 'Inter, system-ui, sans-serif' 
          }}
        >
          {title}
        </h2>
      )}

      {url ? (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`block w-full text-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${buttonStyle.className}`} 
          style={buttonStyle.style}
        >
          <div className="flex items-center justify-center gap-2">
            <MessageCircle size={20} />
            <span>{title || 'Chat on WhatsApp'}</span>
          </div>
        </a>
      ) : (
        <div className="text-center py-8 opacity-60">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
            <Phone size={24} className="text-green-500" />
          </div>
          <p 
            className="text-sm" 
            style={{ 
              color: design.textSecondaryColor || theme.colors.textSecondary,
              fontFamily: design.font || 'Inter, system-ui, sans-serif'
            }}
          >
            Add your phone number to enable WhatsApp chat.
          </p>
        </div>
      )}
    </div>
  );
};

export default WhatsAppChatAction;