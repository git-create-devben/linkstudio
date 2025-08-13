"use client";
import { ActionItemType } from "@/stores/useContentStore";
import { Theme, getButtonStyle } from "@/lib/themeSystem";
import { useUserContentStore } from "@/stores/useContentStore";
import { useState } from "react";

interface CalendarBookingActionProps {
  action: ActionItemType;
  theme: Theme;
}

const CalendarBookingAction = ({ action, theme }: CalendarBookingActionProps) => {
  const { design } = useUserContentStore();
  const buttonStyle = getButtonStyle(design, theme);
  const [isLoading, setIsLoading] = useState(false);

  const calendarUrl = action.config.calendarUrl;
  const description = action.config.description;

  const handleBookingClick = () => {
    if (calendarUrl) {
      setIsLoading(true);
      setTimeout(() => {
        window.open(calendarUrl, "_blank");
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <div className="w-full space-y-4">
      {action.config.title && (
        <h2
          className="text-2xl font-extrabold text-center tracking-tight transition-all duration-300"
          style={{
            color: design.textPrimaryColor || theme.colors.textPrimary,
            fontFamily: design.font || "Inter, system-ui, sans-serif",
          }}
        >
          {action.config.title}
        </h2>
      )}

      <div
        className="p-6 rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300"
        style={{
          background: theme.colors.cardBackground,
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        {calendarUrl ? (
          <div className="flex flex-col items-center text-center space-y-5">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            {/* Description */}
            {/* {description && (
              <p
                className="max-w-md text-base leading-relaxed"
                style={{
                  color: design.textSecondaryColor || theme.colors.textSecondary,
                  fontFamily: design.font || "Inter, system-ui, sans-serif",
                }}
              >
                {description}
              </p>
            )} */}

            {/* Button */}
            <button
              onClick={handleBookingClick}
              disabled={isLoading}
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${buttonStyle.className} ${
                isLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-105 hover:shadow-lg"
              }`}
              style={{
                ...buttonStyle.style,
                fontFamily: design.font || "Inter, system-ui, sans-serif",
              }}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Opening Calendar...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Schedule Meeting
                </>
              )}
            </button>

            {/* Tip */}
            <div className="flex items-center gap-2 text-sm opacity-75 bg-black/5 rounded-lg px-4 py-2">
              {/* <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg> */}
              <span
                style={{
                  color: design.textSecondaryColor || theme.colors.textSecondary,
                  fontFamily: design.font || "Inter, system-ui, sans-serif",
                }}
              >
                Choose a time that works for both of us
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 opacity-60">
            <svg
              className="w-12 h-12 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p
              style={{
                color: design.textSecondaryColor || theme.colors.textSecondary,
                fontFamily: design.font || "Inter, system-ui, sans-serif",
              }}
            >
              Add your calendar booking link to enable scheduling...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarBookingAction;
