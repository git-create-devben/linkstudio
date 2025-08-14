# Universal Template System

This is a scalable, config-driven template system that eliminates code duplication and makes creating new templates incredibly fast.

## Architecture Overview

```
template/
├── system/                 # Core template engine
│   ├── TemplateEngine.tsx     # Main engine that renders templates
│   ├── UniversalTemplate.tsx  # Wrapper for template configs
│   ├── TemplateLayout.tsx     # Layout system
│   ├── types.ts              # TypeScript interfaces
│   ├── sections/             # Reusable sections
│   │   ├── ProfileSection.tsx
│   │   ├── SocialLinksSection.tsx
│   │   └── ActionsSection.tsx
│   └── layers/               # Background & effects
│       ├── BackgroundLayer.tsx
│       └── EffectsLayer.tsx
├── configs/                # Template configurations
│   └── templateConfigs.ts    # All template configs & styles
├── templates/              # Template components (tiny wrappers)
│   ├── minimal.tsx
│   ├── modernMusic.tsx
│   ├── professional.tsx
│   ├── creative.tsx
│   └── traveler.tsx
└── utils/                  # Helper utilities
    └── templateGenerator.ts  # Easy template creation
```

## How It Works

### 1. Template Configuration
Each template is defined by a simple config object:

```typescript
const modernMusic: TemplateConfig = {
  layout: 'centered',           // How content is laid out
  background: 'animated',       // Background type
  spacing: 'normal',           // Spacing between elements
  profileStyle: 'artistic',    // Profile section style
  actionStyle: 'cards',        // Action buttons style
  effects: ['vinyl-spin', 'sound-waves', 'floating-notes'] // Special effects
}
```

### 2. Style Variants
Visual customization through style objects:

```typescript
const modernMusicStyles: StyleVariant = {
  profile: {
    avatar: { 
      boxShadow: '0 0 30px rgba(255,255,255,0.3)',
      filter: 'brightness(1.1)'
    },
    name: { 
      fontSize: '2.5rem',
      textShadow: '0 2px 15px rgba(0,0,0,0.4)'
    }
  },
  actions: {
    card: {
      borderRadius: '16px',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))',
      backdropFilter: 'blur(15px)'
    }
  }
}
```

### 3. Template Component
The actual template is just a tiny wrapper:

```typescript
const ModernMusicTemplate: React.FC<TemplateProps> = (props) => {
  return <UniversalTemplate templateId="modernMusic" {...props} />;
};
```

## Adding New Templates

### Method 1: Quick Config (Recommended)
Add to `templateConfigs.ts`:

```typescript
export const templateConfigs = {
  // ... existing templates
  
  gaming: {
    layout: 'centered',
    background: 'animated',
    spacing: 'normal',
    profileStyle: 'artistic',
    actionStyle: 'cards',
    effects: ['neon-glow', 'particle-system']
  }
};

export const templateStyles = {
  // ... existing styles
  
  gaming: {
    profile: {
      avatar: {
        border: '3px solid #00ff88',
        boxShadow: '0 0 20px rgba(0,255,136,0.5)'
      }
    }
  }
};
```

Create template file `templates/gaming.tsx`:
```typescript
import React from 'react';
import { TemplateProps } from '@/types/editorTypes';
import { UniversalTemplate } from '../system/UniversalTemplate';

const GamingTemplate: React.FC<TemplateProps> = (props) => {
  return <UniversalTemplate templateId="gaming" {...props} />;
};

export default GamingTemplate;
```

### Method 2: Using Template Generator
Use the utility for even faster creation:

```typescript
import { createTemplate } from '../utils/templateGenerator';

const myTemplate = createTemplate({
  id: 'fitness',
  name: 'Fitness Pro',
  description: 'For fitness trainers and gyms',
  category: 'fitness',
  config: {
    layout: 'card',
    background: 'gradient',
    spacing: 'compact',
    profileStyle: 'featured',
    actionStyle: 'buttons',
    effects: ['energy-pulse']
  },
  styles: {
    profile: {
      avatar: { border: '4px solid #ff4757' }
    }
  }
});
```

## Available Options

### Layout Types
- `centered`: Content centered on screen
- `card`: Content in a card container
- `fullscreen`: Full screen layout

### Background Types
- `gradient`: Simple gradient background
- `image`: Image-based background
- `pattern`: Patterned background with overlays
- `animated`: Animated gradient background

### Profile Styles
- `minimal`: Clean, simple profile section
- `featured`: Enhanced profile with better styling
- `artistic`: Creative profile with special effects

### Action Styles
- `buttons`: Traditional button styling
- `cards`: Card-based action items
- `list`: List-style action items

### Spacing Options
- `compact`: Tight spacing
- `normal`: Standard spacing
- `spacious`: Generous spacing

### Available Effects
- `vinyl-spin`: Spinning vinyl record
- `sound-waves`: Animated sound waves
- `floating-notes`: Floating musical notes
- `parallax`: Parallax background effects
- `color-shift`: Color shifting animation
- `floating-elements`: Floating particles

## Benefits

### ✅ Scalability
- Add unlimited templates with just config objects
- No code duplication
- Consistent behavior across all templates

### ✅ Maintainability
- Change one file to update all templates
- Easy to debug and test
- Clear separation of concerns

### ✅ Performance
- Smaller bundle size
- Better code splitting
- Shared component caching

### ✅ Developer Experience
- New templates in minutes, not hours
- No need to understand complex template code
- Easy to customize and extend

## Migration from Old System

The old templates are still available but deprecated. New templates should use this system. To migrate:

1. Identify the template's visual characteristics
2. Create a config object matching those characteristics
3. Create the tiny wrapper component
4. Test and replace the old template

## Future Enhancements

- Visual template builder UI
- More effect types
- Advanced layout options
- Template marketplace
- A/B testing capabilities