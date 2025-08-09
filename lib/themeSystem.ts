// Theme System for LinkStudio
export type ThemeMode = 'light' | 'dark' | 'glassmorphic';

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

// Banner system
export interface BannerConfig {
  type: 'none' | 'image' | 'gradient';
  value?: string; // URL for image, gradient string for gradient
  height?: number;
  opacity?: number;
  blur?: boolean;
}

export const defaultBannerConfig: BannerConfig = {
  type: 'none',
  height: 200,
  opacity: 1,
  blur: false
};

export const bannerGradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)'
];
