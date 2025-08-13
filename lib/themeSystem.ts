// Theme System for LinkStudio
export type ThemeMode = 'light' | 'dark' | 'glassmorphic';

export interface BannerConfig {
  type: 'none' | 'image' | 'curve';
  value?: string;
  height?: number;
  opacity?: number;
  blur?: boolean;
}

export const defaultBannerConfig: BannerConfig = {
  type: 'none',
  height: 200,
  opacity: 1,
  blur: false,
};

export interface ThemeColors {
  background: string;
  cardBackground: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  border: string;
  shadow: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  gradients: string[];
  cardStyle: string;
  blur: string;
}

export const themes: Record<ThemeMode, Theme> = {
  light: {
    mode: 'light',
    colors: {
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      cardBackground: 'rgba(255, 255, 255, 0.9)',
      textPrimary: '#2d3748',
      textSecondary: '#4a5568',
      accent: '#4299e1',
      border: 'rgba(255, 255, 255, 0.3)',
      shadow: 'rgba(0, 0, 0, 0.1)'
    },
    gradients: [
      'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'linear-gradient(135deg, #e0c3fc 0%, #9bb5ff 100%)',
      'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
    ],
    cardStyle: 'bg-white/90 backdrop-blur-sm border border-white/30',
    blur: 'backdrop-blur-sm'
  },
  dark: {
    mode: 'dark',
    colors: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      cardBackground: 'rgba(0, 0, 0, 0.4)',
      textPrimary: '#ffffff',
      textSecondary: '#e2e8f0',
      accent: '#63b3ed',
      border: 'rgba(255, 255, 255, 0.2)',
      shadow: 'rgba(0, 0, 0, 0.3)'
    },
    gradients: [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    ],
    cardStyle: 'bg-black/20 backdrop-blur-sm border border-white/20',
    blur: 'backdrop-blur-sm'
  },
  glassmorphic: {
    mode: 'glassmorphic',
    colors: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      cardBackground: 'rgba(255, 255, 255, 0.1)',
      textPrimary: '#ffffff',
      textSecondary: '#f7fafc',
      accent: '#90cdf4',
      border: 'rgba(255, 255, 255, 0.2)',
      shadow: 'rgba(31, 38, 135, 0.37)'
    },
    gradients: [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    ],
    cardStyle: 'bg-white/10 backdrop-blur-md border border-white/20',
    blur: 'backdrop-blur-md'
  }
};

export const getTheme = (mode: ThemeMode): Theme => themes[mode];

export const getButtonStyle = (design: any, theme: Theme) => {
  const baseStyle = buttonStyles.find(s => s.id === (design?.buttonStyle || 'default'));
  const animation = buttonAnimations.find(a => a.id === (design?.buttonAnimation || 'scale'));

  const style: React.CSSProperties = {
    color: design?.buttonTextColor || theme.colors.textPrimary,
    borderColor: design?.buttonBorderColor || theme.colors.border,
    boxShadow: design?.buttonShadow !== false ? `0 4px 12px ${theme.colors.shadow}` : 'none'
  };

  if (design?.buttonColor && design.buttonColor.startsWith('linear-gradient')) {
    style.background = design.buttonColor;
  } else {
    style.backgroundColor = design?.buttonColor || theme.colors.cardBackground;
  }

  return {
    className: `${baseStyle?.className || 'rounded-lg'} ${animation?.className || 'hover:scale-105 transition-transform duration-200'}`,
    style: style
  };
};

