import React from 'react';

interface EffectsLayerProps {
  effects: string[];
}

export const EffectsLayer: React.FC<EffectsLayerProps> = ({ effects }) => {
  const renderEffect = (effect: string) => {
    switch (effect) {
      case 'vinyl-spin':
        return (
          <div
            key="vinyl-spin"
            className="absolute top-10 right-10 w-32 h-32 rounded-full border-8 border-white/10 animate-spin pointer-events-none"
            style={{
              animationDuration: '20s',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 30%, transparent 31%, transparent 40%, rgba(255,255,255,0.05) 41%, rgba(255,255,255,0.05) 60%, transparent 61%)'
            }}
          >
            <div className="absolute inset-4 rounded-full bg-white/5" />
            <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20" />
          </div>
        );

      case 'sound-waves':
        return (
          <div key="sound-waves" className="absolute bottom-20 left-10 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute bottom-0 bg-white/20 animate-pulse"
                style={{
                  left: `${i * 8}px`,
                  width: '4px',
                  height: `${20 + Math.sin(i) * 15}px`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1.5s'
                }}
              />
            ))}
          </div>
        );

      case 'floating-notes':
        return (
          <div key="floating-notes" className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 text-white/10 text-4xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>♪</div>
            <div className="absolute top-1/3 right-1/3 text-white/10 text-3xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>♫</div>
            <div className="absolute bottom-1/3 left-1/5 text-white/10 text-5xl animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}>♬</div>
          </div>
        );

      case 'parallax':
        return (
          <div key="parallax" className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `
                  radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 50%),
                  radial-gradient(circle at 70% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                  radial-gradient(circle at 20% 70%, rgba(255,255,255,0.08) 0%, transparent 50%)
                `
              }}
            />
          </div>
        );

      case 'color-shift':
        return (
          <div
            key="color-shift"
            className="absolute inset-0 opacity-30 animate-pulse pointer-events-none"
            style={{
              background: 'linear-gradient(45deg, rgba(255,0,150,0.1), rgba(0,255,255,0.1), rgba(255,255,0,0.1))',
              animationDuration: '4s'
            }}
          />
        );

      case 'floating-elements':
        return (
          <div key="floating-elements" className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
                style={{
                  top: `${20 + (i * 15)}%`,
                  left: `${10 + (i * 12)}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + (i * 0.5)}s`
                }}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {effects.map(renderEffect)}
    </div>
  );
};