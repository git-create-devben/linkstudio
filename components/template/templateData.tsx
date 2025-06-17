import MinimalTemplate from "./templates/minmalTemplate";
import { TemplateType } from "@/types/templateTypes";
import defaultImage from "@/public/Devben Portfolio.webp";

export const templates: TemplateType[] = [
  {
    id: "minimal",
    name: "Alex Chen",
    description: "Content creator & designer",
    preview: (
      <MinimalTemplate
        content={{
          id: "mock-profile-id",
          profileId: "mock-profile-id",
          profileName: "Alex Chen",
          profileBio: "I make tech content and design stuff.",
          profilePicture: defaultImage.src,
          coverImage: defaultImage.src,
          profileVerified: true,
        }}
        design={{
          layout: "minimal",
          background: "#ffffff",
          color: "#111",
          font: "Inter",
          buttonColor:"#ffff"
        }}
        actions={[
          {
            id: "mock-action-id",
            type: "LINK_LIST",
            order: 0,
            config: {
              links: [
                { title: "My YouTube", url: "https://youtube.com" },
                { title: "My Website", url: "https://alex.design" },
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
    id: "default",
    name: "Alex Chen",
    description: "Content creator & designer",
    preview: (
      <MinimalTemplate
        content={{
          id: "mock-profile-id",
          profileId: "mock-profile-id",
          profileName: "Alex Chen",
          profileBio: "I make tech content and design stuff.",
          profilePicture: defaultImage.src,
          coverImage: defaultImage.src,
          profileVerified: true,
        }}
        design={{
          layout: "minimal",
          background: "#ffffff",
          color: "#111",
          font: "Inter",
          buttonColor:"#ffff"
        }}
        actions={[
          {
            id: "mock-action-id",
            type: "LINK_LIST",
            order: 0,
            config: {
              links: [
                { title: "My YouTube", url: "https://youtube.com" },
                { title: "My Website", url: "https://alex.design" },
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