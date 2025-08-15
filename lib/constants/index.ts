// Application-wide constants
export const APP_CONFIG = {
  name: "LinkStudio",
  tagline: "Your Signature Space Online.",
  description: "Design a single, stunning destination that brings together all your passions, projects, and platforms. Effortlessly. Elegantly.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;

export const ROUTES = {
  HOME: "/",
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
  EDITOR: "/dashboard/editor",
  TEMPLATE: "/dashboard/template",
  ANALYTICS: "/dashboard/analytics",
  PRICING: "/payment",
  ABOUT: "/about",
  CONTACT: "/contact",
  PRIVACY: "/privacy",
  TERMS: "/terms",
} as const;

export const ONBOARDING_STEPS = [
  'Welcome',
  'Username',
  'Profile',
  'Template',
  'Goal',
  'Platforms',
  'Complete'
] as const;

export const EDITOR_PANELS = {
  ACTIONS: 'actions',
  SOCIAL: 'social',
  CONTENT: 'content',
  DESIGN: 'design',
  AI: 'AI',
  SETTINGS: 'settings',
} as const;

export const ANIMATION_DELAYS = {
  HEADER: 0.1,
  HERO_BADGE: 0.2,
  HERO_TITLE: 0.3,
  HERO_DESCRIPTION: 0.4,
  HERO_CTA: 0.5,
} as const;

export const TEMPLATES_IMAGES = {
  'minimalist': "/images/templates/minimal.jpeg",
  'playful': "/images/templates/minimal.jpeg",
  'professional': "/images/templates/minimal.jpeg",
  'simple': "/images/templates/minimal.jpeg",
  'standard': "/images/templates/minimal.jpeg",
  'unique': "/images/templates/minimal.jpeg",
} as const;
