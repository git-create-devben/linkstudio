import { ActionItemType } from "@/stores/useContentStore";
import { Theme, getButtonStyle, getIcon } from "@/lib/themeSystem";
import Link from "next/link";
import { useUserContentStore } from "@/stores/useContentStore";

interface LinkListActionProps {
  action: ActionItemType;
  theme: Theme;
}

// A specific component just for rendering a Link List action
const LinkListAction = ({ action, theme }: LinkListActionProps) => {
  const { design } = useUserContentStore();
  const buttonStyle = getButtonStyle(design, theme);
  
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
      {action.config.links?.map((link, i) => {
        // Get icon if specified in link
        const linkIcon = link.icon ? getIcon(link.icon) : null;
        
        return (
          <Link
            key={i}
            href={`/api/redirect?actionId=${action.id}&url=${encodeURIComponent(
              link.url
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative block w-full p-4 text-center font-semibold transition-all duration-300 ${buttonStyle.className}`}
            style={{
              ...buttonStyle.style,
              animationDelay: `${i * 50}ms`,
              fontFamily: design.font || 'Inter, system-ui, sans-serif'
            }}
          >
            {/* Hover overlay effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                borderRadius: 'inherit'
              }}
            />
            
            {/* Link content */}
            <div className="relative flex items-center justify-center gap-3">
              {/* Icon */}
              {linkIcon && (
                <span 
                  className="text-lg transition-all duration-300 group-hover:scale-110"
                  role="img"
                  aria-label={linkIcon.name}
                >
                  {linkIcon.emoji}
                </span>
              )}
              
              <span 
                className="text-base transition-all duration-300 group-hover:font-bold flex-1"
                style={{ color: design.buttonTextColor || theme.colors.textPrimary }}
              >
                {link.title}
              </span>
              
              {/* Arrow icon */}
              <svg 
                className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1 opacity-60 group-hover:opacity-100" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ color: design.buttonTextColor || theme.colors.textSecondary }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

  export default LinkListAction;