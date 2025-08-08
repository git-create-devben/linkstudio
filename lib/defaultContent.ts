// Create a new file, e.g., 'lib/defaultContent.ts'

import defaultProfilePicture from "@/public/Devben Portfolio.webp"

// This is the "starter pack" for a brand new user.
export const defaultNewUserData = {
  templateId: "minimal",
  design: {
    layout: "minimal",
    background: "#FFFFFF",
    buttonColor: "#374151",
    color: "#1F2937",
    font: "Inter",
    bottomStyles: "default",
  },
  content: {
    id: "",
    profileId: "",
    profileName: "", // We will overwrite this with real data
    profileBio: "",    // We will overwrite this too
    profilePicture: defaultProfilePicture.src,
    coverImage: null,
    profileVerified: false,
  },
  actionItems: [
    {
      id: "default-link-1",
      order: 0,
      type: "LINK_LIST",
      config: {
        title: "My Important Links",
        links: [
          { title: "My Portfolio", url: "" },
          { title: "My Blog", url: "" },
        ],
      },
    },
  ],
  socialLinks: [], // Start with no social links
};