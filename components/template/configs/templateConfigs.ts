import { TemplateConfig, StyleVariant} from "../system/types";

export const templateConfigs: Record<string, TemplateConfig> = {
  minimal: {
    layout: 'centered',
    background: 'gradient',
    spacing: 'normal',
    profileStyle: 'minimal',
    actionStyle: 'buttons',
    effects: []
  },
  
  modernMusic: {
    layout: 'centered',
    background: 'animated',
    spacing: 'normal',
    profileStyle: 'artistic',
    actionStyle: 'cards',
    effects: ['vinyl-spin', 'sound-waves', 'floating-notes']
  },
  
  professional: {
    layout: 'card',
    background: 'gradient',
    spacing: 'compact',
    profileStyle: 'featured',
    actionStyle: 'list',
    effects: []
  },
  
  creative: {
    layout: 'fullscreen',
    background: 'pattern',
    spacing: 'spacious',
    profileStyle: 'artistic',
    actionStyle: 'cards',
    effects: ['parallax', 'color-shift']
  },
  
  traveler: {
    layout: 'centered',
    background: 'image',
    spacing: 'normal',
    profileStyle: 'featured',
    actionStyle: 'buttons',
    effects: ['floating-elements']
  }
};

// Style variants for each template
export const templateStyles: Record<string, StyleVariant> = {
  minimal: {
    profile: {
      avatar: { borderRadius: '50%', border: '3px solid white' },
      name: { fontSize: '2rem', fontWeight: 'bold' },
      bio: { opacity: 0.9 }
    },
    actions: {
      button: { 
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)'
      }
    }
  },
  
  modernMusic: {
    profile: {
      avatar: { 
        borderRadius: '50%',
        boxShadow: '0 0 30px rgba(255,255,255,0.3)',
        filter: 'brightness(1.1)'
      },
      name: { 
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textShadow: '0 2px 15px rgba(0,0,0,0.4)'
      }
    },
    actions: {
      card: {
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255,255,255,0.4)'
      }
    }
  },

  professional: {
    profile: {
      avatar: { 
        borderRadius: '50%',
        border: '4px solid rgba(255,255,255,0.8)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
      },
      name: { 
        fontSize: '2.2rem',
        fontWeight: '600',
        letterSpacing: '0.02em'
      },
      bio: { 
        fontSize: '1.1rem',
        opacity: 0.95,
        lineHeight: '1.6'
      }
    },
    actions: {
      list: {
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '12px 16px'
      }
    }
  },

  creative: {
    profile: {
      avatar: { 
        borderRadius: '50%',
        border: '5px solid rgba(255,255,255,0.6)',
        filter: 'saturate(1.2) contrast(1.1)'
      },
      name: { 
        fontSize: '2.8rem',
        fontWeight: 'bold',
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      },
      bio: {
        fontSize: '1.2rem',
        fontStyle: 'italic'
      }
    },
    actions: {
      card: {
        borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
        backdropFilter: 'blur(20px)',
        border: '2px solid rgba(255,255,255,0.3)',
        transform: 'perspective(1000px) rotateX(5deg)'
      }
    }
  },

  traveler: {
    profile: {
      avatar: { 
        borderRadius: '50%',
        border: '4px solid rgba(255,255,255,0.9)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.4)'
      },
      name: { 
        fontSize: '2.4rem',
        fontWeight: 'bold',
        textShadow: '0 4px 20px rgba(0,0,0,0.5)'
      },
      bio: {
        fontSize: '1.1rem',
        textShadow: '0 2px 10px rgba(0,0,0,0.3)'
      }
    },
    actions: {
      button: {
        borderRadius: '14px',
        background: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.3)',
        boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
      }
    }
  }
};