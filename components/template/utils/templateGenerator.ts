import { TemplateConfig, StyleVariant } from '../system/types';

/**
 * Utility to generate new template configurations
 * This makes it super easy to create new templates without writing code
 */

export interface NewTemplateConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  config: TemplateConfig;
  styles: StyleVariant;
  defaultBackground?: string;
}

export const createTemplate = (template: NewTemplateConfig) => {
  return {
    id: template.id,
    name: template.name,
    description: template.description,
    category: template.category,
    config: template.config,
    styles: template.styles,
    defaultDesign: {
      theme: 'dark',
      customBackground: template.defaultBackground || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }
  };
};

// Example: Creating a new "Gaming" template in seconds
export const gamingTemplate = createTemplate({
  id: 'gaming',
  name: 'Gaming Pro',
  description: 'Perfect for gamers and streamers',
  category: 'gaming',
  config: {
    layout: 'centered',
    background: 'animated',
    spacing: 'normal',
    profileStyle: 'artistic',
    actionStyle: 'cards',
    effects: ['neon-glow', 'particle-system', 'rgb-shift']
  },
  styles: {
    profile: {
      avatar: {
        borderRadius: '50%',
        border: '3px solid #00ff88',
        boxShadow: '0 0 20px rgba(0,255,136,0.5)',
        filter: 'saturate(1.3)'
      },
      name: {
        fontSize: '2.6rem',
        fontWeight: 'bold',
        background: 'linear-gradient(45deg, #00ff88, #00d4ff, #ff0080)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 0 30px rgba(0,255,136,0.3)'
      }
    },
    actions: {
      card: {
        borderRadius: '12px',
        background: 'linear-gradient(135deg, rgba(0,255,136,0.1), rgba(0,212,255,0.1))',
        border: '1px solid rgba(0,255,136,0.3)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
      }
    }
  },
  defaultBackground: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
});

// Example: Creating a "Food & Restaurant" template
export const foodTemplate = createTemplate({
  id: 'food',
  name: 'Foodie',
  description: 'For restaurants and food bloggers',
  category: 'food',
  config: {
    layout: 'card',
    background: 'pattern',
    spacing: 'normal',
    profileStyle: 'featured',
    actionStyle: 'buttons',
    effects: ['warm-glow', 'food-particles']
  },
  styles: {
    profile: {
      avatar: {
        borderRadius: '50%',
        border: '4px solid #ff6b35',
        boxShadow: '0 8px 25px rgba(255,107,53,0.4)'
      },
      name: {
        fontSize: '2.3rem',
        fontWeight: '600',
        color: '#ff6b35',
        textShadow: '0 2px 10px rgba(255,107,53,0.3)'
      }
    },
    actions: {
      button: {
        borderRadius: '25px',
        background: 'linear-gradient(135deg, rgba(255,107,53,0.2), rgba(255,159,67,0.2))',
        border: '2px solid rgba(255,107,53,0.4)',
        backdropFilter: 'blur(10px)'
      }
    }
  },
  defaultBackground: 'linear-gradient(135deg, #ff9a56 0%, #ff6b35 50%, #ff4757 100%)'
});