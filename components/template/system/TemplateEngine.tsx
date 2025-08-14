import React from 'react';
import { TemplateProps } from '@/types/editorTypes';
import { ProfileSection } from './sections/ProfileSection';
import { BackgroundLayer } from './layers/BackgroundLayer';
import { EffectsLayer } from './layers/EffectsLayer';
import { TemplateConfig, StyleVariant } from './types';
import { ActionsSection } from './sections/ActionsSection';
import { SocialLinksSection } from './sections/SocialLinksSection';
import { TemplateLayout } from './TemplateLayout';

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

  return (
    <TemplateLayout layout={effectiveConfig.layout} spacing={effectiveConfig.spacing}>
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
          <div className="text-center py-4 mt-8">
            {design.customFooter ? (
              design.customFooterUrl ? (
                <a
                  href={design.customFooterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {design.customFooter}
                </a>
              ) : (
                <span className="text-xs text-gray-500">{design.customFooter}</span>
              )
            ) : (
              <a
                href="https://linkstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                Powered by LinkStudio
              </a>
            )}
          </div>
        )}
      </div>
    </TemplateLayout>
  );
};