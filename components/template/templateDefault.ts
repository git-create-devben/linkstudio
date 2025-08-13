// lib/templateDefaults.ts
import defaultImage from "@/public/Devben Portfolio.webp";
import { DesignType, ContentType, ActionItemType } from "@/stores/useContentStore";
import { SocialLink } from "@/types/editorTypes";

export type TemplateDefaults = {
  design: DesignType;
  content: ContentType;
  actionItems: ActionItemType[];
  socialLinks: SocialLink[];
};

// Default data for Minimal Template
const minimalTemplateDefaults: TemplateDefaults = {
  design: {
    layout: "minimal",
    buttonColor: "#374151",
    color: "#1F2937",
    font: "Inter",
    theme: "dark",
    banner: {
      type: "none",
      value: "",
    },
    customBackground: "",
    bottomStyles: "default",
  },
  content: {
    id: "",
    profileId: "",
    profileName: "Ben",
    profileBio: "Content Creator",
    profilePicture: defaultImage.src,
    coverImage: null,
    profileVerified: false,
  },
  actionItems: [
    {
      id: "default",
      order: 0,
      type: "LINK_LIST",
      config: {
        links: [
          { title: "Link 1", url: "" },
          { title: "Link 2", url: "" },
          { title: "Link 3", url: "" },
          { title: "Link 4", url: "" },
        ],
      },
    },
  ],
  socialLinks: [],
};

// You can add more template defaults here
const modernTemplateDefaults: TemplateDefaults = {
  design: {
    layout: "modern",
    // background: "#000000",
    buttonColor: "#FFFFFF",
    color: "#FFFFFF",
    font: "Poppins",
    theme: "dark",
    banner: {
      type: "none",
      value: "",
    },
    customBackground: "",
    bottomStyles: "default",
  },
  content: {
    id: "",
    profileId: "",
    profileName: "Alex",
    profileBio: "Digital Creator",
    profilePicture: defaultImage.src,
    coverImage: null,
    profileVerified: false,
  },
  actionItems: [
    {
      id: "default",
      order: 0,
      type: "LINK_LIST",
      config: {
        links: [
          { title: "Portfolio", url: "" },
          { title: "Contact", url: "" },
          { title: "Blog", url: "" },
        ],
      },
    },
  ],
  socialLinks: [],
};

// Default data for Professional Template
const professionalTemplateDefaults: TemplateDefaults = {
  design: {
    layout: "professional",
    buttonColor: "#3b82f6",
    color: "#1f2937",
    font: "Inter",
    theme: "light",
    banner: {
      type: "none",
      value: "",
    },
    customBackground: "#f8fafc",
    bottomStyles: "default",
  },
  content: {
    id: "",
    profileId: "",
    profileName: "Professional",
    profileBio: "Business professional & consultant",
    profilePicture: defaultImage.src,
    coverImage: null,
    profileVerified: true,
  },
  actionItems: [
    {
      id: "default",
      order: 0,
      type: "LINK_LIST",
      config: {
        links: [
          { title: "LinkedIn Profile", url: "" },
          { title: "Schedule Meeting", url: "" },
          { title: "Business Website", url: "" },
          { title: "Contact Info", url: "" },
        ],
      },
    },
  ],
  socialLinks: [],
};

// Default data for Creative Template
const creativeTemplateDefaults: TemplateDefaults = {
  design: {
    layout: "creative",
    buttonColor: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
    color: "#ffffff",
    font: "Inter",
    theme: "dark",
    banner: {
      type: "curve",
      value: "",
    },
    bannerType: "curve",
    curveShape: "wave-1",
    curveColor: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
    curveAnimated: true,
    customBackground: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
    bottomStyles: "rounded",
  },
  content: {
    id: "",
    profileId: "",
    profileName: "Maya Rodriguez",
    profileBio: "Creating digital art that inspires and connects people worldwide.",
    profilePicture: defaultImage.src,
    coverImage: null,
    profileVerified: false,
  },
  actionItems: [
    {
      id: "default",
      order: 0,
      type: "LINK_LIST",
      config: {
        title: "Creative Portfolio",
        links: [
          { title: "🎨 My Portfolio", url: "", icon: "palette" },
          { title: "📸 Instagram", url: "", icon: "instagram" },
          { title: "🎬 Creative Reel", url: "", icon: "video" },
          { title: "💌 Commission Work", url: "", icon: "mail" },
        ],
      },
    },
  ],
  socialLinks: [],
};

