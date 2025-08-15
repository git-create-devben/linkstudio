"use client";
import { ActionItemType, useUserContentStore } from "@/stores/useContentStore";
import { Theme, getButtonStyle } from "@/lib/themeSystem";
import React, { useMemo } from "react";

interface CountdownBannerActionProps {
  action: ActionItemType;
  theme: Theme;
}

function getRemaining(target: string) {
  const t = new Date(target).getTime();
  if (!t) return null;
  const now = Date.now();
  const diff = Math.max(0, t - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return { days, hours, minutes };
}

const CountdownBannerAction = ({ action, theme }: CountdownBannerActionProps) => {
  const { design } = useUserContentStore();
  const buttonStyle = getButtonStyle(design, theme);
  const { targetDate, url } = action.config;

  const remain = useMemo(() => getRemaining(targetDate || ''), [targetDate]);

  return (
    <div className="w-full p-4 rounded-2xl border text-center" style={{ borderColor: theme.colors.border, background: theme.colors.cardBackground }}>
      {action.config.title && (
        <h2 className="text-xl font-bold mb-2" style={{ color: design.textPrimaryColor || theme.colors.textPrimary, fontFamily: design.font || 'Inter, system-ui, sans-serif' }}>
          {action.config.title}
        </h2>
      )}
      {remain ? (
        <p className="text-sm mb-3" style={{ color: design.textSecondaryColor || theme.colors.textSecondary }}>
          {remain.days}d {remain.hours}h {remain.minutes}m
        </p>
      ) : (
        <p className="text-sm mb-3" style={{ color: design.textSecondaryColor || theme.colors.textSecondary }}>
          Set a valid ISO date.
        </p>
      )}
      {url && (
        <a href={url} target="_blank" rel="noopener noreferrer" className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${buttonStyle.className}`} style={buttonStyle.style}>
          Learn more
        </a>
      )}
    </div>
  );
};

export default CountdownBannerAction;

