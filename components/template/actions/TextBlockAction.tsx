"use client";
import { ActionItemType } from "@/stores/useContentStore";
import { Theme } from "@/lib/themeSystem";
import { useUserContentStore } from "@/stores/useContentStore";

interface TextBlockActionProps {
  action: ActionItemType;
  theme: Theme;
}

const TextBlockAction = ({ action, theme }: TextBlockActionProps) => {
  const { design } = useUserContentStore();

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
        <div 
          className="prose prose-sm max-w-none"
          style={{ 
            color: design.textSecondaryColor || theme.colors.textSecondary,
            fontFamily: design.font || 'Inter, system-ui, sans-serif'
          }}
        >
          {action.config.content ? (
            <div dangerouslySetInnerHTML={{ __html: action.config.content }} />
          ) : (
            <p className="text-center opacity-60">
              Add your text content here...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextBlockAction;