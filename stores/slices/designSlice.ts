// Design-related utilities and types
import { ThemeMode, BannerConfig, defaultBannerConfig } from "@/lib/themeSystem";

export type DesignType = {
  theme: ThemeMode;
  layout?: string;
  font?: string;
  customBackground?: string;
  bannerType?: 'none' | 'image' | 'curve';
  bannerValue?: string;
  bannerHeight?: number;
  bannerOpacity?: number;
  bannerBlur?: boolean;
  curveShape?: string;
  curveColor?: string;
  curveAnimated?: boolean;
  textPrimaryColor?: string;
  textSecondaryColor?: string;
  textAlignment?: 'left' | 'center' | 'right';
  buttonStyle?: 'default' | 'rounded' | 'square' | 'pill';
  buttonColor?: string;
  buttonTextColor?: string;
  buttonBorderColor?: string;
  buttonHoverColor?: string;
  buttonShadow?: boolean;
  buttonAnimation?: 'scale' | 'slide' | 'glow' | 'none';
  cardStyle?: 'glass' | 'solid' | 'outline' | 'minimal';
  cardBorderRadius?: number;
  cardShadow?: boolean;
  cardBlur?: boolean;
  reducedMotion?: boolean;
  animationSpeed?: 'slow' | 'normal' | 'fast';
  banner?: BannerConfig;
  color?: string;
  bottomStyles?: string;
};

export const defaultDesign: DesignType = {
  layout: "minimal",
  theme: 'dark' as ThemeMode,
  customBackground: undefined,
  banner: defaultBannerConfig,
  buttonColor: "rgba(255, 255, 255, 0.2)",
  color: "#FFFFFF",
  font: "Inter",
};

// Design validation utilities
export function isValidTheme(theme: string): theme is ThemeMode {
  return ['light', 'dark'].includes(theme);
}

export function isValidButtonStyle(style: string): boolean {
  return ['default', 'rounded', 'square', 'pill'].includes(style);
}