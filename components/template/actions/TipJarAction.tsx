"use client";
import { ActionItemType, useUserContentStore } from "@/stores/useContentStore";
import { Theme, getButtonStyle, getIcon } from "@/lib/themeSystem";
import Link from "next/link";

interface TipJarActionProps {
  action: ActionItemType;
  theme: Theme;
}

const TipJarAction = ({ action, theme }: TipJarActionProps) => {
  const { design } = useUserContentStore();
  const buttonStyle = getButtonStyle(design, theme);
  const links = action.config.links || [];

  return (
    <div className="w-full space-y-4">
      {action.config.title && (
        <h2
          className="text-xl font-bold text-center"
          style={{ color: design.textPrimaryColor || theme.colors.textPrimary, fontFamily: design.font || 'Inter, system-ui, sans-serif' }}
        >
          {action.config.title}
        </h2>
      )}

      {links.map((link: any, i: number) => (
        <Link
          key={i}
          href={`/api/redirect?actionId=${action.id}&url=${encodeURIComponent(link.url || '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative block w-full p-4 text-center font-semibold transition-all duration-300 ${buttonStyle.className}`}
          style={{ ...buttonStyle.style, animationDelay: `${i * 50}ms`, fontFamily: design.font || 'Inter, system-ui, sans-serif' }}
        >
          <div className="relative flex items-center justify-center gap-3">
            <span className="text-base" style={{ color: design.buttonTextColor || theme.colors.textPrimary }}>
              {link.title || 'Donate'}
            </span>
          </div>
        </Link>
      ))}

      {links.length === 0 && (
        <p className="text-center text-sm opacity-70" style={{ color: design.textSecondaryColor || theme.colors.textSecondary }}>
          Add Ko-fi, BuyMeACoffee, or PayPal links here.
        </p>
      )}
    </div>
  );
};

export default TipJarAction;

