import React from 'react';
import { Sparkles, Type, MousePointer, Layout, Zap } from 'lucide-react';
import { IconColorSwatch, IconWaveSine, IconPhoto, IconBrandBing } from '@tabler/icons-react';
import { curveShapes, buttonStyles } from '@/lib/themeSystem';
import { DesignPreview } from './DesignPreview';
import { DesignOptionCard } from './DesignOptionCard';

interface DesignMainViewProps {
  design: any;
  currentTheme: any;
  hasAdvancedCustomization: boolean;
  onNavigate: (view: 'main' | 'theme' | 'background' | 'banner' | 'curves' | 'typography' | 'buttons' | 'layout' | 'effects' | 'branding') => void;
  onUpgrade: () => void;
}

export const DesignMainView: React.FC<DesignMainViewProps> = ({
  design,
  currentTheme,
  hasAdvancedCustomization,
  onNavigate,
  onUpgrade
}) => {
  return (
    <div className="space-y-4 h-full max-h-full">
      <DesignPreview design={design} currentTheme={currentTheme} />
      
      <div className="grid grid-cols-1 gap-3">
        <DesignOptionCard
          icon={<Sparkles className="w-5 h-5 text-purple-600" />}
          title="Theme Mode"
          description={design.theme === 'light' ? 'Light Mode' : design.theme === 'dark' ? 'Dark Mode' : 'Glassmorphic'}
          onEdit={() => onNavigate('theme')}
        />
        
        <DesignOptionCard
          icon={<IconColorSwatch className="w-5 h-5 text-blue-600" />}
          title="Background"
          description="Gradients, solids & images"
          onEdit={() => onNavigate('background')}
        />

        <DesignOptionCard
          icon={<IconPhoto className="w-5 h-5 text-green-600" />}
          title="Banner"
          description={
            design.banner?.type === 'image' ? 'Image banner' : 
            design.bannerType === 'curve' ? 'Curve banner' : 'No banner'
          }
          onEdit={() => onNavigate('banner')}
        />
        
        <DesignOptionCard
          icon={<IconWaveSine className="w-5 h-5 text-emerald-600" />}
          title="Curve Banners"
          description={
            design.curveShape 
              ? curveShapes.find(s => s.id === design.curveShape)?.name || 'Custom shape'
              : hasAdvancedCustomization 
                ? 'No curve selected' 
                : `${curveShapes.filter(s => s.tier === 'free').length} free curves available`
          }
          onEdit={() => onNavigate('curves')}
        />
        
        <DesignOptionCard
          icon={<Type className="w-5 h-5 text-orange-600" />}
          title="Typography"
          description={`${design.font || 'Inter'} font family`}
          onEdit={() => onNavigate('typography')}
        />
        
        <DesignOptionCard
          icon={<MousePointer className="w-5 h-5 text-pink-600" />}
          title="Button Design"
          description={`${buttonStyles.find(s => s.id === design.buttonStyle)?.name || 'Default'} style`}
          onEdit={() => onNavigate('buttons')}
        />
        
        <DesignOptionCard
          icon={<Layout className="w-5 h-5 text-purple-600" />}
          title="Layout & Spacing"
          description="Template layout and spacing options"
          onEdit={() => onNavigate('layout')}
        />
        
        <DesignOptionCard
          icon={<Zap className="w-5 h-5 text-indigo-600" />}
          title="Visual Effects"
          description="Animations and special effects"
          onEdit={() => onNavigate('effects')}
        />

        <DesignOptionCard
          icon={<IconBrandBing className="w-5 h-5 text-yellow-600" />}
          title="Branding"
          description="Remove LinkStudio branding"
          onEdit={() => onNavigate('branding')}
          isLocked={!hasAdvancedCustomization}
          onUpgrade={onUpgrade}
        />
      </div>
    </div>
  );
};