export const curveShapes = [
  {
    id: 'wave',
    name: 'Ocean Wave',
    description: 'Flowing ocean waves',
    clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0 100%)',
    animationClass: 'animate-wave',
    category: 'flowing'
  },
  {
    id: 'wave-reverse',
    name: 'Reverse Wave',
    description: 'Reverse flowing motion',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 75%)',
    animationClass: 'animate-wave-reverse',
    category: 'flowing'
  },
  {
    id: 'mountains',
    name: 'Mountain Peaks',
    description: 'Sharp mountain silhouette',
    clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)',
    animationClass: 'animate-mountain-drift',
    category: 'geometric'
  },
  {
    id: 'arch',
    name: 'Elegant Arch',
    description: 'Smooth architectural arch',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)',
    borderRadius: '0 0 50% 50% / 0 0 30px 30px',
    animationClass: 'animate-arch-expand',
    category: 'architectural'
  },
  {
    id: 'clouds',
    name: 'Cloud Formation',
    description: 'Soft cloud-like edges',
    clipPath: 'polygon(0 0, 100% 0, 100% 90%, 85% 95%, 70% 90%, 50% 95%, 30% 90%, 15% 95%, 0 90%)',
    animationClass: 'animate-cloud-drift',
    category: 'organic'
  },
  {
    id: 'curve-bottom',
    name: 'Bottom Curve',
    description: 'Simple bottom curve',
    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
    borderRadius: '0 0 50% 50% / 0 0 20px 20px',
    animationClass: 'animate-breathe',
    category: 'simple'
  },
  {
    id: 'petal',
    name: 'Flower Petal',
    description: 'Delicate petal shape',
    clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)',
    borderRadius: '0 0 30px 30px',
    animationClass: 'animate-petal-sway',
    category: 'organic'
  },
  {
    id: 'dunes',
    name: 'Sand Dunes',
    description: 'Rolling desert dunes',
    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 75% 90%, 50% 85%, 25% 90%, 0 85%)',
    animationClass: 'animate-dune-shift',
    category: 'flowing'
  },
  {
    id: 'aurora',
    name: 'Aurora Lights',
    description: 'Mystical aurora effect',
    clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)',
    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
    animationClass: 'animate-aurora',
    category: 'mystical'
  },
  {
    id: 'blossom',
    name: 'Cherry Blossom',
    description: 'Gentle blossom curves',
    clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)',
    borderRadius: '0 0 40px 40px',
    background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
    animationClass: 'animate-bloom',
    category: 'organic'
  }
];

export const animationUtilities = [
  '@keyframes wave { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }',
  '.animate-wave { animation: wave 3s ease-in-out infinite; }',
  '@keyframes wave-reverse { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(10px); } }',
  '.animate-wave-reverse { animation: wave-reverse 3s ease-in-out infinite; }',
  '@keyframes mountain-drift { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }',
  '.animate-mountain-drift { animation: mountain-drift 5s ease-in-out infinite; }',
  '@keyframes arch-expand { 0%, 100% { border-radius: 0 0 50% 50% / 0 0 30px 30px; } 50% { border-radius: 0 0 50% 50% / 0 0 40px 40px; } }',
  '.animate-arch-expand { animation: arch-expand 4s ease-in-out infinite; }',
  '@keyframes cloud-drift { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(10px); } }',
  '.animate-cloud-drift { animation: cloud-drift 7s ease-in-out infinite; }',
  '@keyframes breathe { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.05); } }',
  '.animate-breathe { animation: breathe 4s ease-in-out infinite; }',
  '@keyframes petal-sway { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(2deg); } }',
  '.animate-petal-sway { animation: petal-sway 6s ease-in-out infinite; }',
  '@keyframes dune-shift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }',
  '.animate-dune-shift { animation: dune-shift 8s ease-in-out infinite; }',
  '@keyframes aurora { 0%, 100% { opacity: 0.8; } 50% { opacity: 1; } }',
  '.animate-aurora { animation: aurora 5s ease-in-out infinite; }',
  '@keyframes bloom { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }',
  '.animate-bloom { animation: bloom 6s ease-in-out infinite; }'
];