// Default data for Modern Music Template
const modernMusicTemplateDefaults: TemplateDefaults = {
  design: {
    layout: "modernMusic",
    buttonColor: "linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)",
    color: "#ffffff",
    font: "Inter",
    theme: "dark",
    banner: {
      type: "curve",
      value: "",
    },
    bannerType: "curve",
    curveShape: "wave-2",
    curveColor: "linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)",
    curveAnimated: true,
    customBackground: "linear-gradient(135deg, #667eea 0%, #764ba2 20%, #f093fb 40%, #f5576c 60%, #4facfe 80%, #00f2fe 100%)",
    bottomStyles: "pill",
  },
  content: {
    id: "",
    profileId: "",
    profileName: "DJ Alex Rivera",
    profileBio: "Creating beats that move souls. Electronic music producer and live performer.",
    profilePicture: defaultImage.src,
    coverImage: null,
    profileVerified: false,
  },
  actionItems: [
    {
      id: "music-player",
      order: 0,
      type: "MUSIC_PLAYER",
      config: {
        title: "My Music",
        spotifyUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd",
      },
    },
    {
      id: "music-links",
      order: 1,
      type: "LINK_LIST",
      config: {
        title: "Music Links",
        links: [
          { title: "🎵 Latest Track", url: "", icon: "music" },
          { title: "🎧 Spotify Playlist", url: "", icon: "spotify" },
          { title: "🎪 Upcoming Shows", url: "", icon: "calendar" },
          { title: "💿 Buy My Album", url: "", icon: "shopping-bag" },
        ],
      },
    },
  ],
  socialLinks: [],
};

// Default data for Traveler Template
const travelerTemplateDefaults: TemplateDefaults = {
  design: {
    layout: "traveler",
    buttonColor: "linear-gradient(135deg, #74b9ff 0%, #00b894 100%)",
    color: "#ffffff",
    font: "Inter",
    theme: "light",
    banner: {
      type: "curve",
      value: "",
    },
    bannerType: "curve",
    curveShape: "wave-3",
    curveColor: "linear-gradient(135deg, #74b9ff 0%, #00b894 100%)",
    curveAnimated: true,
    customBackground: "linear-gradient(135deg, #74b9ff 0%, #0984e3 25%, #00b894 50%, #00cec9 75%, #fdcb6e 100%)",
    bottomStyles: "rounded",
  },
  content: {
    id: "",
    profileId: "",
    profileName: "Emma Wanderlust",
    profileBio: "Exploring the world one adventure at a time. Sharing stories from 50+ countries.",
    profilePicture: defaultImage.src,
    coverImage: null,
    profileVerified: false,
  },
  actionItems: [
    {
      id: "travel-gallery",
      order: 0,
      type: "IMAGE_GALLERY",
      config: {
        title: "Travel Gallery",
        layout: "grid",
        images: [],
      },
    },
    {
      id: "travel-links",
      order: 1,
      type: "LINK_LIST",
      config: {
        title: "Travel Links",
        links: [
          { title: "📖 Travel Blog", url: "", icon: "book" },
          { title: "📸 Photo Gallery", url: "", icon: "camera" },
          { title: "🗺️ Travel Tips", url: "", icon: "map" },
          { title: "✈️ Book a Trip", url: "", icon: "plane" },
        ],
      },
    },
  ],
  socialLinks: [],
};

// Template defaults registry
export const templateDefaults: Record<string, TemplateDefaults> = {
  minimal: minimalTemplateDefaults,
  modern: modernTemplateDefaults,
  professional: professionalTemplateDefaults,
  creative: creativeTemplateDefaults,
  modernMusic: modernMusicTemplateDefaults,
  traveler: travelerTemplateDefaults,
  default: minimalTemplateDefaults,
};

// Function to get defaults for a specific template
export const getTemplateDefaults = (templateId: string): TemplateDefaults => {
  return templateDefaults[templateId] || templateDefaults.minimal;
};

// Function to merge user data with template defaults
export const mergeUserDataWithDefaults = (
  templateId: string,
  userData: {
    design?: Partial<DesignType>;
    content?: Partial<ContentType>;
    actionItems?: ActionItemType[];
    socialLinks?: SocialLink[];
  }
): TemplateDefaults => {
  const defaults = getTemplateDefaults(templateId);
  
  return {
    design: { ...defaults.design, ...userData.design },
    content: { ...defaults.content, ...userData.content },
    actionItems: userData.actionItems && userData.actionItems.length > 0 
      ? userData.actionItems 
      : defaults.actionItems,
    socialLinks: userData.socialLinks && userData.socialLinks.length > 0 
      ? userData.socialLinks 
      : defaults.socialLinks,
  };
};