import React from 'react';
import { DesignType } from '@/types/editorTypes';
import { curveShapes, curveColors, getTheme } from '@/lib/themeSystem';

interface BackgroundLayerProps {
  type: 'gradient' | 'image' | 'pattern' | 'animated';
  design: DesignType;
}

const getCurveStyle = (shapeId?: string, curveColor?: string, animated?: boolean) => {
  if (!shapeId) return {};

  const shape = curveShapes.find(s => s.id === shapeId);
  if (!shape) return {};

  const finalColor = curveColor || curveColors[0].value;

  return {
    clipPath: shape.clipPath,
    borderRadius: shape.borderRadius,
    background: shape.background
      ? `${finalColor}, ${shape.background}`
      : finalColor,
    ...(animated !== false && {
      animation: shape.animationClass?.replace('animate-', '') + ' 6s ease-in-out infinite'
    })
  };
};

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ type, design }) => {
  const theme = getTheme(design.theme || 'dark');
  
  const getBackgroundStyle = () => {
    switch (type) {
      case 'gradient':
        return {
          background: design.customBackground || theme.colors.background
        };
      
      case 'animated':
        return {
          background: design.customBackground || theme.colors.background
        };
      
      case 'image':
        return design.banner?.type === 'image' && design.banner.value ? {
          backgroundImage: `url(${design.banner.value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        } : {
          background: design.customBackground || theme.colors.background
        };
      
      case 'pattern':
        return {
          background: design.customBackground || theme.colors.background
        };
      
      default:
        return {
          background: design.customBackground || theme.colors.background
        };
    }
  };

  return (
    <>
      {/* Main Background */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={getBackgroundStyle()}
      />

      {/* Banner Section */}
      {((design.banner && design.banner.type !== 'none') || (design.bannerType === 'curve' && design.curveShape)) && (
        <div
          className="absolute top-0 left-0 w-full overflow-hidden"
          style={{ height: design.bannerHeight || design.banner?.height || 160 }}
        >
          {design.banner?.type === 'image' && design.banner.value && (
            <>
              <img
                src={design.banner.value}
                alt="Banner"
                className={`w-full h-full object-cover ${design.banner.blur ? 'blur-sm' : ''}`}
                style={{ opacity: design.banner.opacity || 1 }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
            </>
          )}

          {design.bannerType === 'curve' && design.curveShape && (
            <div
              className={`w-full h-full transition-all duration-500 ${
                design.curveAnimated !== false
                  ? curveShapes.find(s => s.id === design.curveShape)?.animationClass || ''
                  : ''
              }`}
              style={{
                opacity: design.bannerOpacity || 1,
                ...getCurveStyle(design.curveShape, design.curveColor, design.curveAnimated)
              }}
            />
          )}
        </div>
      )}
    </>
  );
};