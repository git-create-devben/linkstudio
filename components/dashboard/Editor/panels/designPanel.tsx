import React, { useState } from 'react';
import { useUserContentStore } from '@/stores/useContentStore';
import { getTheme } from '@/lib/themeSystem';
import { useUser } from '@/context/userContext';
import { canUserAccessFeature } from '@/lib/planUtils';
import { useRouter } from 'next/navigation';

// Import modular components
import { DesignPanelHeader } from './design/DesignPanelHeader';
import { DesignMainView } from './design/DesignMainView';
import { ThemeSelector } from './design/ThemeSelector';
import { BackgroundSelector } from './design/BackgroundSelector';
import { BannerSelector } from './design/BannerSelector';
import { CurvesSelector } from './design/CurvesSelector';
import { TypographySelector } from './design/TypographySelector';
import { ButtonDesignSelector } from './design/ButtonDesignSelector';
import { LayoutSelector } from './design/LayoutSelector';
import { EffectsSelector } from './design/EffectsSelector';
import { BrandingSelector } from './design/BrandingSelector';

type PanelView = 'main' | 'theme' | 'background' | 'banner' | 'curves' | 'typography' | 'buttons' | 'layout' | 'effects' | 'branding';

const DesignPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { design, setDesign } = useUserContentStore();
  const [currentView, setCurrentView] = useState<PanelView>('main');
  const currentTheme = getTheme(design.theme || 'dark');

  const user = useUser();
  const router = useRouter();
  const hasAdvancedCustomization = canUserAccessFeature(user, 'advancedCustomization');
  
  // Debug: Log user access
  console.log('DesignPanel - User:', user);
  console.log('DesignPanel - User plan:', user?.plan);
  console.log('DesignPanel - User isActive:', user?.isActive);
  console.log('DesignPanel - hasAdvancedCustomization:', hasAdvancedCustomization);
  console.log('DesignPanel - hasRemoveBranding:', canUserAccessFeature(user, 'removeBranding'));

  const handleDesignChange = (update: Partial<typeof design>) => {
    console.log('DesignPanel - handleDesignChange called with:', update);
    console.log('DesignPanel - hasAdvancedCustomization:', hasAdvancedCustomization);
    setDesign(update);
  };

  const handleNavigate = (view: PanelView) => {
    setCurrentView(view);
  };

  const handleUpgrade = () => {
    router.push('/payment');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'main':
        return (
          <DesignMainView
            design={design}
            currentTheme={currentTheme}
            hasAdvancedCustomization={hasAdvancedCustomization}
            onNavigate={handleNavigate}
            onUpgrade={handleUpgrade}
          />
        );
      case 'theme':
        return (
          <ThemeSelector
            design={design}
            onBack={() => setCurrentView('main')}
            onDesignChange={handleDesignChange}
          />
        );
      case 'background':
        return (
          <BackgroundSelector
            design={design}
            currentTheme={currentTheme}
            hasAdvancedCustomization={hasAdvancedCustomization}
            onBack={() => setCurrentView('main')}
            onDesignChange={handleDesignChange}
            onUpgrade={handleUpgrade}
          />
        );
      case 'banner':
        return (
          <BannerSelector
            design={design}
            onBack={() => setCurrentView('main')}
            onDesignChange={handleDesignChange}
            onNavigate={handleNavigate}
          />
        );
      case 'curves':
        return (
          <CurvesSelector
            design={design}
            hasAdvancedCustomization={hasAdvancedCustomization}
            onBack={() => setCurrentView('main')}
            onDesignChange={handleDesignChange}
            onUpgrade={handleUpgrade}
          />
        );
      case 'typography':
        return (
          <TypographySelector
            design={design}
            onBack={() => setCurrentView('main')}
            onDesignChange={handleDesignChange}
          />
        );
      case 'buttons':
        return (
          <ButtonDesignSelector
            design={design}
            onBack={() => setCurrentView('main')}
            onDesignChange={handleDesignChange}
          />
        );
      case 'layout':
        return (
          <LayoutSelector
            design={design}
            onBack={() => setCurrentView('main')}
            onDesignChange={handleDesignChange}
          />
        );
      case 'effects':
        return (
          <EffectsSelector
            design={design}
            onBack={() => setCurrentView('main')}
            onDesignChange={handleDesignChange}
          />
        );
      case 'branding':
        return (
          <BrandingSelector
            design={design}
            hasRemoveBranding={canUserAccessFeature(user, 'removeBranding')}
            onBack={() => setCurrentView('main')}
            onDesignChange={handleDesignChange}
            onUpgrade={handleUpgrade}
          />
        );
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">This section is coming soon!</p>
            <button
              onClick={() => setCurrentView('main')}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Back to Main
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
      <DesignPanelHeader onClose={onClose} />
      <main className="flex-1 p-4 overflow-y-auto h-[calc(90vh-1rem)]">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default DesignPanel;