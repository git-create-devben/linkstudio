import React from 'react';
import { TemplateProps } from '@/types/editorTypes';
import { ProfileSection } from './sections/ProfileSection';
import { BackgroundLayer } from './layers/BackgroundLayer';
import { EffectsLayer } from './layers/EffectsLayer';
import { TemplateConfig, StyleVariant } from './types';
import { ActionsSection } from './sections/ActionsSection';
import { SocialLinksSection } from './sections/SocialLinksSection';
import { TemplateLayout } from './TemplateLayout';
import { getTheme } from '@/lib/themeSystem';

interface TemplateEngineProps extends TemplateProps {
  config: TemplateConfig;
  customStyles?: StyleVariant;
}

export const TemplateEngine: React.FC<TemplateEngineProps> = ({
  content,
  design,
  actions,
  socialLinks,
  toggles,
  config,
  customStyles = {}
}) => {
  const theme = getTheme(design.theme || 'dark');
  // Use design overrides if available
  const effectiveConfig = {
    ...config,
    layout: design.layout ? (design.layout === 'minimal' ? 'centered' :
      design.layout === 'professional' ? 'card' :
        design.layout === 'creative' ? 'fullscreen' : config.layout) : config.layout,
    spacing: (design.spacing as any) === 'relaxed' ? 'spacious' : (design.spacing || config.spacing),
    profileStyle: design.profileStyle || config.profileStyle,
    actionStyle: design.actionStyle || config.actionStyle,
    effects: design.effects || config.effects
  };

  const getTextStyles = () => {
    return {
      primaryText: {
        color: design.textPrimaryColor || theme.colors.textPrimary,
        textAlign: design.textAlignment || 'center' as const,
        fontFamily: design.font || 'Inter, system-ui, sans-serif',
        ...customStyles
      },
      secondaryText: {
        color: design.textSecondaryColor || theme.colors.textSecondary,
        textAlign: design.textAlignment || 'center' as const,
        fontFamily: design.font || 'Inter, system-ui, sans-serif',
        ...customStyles
      }
    };
  };

  const textStyles = getTextStyles();

  return (
    <TemplateLayout layout={effectiveConfig.layout} spacing={effectiveConfig.spacing} background={config.background} type={config.background} design={design}>
      <BackgroundLayer type={config.background} design={design} />

      {effectiveConfig.effects && effectiveConfig.effects.length > 0 && (
        <EffectsLayer effects={effectiveConfig.effects} />
      )}

      <div className="relative z-10 w-full max-w-md mx-auto">
        <ProfileSection
          content={content}
          design={design}
          toggles={toggles}
          style={effectiveConfig.profileStyle}
          customStyles={customStyles.profile}
        />

        <SocialLinksSection
          socialLinks={socialLinks}
          design={design}
          customStyles={customStyles.social}
        />

        <ActionsSection
          actions={actions}
          design={design}
          style={effectiveConfig.actionStyle}
          customStyles={customStyles.actions}
        />

        {/* Branding Footer */}
        {!design.removeBranding && (
          <div className="text-center py-4 mt-8 border-t border-gray-200/50">
            <div className="max-w-sm mx-auto">
              {design.customFooter ? (
                design.customFooterUrl ? (
                  <a
                    href={design.customFooterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={textStyles.primaryText}
                    className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200 font-medium"
                  >
                    <span>{design.customFooter}</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ) : (
                  <span className="text-xs text-gray-400 font-medium" style={textStyles.primaryText}>{design.customFooter}</span>
                )
              ) : (
                <a
                  href="https://linkstudio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={textStyles.primaryText}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200 font-medium group"
                >
                  <span>Create your own bio with</span>
                  <span className="font-semibold text-blue-500 group-hover:text-blue-600">LinkStudio</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </TemplateLayout>
  );
};