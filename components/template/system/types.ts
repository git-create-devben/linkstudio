export interface TemplateConfig {
  layout: 'centered' | 'card' | 'fullscreen';
  background: 'gradient' | 'image' | 'pattern' | 'animated';
  effects?: string[];
  spacing: 'compact' | 'normal' | 'spacious';
  profileStyle: 'minimal' | 'featured' | 'artistic';
  actionStyle: 'buttons' | 'cards' | 'list';
}

export interface StyleVariant {
  profile?: {
    avatar?: Record<string, any>;
    name?: Record<string, any>;
    bio?: Record<string, any>;
  };
  actions?: {
    button?: Record<string, any>;
    card?: Record<string, any>;
    list?: Record<string, any>;
  };
  social?: {
    container?: Record<string, any>;
    link?: Record<string, any>;
  };
}