export const curveColors = [
  { id: 'ocean-blue', name: 'Ocean Blue', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', category: 'cool' },
  { id: 'sunset-pink', name: 'Sunset Pink', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', category: 'warm' },
  { id: 'crystal-cyan', name: 'Crystal Cyan', value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', category: 'cool' },
  { id: 'emerald-green', name: 'Emerald Green', value: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', category: 'nature' },
  { id: 'golden-yellow', name: 'Golden Yellow', value: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', category: 'warm' },
  { id: 'lavender-dream', name: 'Lavender Dream', value: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', category: 'soft' },
  { id: 'rose-quartz', name: 'Rose Quartz', value: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', category: 'soft' },
  { id: 'desert-sand', name: 'Desert Sand', value: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', category: 'warm' },
  { id: 'aurora-purple', name: 'Aurora Purple', value: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', category: 'mystical' },
  { id: 'cherry-blossom', name: 'Cherry Blossom', value: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)', category: 'soft' }
];

export const buttonStyles = [
  { id: 'default', name: 'Default', className: 'rounded-lg', description: 'Standard rounded corners' },
  { id: 'rounded', name: 'Rounded', className: 'rounded-2xl', description: 'More rounded corners' },
  { id: 'pill', name: 'Pill', className: 'rounded-full', description: 'Fully rounded pill shape' },
  { id: 'square', name: 'Square', className: 'rounded-none', description: 'Sharp square corners' },
  { id: 'minimal', name: 'Minimal', className: 'rounded-md border-0 bg-transparent', description: 'Clean minimal style' },
  { id: 'outlined', name: 'Outlined', className: 'rounded-lg border-2 bg-transparent', description: 'Outlined button style' }
];

export const buttonAnimations = [
  { id: 'scale', name: 'Scale', className: 'hover:scale-105 transition-transform duration-200', description: 'Subtle scale on hover' },
  { id: 'slide', name: 'Slide', className: 'hover:translate-y-[-2px] transition-transform duration-200', description: 'Slide up on hover' },
  { id: 'glow', name: 'Glow', className: 'hover:shadow-lg hover:shadow-current/25 transition-shadow duration-200', description: 'Glow effect on hover' },
  { id: 'bounce', name: 'Bounce', className: 'hover:animate-pulse transition-all duration-200', description: 'Gentle bounce effect' },
  { id: 'shake', name: 'Shake', className: 'hover:animate-bounce transition-all duration-200', description: 'Shake on hover' },
  { id: 'none', name: 'None', className: 'transition-colors duration-200', description: 'No hover animation' }
];

export const buttonGradients = [
  { id: 'ocean', name: 'Ocean Blue', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', textColor: '#ffffff' },
  { id: 'sunset', name: 'Sunset', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', textColor: '#ffffff' },
  { id: 'nature', name: 'Nature', value: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', textColor: '#ffffff' },
  { id: 'gold', name: 'Gold', value: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', textColor: '#ffffff' },
  { id: 'purple', name: 'Purple Dream', value: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', textColor: '#ffffff' },
  { id: 'ice', name: 'Ice Blue', value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', textColor: '#ffffff' }
];

export const iconLibrary = [
  { id: 'heart', name: 'Heart', category: 'social', emoji: '❤️' },
  { id: 'star', name: 'Star', category: 'social', emoji: '⭐' },
  { id: 'fire', name: 'Fire', category: 'social', emoji: '🔥' },
  { id: 'thumbs-up', name: 'Thumbs Up', category: 'social', emoji: '👍' },
  { id: 'clap', name: 'Clap', category: 'social', emoji: '👏' },
  { id: 'rocket', name: 'Rocket', category: 'social', emoji: '🚀' },
  { id: 'sparkles', name: 'Sparkles', category: 'social', emoji: '✨' },
  { id: 'lightning', name: 'Lightning', category: 'social', emoji: '⚡' },
  { id: 'briefcase', name: 'Briefcase', category: 'business', emoji: '💼' },
  { id: 'chart', name: 'Chart', category: 'business', emoji: '📈' },
  { id: 'handshake', name: 'Handshake', category: 'business', emoji: '🤝' },
  { id: 'target', name: 'Target', category: 'business', emoji: '🎯' },
  { id: 'trophy', name: 'Trophy', category: 'business', emoji: '🏆' },
  { id: 'diamond', name: 'Diamond', category: 'business', emoji: '💎' },
  { id: 'crown', name: 'Crown', category: 'business', emoji: '👑' },
  { id: 'palette', name: 'Palette', category: 'creative', emoji: '🎨' },
  { id: 'camera', name: 'Camera', category: 'creative', emoji: '📸' },
  { id: 'music', name: 'Music', category: 'creative', emoji: '🎵' },
  { id: 'video', name: 'Video', category: 'creative', emoji: '🎥' },
  { id: 'brush', name: 'Brush', category: 'creative', emoji: '🖌️' },
  { id: 'rainbow', name: 'Rainbow', category: 'creative', emoji: '🌈' },
  { id: 'computer', name: 'Computer', category: 'tech', emoji: '💻' },
  { id: 'phone', name: 'Phone', category: 'tech', emoji: '📱' },
  { id: 'globe', name: 'Globe', category: 'tech', emoji: '🌐' },
  { id: 'gear', name: 'Gear', category: 'tech', emoji: '⚙️' },
  { id: 'chip', name: 'Chip', category: 'tech', emoji: '💾' },
  { id: 'robot', name: 'Robot', category: 'tech', emoji: '🤖' },
  { id: 'coffee', name: 'Coffee', category: 'lifestyle', emoji: '☕' },
  { id: 'pizza', name: 'Pizza', category: 'lifestyle', emoji: '🍕' },
  { id: 'cake', name: 'Cake', category: 'lifestyle', emoji: '🎂' },
  { id: 'gift', name: 'Gift', category: 'lifestyle', emoji: '🎁' },
  { id: 'home', name: 'Home', category: 'lifestyle', emoji: '🏠' },
  { id: 'car', name: 'Car', category: 'lifestyle', emoji: '🚗' },
  { id: 'tree', name: 'Tree', category: 'nature', emoji: '🌲' },
  { id: 'flower', name: 'Flower', category: 'nature', emoji: '🌸' },
  { id: 'sun', name: 'Sun', category: 'nature', emoji: '☀️' },
  { id: 'moon', name: 'Moon', category: 'nature', emoji: '🌙' },
  { id: 'mountain', name: 'Mountain', category: 'nature', emoji: '⛰️' },
  { id: 'beach', name: 'Beach', category: 'nature', emoji: '🏖️' },
  { id: 'airplane', name: 'Airplane', category: 'travel', emoji: '✈️' },
  { id: 'compass', name: 'Compass', category: 'travel', emoji: '🧭' },
  { id: 'arrow-right', name: 'Arrow Right', category: 'ui', emoji: '➡️' },
  { id: 'arrow-up', name: 'Arrow Up', category: 'ui', emoji: '⬆️' },
  { id: 'check', name: 'Check', category: 'ui', emoji: '✅' },
  { id: 'cross', name: 'Cross', category: 'ui', emoji: '❌' },
  { id: 'plus', name: 'Plus', category: 'ui', emoji: '➕' },
  { id: 'minus', name: 'Minus', category: 'ui', emoji: '➖' },
  { id: 'question', name: 'Question', category: 'ui', emoji: '❓' },
  { id: 'exclamation', name: 'Exclamation', category: 'ui', emoji: '❗' },
  { id: 'circle', name: 'Circle', category: 'shapes', emoji: '⚪' },
  { id: 'square-shape', name: 'Square', category: 'shapes', emoji: '⬜' },
  { id: 'triangle', name: 'Triangle', category: 'shapes', emoji: '🔺' },
  { id: 'crystal', name: 'Crystal', category: 'shapes', emoji: '💠' }
];

export const getIcon = (id: string) => {
  return iconLibrary.find(icon => icon.id === id);
};

export const getIconsByCategory = (category: string) => {
  return iconLibrary.filter(icon => icon.category === category);
};

export const getIconCategories = () => {
  return [...new Set(iconLibrary.map(icon => icon.category))];
};