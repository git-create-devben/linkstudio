import React, { useState, useEffect } from 'react';
import { ArrowLeft, Palette, Crown, Lock } from 'lucide-react';
import { IconColorSwatch } from '@tabler/icons-react';

interface BackgroundSelectorProps {
  design: any;
  currentTheme: any;
  hasAdvancedCustomization: boolean;
  onBack: () => void;
  onDesignChange: (update: any) => void;
  onUpgrade: () => void;
}

export const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  design,
  currentTheme,
  hasAdvancedCustomization,
  onBack,
  onDesignChange,
  onUpgrade
}) => {
  // Debug: Log the current design to see what we're working with

  // Detect current background type from design
  const detectBackgroundType = (): 'gradient' | 'solid' | 'image' => {
    if (!design.customBackground) return 'gradient';

    // Check if it's an image (starts with url())
    if (design.customBackground.startsWith('url(')) return 'image';

    // Check if it's a gradient (contains 'gradient')
    if (design.customBackground.includes('gradient')) return 'gradient';

    // Check if it's a hex color or named color
    if (design.customBackground.startsWith('#') ||
      design.customBackground.match(/^[a-zA-Z]+$/)) return 'solid';

    // Default to gradient
    return 'gradient';
  };

  const [backgroundType, setBackgroundType] = useState<'gradient' | 'solid' | 'image'>(detectBackgroundType());

  // Update background type when design changes
  useEffect(() => {
    setBackgroundType(detectBackgroundType());
  }, [design.customBackground]);

  const availableGradients = true
    ? currentTheme.gradients
    : currentTheme.gradients.slice(0, 2);

  const baseSolidColors = [
    '#000000', '#1a1a1a', '#2d3748', '#1a202c', '#2b6cb0', '#3182ce',
    '#38a169', '#48bb78', '#ed8936', '#f56500', '#e53e3e', '#f56565',
    '#805ad5', '#9f7aea', '#d69e2e', '#ecc94b', '#38b2ac', '#4fd1c7'
  ];

  // Add current color to the list if it's not already there and it's a solid color
  const solidColors = React.useMemo(() => {
    const colors = [...baseSolidColors];

    // If current background is a solid color and not in the list, add it
    if (design.customBackground &&
      (design.customBackground.startsWith('#') || design.customBackground.match(/^[a-zA-Z]+$/)) &&
      !colors.includes(design.customBackground)) {
      colors.unshift(design.customBackground); // Add to beginning
    }

    return colors;
  }, [design.customBackground]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="text-lg font-semibold">Background</h3>
      </div>

      {/* Background Type Selector (images temporarily removed) */}
      <div className="flex gap-2 mb-4">
        {[
          { id: 'gradient', label: 'Gradients', icon: Palette },
          { id: 'solid', label: 'Solid Colors', icon: IconColorSwatch }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setBackgroundType(id as any)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${backgroundType === id
              ? 'bg-blue-100 text-blue-700 border border-blue-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>
      {/* {!hasAdvancedCustomization && backgroundType !== 'gradient' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Pro Feature</span>
          </div>
          <p className="text-xs text-yellow-700 mt-1">
            Upgrade to access solid colors and image backgrounds.
          </p>
        </div>
      )} */}

      {/* Gradient Backgrounds */}
      {backgroundType === 'gradient' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            Gradients
            {!hasAdvancedCustomization && <Crown className="w-4 h-4 text-amber-500" />}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {currentTheme.gradients.map((gradient: string, index: number) => {
              const isSelected = design.customBackground === gradient;
              const isPro = !hasAdvancedCustomization && index >= 2; // First 2 are free
              return (
                <button
                  key={index}
                  onClick={() => onDesignChange({ customBackground: gradient, backgroundType: 'gradient' })}
                  className={`relative h-20 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-200'
                    }`}
                  style={{ background: gradient }}
                  title={`Gradient ${index + 1}`}
                >
                  {isSelected && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full shadow-lg" />
                    </div>
                  )}
                  {isPro && (
                    <Crown className="absolute top-2 right-2 w-4 h-4 text-amber-500 bg-white rounded-full p-0.5" />
                  )}
                </button>
              );
            })}
          </div>
          {!hasAdvancedCustomization && (
            <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
              <Crown className="w-3 h-3" />
              Pro feature - upgrade to save premium gradients
            </p>
          )}
        </div>
      )}

      {/* Solid Colors */}
      {backgroundType === 'solid' && (
        <div>
          {/* Custom Color Picker - Always show but indicate if it's a pro feature */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              Custom Color
              {!hasAdvancedCustomization && <Crown className="w-4 h-4 text-amber-500" />}
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={design.customBackground && design.customBackground.startsWith('#') ? design.customBackground : '#000000'}
                onChange={(e) => onDesignChange({ customBackground: e.target.value, backgroundType: 'solid' })}
                className="w-12 h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={design.customBackground && design.customBackground.startsWith('#') ? design.customBackground : ''}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.startsWith('#') || value === '') {
                    onDesignChange({ customBackground: value, backgroundType: 'solid' });
                  }
                }}
                placeholder="#000000"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {!hasAdvancedCustomization && (
              <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                <Crown className="w-3 h-3" />
                Pro feature - upgrade to save custom colors
              </p>
            )}
          </div>

          {/* Preset Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              Preset Colors
              {!hasAdvancedCustomization && <Crown className="w-4 h-4 text-amber-500" />}
            </label>
            <div className="grid grid-cols-6 gap-2">
              {solidColors.map((color, index) => {
                const isSelected = design.customBackground === color;
                return (
                  <button
                    key={index}
                    onClick={() => onDesignChange({ customBackground: color, backgroundType: 'solid' })}
                    className={`relative h-12 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-200'
                      }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  >
                    {!hasAdvancedCustomization && (
                      <Crown className="absolute top-1 right-1 w-3 h-3 text-amber-500 bg-white rounded-full p-0.5" />
                    )}
                    {isSelected && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full shadow-lg" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Image Backgrounds - Coming Soon */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
        <div className="text-center">
          {/* <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" /> */}
          <h4 className="font-medium text-gray-700 mb-1">Background Images</h4>
          <p className="text-sm text-gray-500">Coming Soon</p>
          <p className="text-xs text-gray-400 mt-1">Upload custom background images for your profile</p>
        </div>
      </div>

      {!hasAdvancedCustomization && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
          <div className="flex items-center gap-2 text-amber-800">
            <Crown className="w-4 h-4" />
            <span className="text-sm font-medium">Pro Features Available</span>
          </div>
          <p className="text-sm text-amber-700 mt-1">
            You can try all background features now, but you'll need to upgrade to Pro to save your changes.
          </p>
          <button
            onClick={onUpgrade}
            className="mt-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
          >
            Upgrade to Pro
          </button>
        </div>
      )}
    </div>
  );
};