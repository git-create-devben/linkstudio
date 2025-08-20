"use client";
import { ActionItemType } from "@/stores/useContentStore";
import { Theme, getButtonStyle } from "@/lib/themeSystem";
import { useUserContentStore } from "@/stores/useContentStore";
import { Calendar, MapPin } from "lucide-react";

interface EventCardActionProps {
  action: ActionItemType;
  theme: Theme;
}

const EventCardAction = ({ action, theme }: EventCardActionProps) => {
  const { design } = useUserContentStore();
  const buttonStyle = getButtonStyle(design, theme);

  const {
    title = "Event Title",
    description = "Event description",
    date = "Date TBD",
    location = "Location TBD",
    url = "#",
    buttonText = "Register Now"
  } = action.config;

  return (
    <div className="w-full space-y-4">
      {title && (
        <h2
          className="text-xl font-bold text-center drop-shadow-md transition-all duration-300"
          style={{
            color: design.textPrimaryColor || theme.colors.textPrimary,
            fontFamily: design.font || 'Inter, system-ui, sans-serif'
          }}
        >
          {title}
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
        <div className="space-y-4">
          {description && (
            <p
              className="text-base leading-relaxed"
              style={{
                color: design.textSecondaryColor || theme.colors.textSecondary,
                fontFamily: design.font || 'Inter, system-ui, sans-serif'
              }}
            >
              {description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar
                size={18}
                style={{ color: design.textPrimaryColor || theme.colors.textPrimary }}
              />
              <span
                style={{
                  color: design.textSecondaryColor || theme.colors.textSecondary,
                  fontFamily: design.font || 'Inter, system-ui, sans-serif'
                }}
              >
                {date}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin
                size={18}
                style={{ color: design.textPrimaryColor || theme.colors.textPrimary }}
              />
              <span
                style={{
                  color: design.textSecondaryColor || theme.colors.textSecondary,
                  fontFamily: design.font || 'Inter, system-ui, sans-serif'
                }}
              >
                {location}
              </span>
            </div>
          </div>

          {url && url !== "#" && (
            <div className="pt-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 w-full sm:w-auto"
                style={{
                  ...buttonStyle,
                  textDecoration: 'none'
                }}
              >
                {buttonText}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCardAction;