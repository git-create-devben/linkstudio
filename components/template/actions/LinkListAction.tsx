import { ActionItemType } from "@/stores/useContentStore";
import { Theme } from "@/lib/themeSystem";
import Link from "next/link";

interface LinkListActionProps {
  action: ActionItemType;
  theme: Theme;
}

// A specific component just for rendering a Link List action
const LinkListAction = ({ action, theme }: LinkListActionProps) => {
  return (
    <div className="w-full space-y-4">
      {action.config.title && (
        <h2 
          className="text-xl font-bold text-center drop-shadow-md transition-all duration-300"
          style={{ color: theme.colors.textPrimary }}
        >
          {action.config.title}
        </h2>
      )}
      {action.config.links?.map((link, i) => (
        <Link
          key={i}
          href={`/api/redirect?actionId=${action.id}&url=${encodeURIComponent(
            link.url
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`group block w-full p-4 rounded-2xl text-center font-semibold transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-xl ${theme.cardStyle}`}
          style={{
            background: theme.colors.cardBackground,
            border: `2px solid ${theme.colors.border}`,
            boxShadow: `0 8px 32px ${theme.colors.shadow}`,
            animationDelay: `${i * 50}ms`
          }}
        >
          {/* Hover overlay effect */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
            }}
          />
          
          {/* Link content */}
          <div className="relative flex items-center justify-center gap-3">
            {/* Icon placeholder for future enhancement */}
            <div 
              className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-125"
              style={{ backgroundColor: theme.colors.accent }}
            />
            
            <span 
              className="text-base transition-all duration-300 group-hover:font-bold"
              style={{ color: theme.colors.textPrimary }}
            >
              {link.title}
            </span>
            
            {/* Arrow icon */}
            <svg 
              className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1 opacity-60 group-hover:opacity-100" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ color: theme.colors.textSecondary }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
};

  export default LinkListAction;