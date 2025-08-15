"use client";
import { ActionItemType, useUserContentStore } from "@/stores/useContentStore";
import { Theme, getButtonStyle } from "@/lib/themeSystem";

interface NewsletterSignupActionProps {
  action: ActionItemType;
  theme: Theme;
}

const NewsletterSignupAction = ({ action, theme }: NewsletterSignupActionProps) => {
  const { design } = useUserContentStore();
  const buttonStyle = getButtonStyle(design, theme);
  const { description, provider, actionUrl, placeholder, buttonText } = action.config;

  return (
    <div className="w-full space-y-3">
      {action.config.title && (
        <h2
          className="text-xl font-bold text-center"
          style={{ color: design.textPrimaryColor || theme.colors.textPrimary, fontFamily: design.font || 'Inter, system-ui, sans-serif' }}
        >
          {action.config.title}
        </h2>
      )}

      {description && (
        <p className="text-sm text-center opacity-80" style={{ color: design.textSecondaryColor || theme.colors.textSecondary }}>
          {description}
        </p>
      )}

      <form action={actionUrl || '#'} method="get" target="_blank" rel="noopener noreferrer" className="flex gap-2">
        <input
          type="email"
          placeholder={placeholder || 'you@example.com'}
          className="flex-1 px-3 py-2 rounded-lg border text-sm"
          style={{ borderColor: theme.colors.border, background: theme.colors.cardBackground, color: design.textPrimaryColor || theme.colors.textPrimary }}
          required
        />
        <button type="submit" className={`px-4 py-2 rounded-lg text-sm font-medium ${buttonStyle.className}`} style={buttonStyle.style}>
          {buttonText || 'Subscribe'}
        </button>
      </form>
    </div>
  );
};

export default NewsletterSignupAction;

