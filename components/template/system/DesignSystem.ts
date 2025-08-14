// Enhanced Design System - Industry Standard Approach
export interface DesignToken {
  id: string;
  name: string;
  category: 'color' | 'typography' | 'spacing' | 'shadow' | 'animation';
  value: string | number;
  tier: 'free' | 'pro';
}

export interface ColorScheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    accent: string;
  };
  tier: 'free' | 'pro';
}

export interface DesignPreset {
  id: string;
  name: string;
  description: string;
  category: 'minimal' | 'creative' | 'professional' | 'artistic';
  preview: string; // Base64 image or URL
  config: {
    colorScheme: string;
    typography: string;
    layout: string;
    effects: string[];
  };
  tier: 'free' | 'pro';
}

// Industry-standard color schemes (like Linktree themes)
export const colorSchemes: ColorScheme[] = [
  {
    id: 'linktree-green',
    name: 'Linktree Classic',
    primary: '#39e09b',
    secondary: '#ffffff',
    accent: '#1e1e1e',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: {
      primary: '#1e1e1e',
      secondary: '#6c757d',
      accent: '#39e09b'
    },
    tier: 'free'
  },
  {
    id: 'beacons-purple',
    name: 'Beacons Purple',
    primary: '#8b5cf6',
    secondary: '#a78bfa',
    accent: '#ec4899',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    surface: 'rgba(255,255,255,0.1)',
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.8)',
      accent: '#fbbf24'
    },
    tier: 'pro'
  },
  {
    id: 'later-sunset',
    name: 'Later Sunset',
    primary: '#f59e0b',
    secondary: '#f97316',
    accent: '#ef4444',
    background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ef4444 100%)',
    surface: 'rgba(255,255,255,0.15)',
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.9)',
      accent: '#fef3c7'
    },
    tier: 'pro'
  }
];

// Design presets (like Beacons' templates)
export const designPresets: DesignPreset[] = [
  {
    id: 'linktree-minimal',
    name: 'Clean & Simple',
    description: 'Inspired by Linktree\'s classic look',
    category: 'minimal',
    preview: '/previews/linktree-minimal.png',
    config: {
      colorScheme: 'linktree-green',
      typography: 'inter',
      layout: 'centered',
      effects: []
    },
    tier: 'free'
  },
  {
    id: 'beacons-creative',
    name: 'Creative Studio',
    description: 'Bold design for creators',
    category: 'creative',
    preview: '/previews/beacons-creative.png',
    config: {
      colorScheme: 'beacons-purple',
      typography: 'poppins',
      layout: 'card',
      effects: ['parallax', 'color-shift']
    },
    tier: 'pro'
  },
  {
    id: 'later-magazine',
    name: 'Magazine Style',
    description: 'Editorial layout for content creators',
    category: 'artistic',
    preview: '/previews/later-magazine.png',
    config: {
      colorScheme: 'later-sunset',
      typography: 'playfair',
      layout: 'magazine',
      effects: ['floating-elements', 'parallax']
    },
    tier: 'pro'
  }
];

// Advanced customization options (like Beacons)
export interface AdvancedDesignOptions {
  animations: {
    buttonHover: 'none' | 'scale' | 'lift' | 'glow' | 'bounce';
    pageTransition: 'none' | 'fade' | 'slide' | 'zoom';
    loadingEffect: 'none' | 'skeleton' | 'pulse' | 'wave';
  };
  interactions: {
    clickFeedback: boolean;
    hoverEffects: boolean;
    soundEffects: boolean;
  };
  accessibility: {
    highContrast: boolean;
    reducedMotion: boolean;
    focusIndicators: boolean;
  };
}

// Design system utilities
export class DesignSystemManager {
  static applyColorScheme(scheme: ColorScheme, element: HTMLElement) {
    element.style.setProperty('--color-primary', scheme.primary);
    element.style.setProperty('--color-secondary', scheme.secondary);
    element.style.setProperty('--color-accent', scheme.accent);
    element.style.setProperty('--color-background', scheme.background);
    element.style.setProperty('--color-surface', scheme.surface);
    element.style.setProperty('--color-text-primary', scheme.text.primary);
    element.style.setProperty('--color-text-secondary', scheme.text.secondary);
    element.style.setProperty('--color-text-accent', scheme.text.accent);
  }

  static generateCustomCSS(design: any): string {
    return `
      :root {
        --primary-color: ${design.primaryColor || '#39e09b'};
        --secondary-color: ${design.secondaryColor || '#ffffff'};
        --background: ${design.background || '#ffffff'};
        --text-color: ${design.textColor || '#1e1e1e'};
        --border-radius: ${design.borderRadius || '12px'};
        --shadow: ${design.shadow || '0 4px 6px rgba(0,0,0,0.1)'};
      }
      
      .link-button {
        background: var(--primary-color);
        color: var(--text-color);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        transition: all 0.2s ease;
      }
      
      .link-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 15px rgba(0,0,0,0.2);
      }
    `;
  }
}