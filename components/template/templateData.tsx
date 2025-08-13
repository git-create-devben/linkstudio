import MinimalTemplate from "./templates/minmalTemplate";
import ProfessionalTemplate from "./templates/professionalTemplate";
import CreativeTemplate from "./templates/creativeTemplate";
import ModernMusicTemplate from "./templates/modernMusicTemplate";
import TravelerTemplate from "./templates/travelerTemplate";
import { TemplateType } from "@/types/templateTypes";
import defaultImage from "@/public/Devben Portfolio.webp";

export const templates: TemplateType[] = [
  {
    id: "minimal",
    name: "Alex Chen",
    description: "Content creator & designer",
    category: "content",
    defaultContent: {
      profileName: "Alex Chen",
      profileBio: "I make tech content and design stuff.",
      profileVerified: false,
    },
    defaultDesign: {
      theme: "dark",
      font: "Inter",
      buttonColor: "#ffffff",
      buttonTextColor: "#000000",
      buttonStyle: "default",
      customBackground: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    defaultActions: [
      {
        type: "LINK_LIST",
        config: {
          title: "My Links",
          links: [
            { title: "My YouTube", url: "https://youtube.com", icon: "youtube" },
            { title: "My Website", url: "https://alex.design", icon: "globe" },
          ],
        },
      },
    ],
    preview: (
      <MinimalTemplate
        content={{
          id: "mock-profile-id",
          profileId: "mock-profile-id",
          profileName: "Alex Chen",
          profileBio: "I make tech content and design stuff.",
          profilePicture: defaultImage.src,
          coverImage: defaultImage.src,
          profileVerified: false,
        }}
        design={{
          theme: "dark",
          font: "Inter",
          buttonColor: "#ffffff",
          buttonTextColor: "#000000",
          customBackground: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
        actions={[
          {
            id: "mock-action-id",
            type: "LINK_LIST",
            order: 0,
            config: {
              title: "My Links",
              links: [
                { title: "My YouTube", url: "https://youtube.com", icon: "youtube" },
                { title: "My Website", url: "https://alex.design", icon: "globe" },
              ],
            },
          },
        ]}
        toggles={{
          profileImage: true,
          profileName: true,
          verifiedBadge: true,
          bio: true,
          heading: true,
        }}
      />
    ),
    toggles: {
      profileImage: true,
      profileName: true,
      verifiedBadge: true,
      bio: true,
      heading: true,
    },
  },
  {
    id: "professional",
    name: "Sarah Johnson",
    description: "Business executive & consultant",
    category: "business",
    defaultContent: {
      profileName: "Sarah Johnson",
      profileBio: "Business consultant helping companies scale and grow.",
      profileVerified: false,
    },
    defaultDesign: {
      theme: "light",
      font: "Inter",
      buttonColor: "#3b82f6",
      buttonTextColor: "#ffffff",
      buttonStyle: "default",
      customBackground: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    },
    defaultActions: [
      {
        type: "LINK_LIST",
        config: {
          title: "Professional Links",
          links: [
            { title: "LinkedIn Profile", url: "https://linkedin.com", icon: "linkedin" },
            { title: "Schedule Meeting", url: "https://calendly.com", icon: "calendar" },
            { title: "Business Website", url: "https://sarahjohnson.com", icon: "globe" },
          ],
        },
      },
    ],
    preview: (
      <ProfessionalTemplate
        content={{
          id: "mock-profile-id",
          profileId: "mock-profile-id",
          profileName: "Sarah Johnson",
          profileBio: "Business consultant helping companies scale and grow.",
          profilePicture: defaultImage.src,
          coverImage: defaultImage.src,
          profileVerified: false,
        }}
        design={{
          theme: "light",
          font: "Inter",
          buttonColor: "#3b82f6",
          buttonTextColor: "#ffffff",
          customBackground: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        }}
        actions={[
          {
            id: "mock-action-id",
            type: "LINK_LIST",
            order: 0,
            config: {
              title: "Professional Links",
              links: [
                { title: "LinkedIn Profile", url: "https://linkedin.com", icon: "linkedin" },
                { title: "Schedule Meeting", url: "https://calendly.com", icon: "calendar" },
                { title: "Business Website", url: "https://sarahjohnson.com", icon: "globe" },
              ],
            },
          },
        ]}
        toggles={{
          profileImage: true,
          profileName: true,
          verifiedBadge: true,
          bio: true,
          heading: true,
        }}
      />
    ),
    toggles: {
      profileImage: true,
      profileName: true,
      verifiedBadge: true,
      bio: true,
      heading: true,
    },
  },
  {
    id: "creative",
    name: "Maya Rodriguez",
    description: "Digital artist & creative director",
    category: "creative",
    defaultContent: {
      profileName: "Maya Rodriguez",
      profileBio: "Creating digital art that inspires and connects people worldwide.",
      profileVerified: false,
    },
    defaultDesign: {
      theme: "dark",
      font: "Inter",
      buttonColor: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
      buttonTextColor: "#ffffff",
      buttonStyle: "rounded",
      customBackground: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
    },
    defaultActions: [
      {
        type: "LINK_LIST",
        config: {
          title: "Creative Portfolio",
          links: [
            { title: "🎨 My Portfolio", url: "https://maya-art.com", icon: "palette" },
            { title: "📸 Instagram", url: "https://instagram.com", icon: "instagram" },
            { title: "🎬 Creative Reel", url: "https://vimeo.com", icon: "video" },
            { title: "💌 Commission Work", url: "https://maya-commissions.com", icon: "mail" },
          ],
        },
      },
    ],
    preview: (
      <CreativeTemplate
        content={{
          id: "mock-profile-id",
          profileId: "mock-profile-id",
          profileName: "Maya Rodriguez",
          profileBio: "Creating digital art that inspires and connects people worldwide.",
          profilePicture: defaultImage.src,
          coverImage: defaultImage.src,
          profileVerified: false,
        }}
        design={{
          theme: "dark",
          font: "Inter",
          buttonColor: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
          buttonTextColor: "#ffffff",
          customBackground: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
        }}
        actions={[
          {
            id: "mock-action-id",
            type: "LINK_LIST",
            order: 0,
            config: {
              title: "Creative Portfolio",
              links: [
                { title: "🎨 My Portfolio", url: "https://maya-art.com", icon: "palette" },
                { title: "📸 Instagram", url: "https://instagram.com", icon: "instagram" },
                { title: "🎬 Creative Reel", url: "https://vimeo.com", icon: "video" },
                { title: "💌 Commission Work", url: "https://maya-commissions.com", icon: "mail" },
              ],
            },
          },
        ]}
        toggles={{
          profileImage: true,
          profileName: true,
          verifiedBadge: true,
          bio: true,
          heading: true,
        }}
      />
    ),
    toggles: {
      profileImage: true,
      profileName: true,
      verifiedBadge: true,
      bio: true,
      heading: true,
    },
  },
  {
    id: "modernMusic",
    name: "DJ Alex Rivera",
    description: "Electronic music producer & DJ",
    category: "creative",
    defaultContent: {
      profileName: "DJ Alex Rivera",
      profileBio: "Creating beats that move souls. Electronic music producer and live performer.",
      profileVerified: false,
    },
    defaultDesign: {
      theme: "dark",
      font: "Inter",
      buttonColor: "linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)",
      buttonTextColor: "#ffffff",
      buttonStyle: "pill",
      customBackground: "linear-gradient(135deg, #667eea 0%, #764ba2 20%, #f093fb 40%, #f5576c 60%, #4facfe 80%, #00f2fe 100%)",
    },
    defaultActions: [
      {
        type: "MUSIC_PLAYER",
        config: {
          title: "My Music",
          spotifyUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd",
        },
      },
      {
        type: "LINK_LIST",
        config: {
          title: "Music Links",
          links: [
            { title: "🎵 Latest Track", url: "https://soundcloud.com", icon: "music" },
            { title: "🎧 Spotify Playlist", url: "https://spotify.com", icon: "spotify" },
            { title: "🎪 Upcoming Shows", url: "https://events.com", icon: "calendar" },
            { title: "💿 Buy My Album", url: "https://bandcamp.com", icon: "shopping-bag" },
          ],
        },
      },
    ],
    preview: (
      <ModernMusicTemplate
        content={{
          id: "mock-profile-id",
          profileId: "mock-profile-id",
          profileName: "DJ Alex Rivera",
          profileBio: "Creating beats that move souls. Electronic music producer and live performer.",
          profilePicture: defaultImage.src,
          coverImage: defaultImage.src,
          profileVerified: false,
        }}
        design={{
          theme: "dark",
          font: "Inter",
          buttonColor: "linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)",
          buttonTextColor: "#ffffff",
          customBackground: "linear-gradient(135deg, #667eea 0%, #764ba2 20%, #f093fb 40%, #f5576c 60%, #4facfe 80%, #00f2fe 100%)",
        }}
        actions={[
          {
            id: "mock-action-id",
            type: "LINK_LIST",
            order: 0,
            config: {
              title: "Music Links",
              links: [
                { title: "🎵 Latest Track", url: "https://soundcloud.com", icon: "music" },
                { title: "🎧 Spotify Playlist", url: "https://spotify.com", icon: "spotify" },
                { title: "🎪 Upcoming Shows", url: "https://events.com", icon: "calendar" },
                { title: "💿 Buy My Album", url: "https://bandcamp.com", icon: "shopping-bag" },
              ],
            },
          },
        ]}
        toggles={{
          profileImage: true,
          profileName: true,
          verifiedBadge: true,
          bio: true,
          heading: true,
        }}
      />
    ),
    toggles: {
      profileImage: true,
      profileName: true,
      verifiedBadge: true,
      bio: true,
      heading: true,
    },
  },
  {
    id: "traveler",
    name: "Emma Wanderlust",
    description: "Digital nomad & travel blogger",
    category: "content",
    defaultContent: {
      profileName: "Emma Wanderlust",
      profileBio: "Exploring the world one adventure at a time. Sharing stories from 50+ countries.",
      profileVerified: false,
    },
    defaultDesign: {
      theme: "light",
      font: "Inter",
      buttonColor: "linear-gradient(135deg, #74b9ff 0%, #00b894 100%)",
      buttonTextColor: "#ffffff",
      buttonStyle: "rounded",
      customBackground: "linear-gradient(135deg, #74b9ff 0%, #0984e3 25%, #00b894 50%, #00cec9 75%, #fdcb6e 100%)",
    },
    defaultActions: [
      {
        type: "IMAGE_GALLERY",
        config: {
          title: "Travel Gallery",
          layout: "grid",
          images: [],
        },
      },
      {
        type: "LINK_LIST",
        config: {
          title: "Travel Links",
          links: [
            { title: "📖 Travel Blog", url: "https://blog.com", icon: "book" },
            { title: "📸 Photo Gallery", url: "https://instagram.com", icon: "camera" },
            { title: "🗺️ Travel Tips", url: "https://tips.com", icon: "map" },
            { title: "✈️ Book a Trip", url: "https://booking.com", icon: "plane" },
          ],
        },
      },
    ],
    preview: (
      <TravelerTemplate
        content={{
          id: "mock-profile-id",
          profileId: "mock-profile-id",
          profileName: "Emma Wanderlust",
          profileBio: "Exploring the world one adventure at a time. Sharing stories from 50+ countries.",
          profilePicture: defaultImage.src,
          coverImage: defaultImage.src,
          profileVerified: false,
        }}
        design={{
          theme: "light",
          font: "Inter",
          buttonColor: "linear-gradient(135deg, #74b9ff 0%, #00b894 100%)",
          buttonTextColor: "#ffffff",
          customBackground: "linear-gradient(135deg, #74b9ff 0%, #0984e3 25%, #00b894 50%, #00cec9 75%, #fdcb6e 100%)",
        }}
        actions={[
          {
            id: "mock-action-id",
            type: "LINK_LIST",
            order: 0,
            config: {
              title: "Travel Links",
              links: [
                { title: "📖 Travel Blog", url: "https://blog.com", icon: "book" },
                { title: "📸 Photo Gallery", url: "https://instagram.com", icon: "camera" },
                { title: "🗺️ Travel Tips", url: "https://tips.com", icon: "map" },
                { title: "✈️ Book a Trip", url: "https://booking.com", icon: "plane" },
              ],
            },
          },
        ]}
        toggles={{
          profileImage: true,
          profileName: true,
          verifiedBadge: true,
          bio: true,
          heading: true,
        }}
      />
    ),
    toggles: {
      profileImage: true,
      profileName: true,
      verifiedBadge: true,
      bio: true,
      heading: true,
    },
  },
];
