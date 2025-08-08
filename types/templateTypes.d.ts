import { ContentType, DesignType } from "@/stores/useContentStore";
import { StaticImageData } from "next/image";

export type TemplateType = {
    id: string;
    name: string;
    description: string;
    preview: JSX.Element;
     toggles: {
    profileImage: boolean;
    profileName: boolean;
    verifiedBadge: boolean;
    bio: boolean;
    heading: boolean;
  };
  };
export type LinkItem = {
    label: string;
    url: string;
    icon?: string;
  };
  
  export type TemplateProps = {
    name: string;
    avatar?: string | StaticImageData;
    description?: string;
    backgroundColor?: string;
    textColor?: string;
    links?: LinkItem[];
    layoutId?: string;
    banner?: string;
    toggles?: {
        profileImage: boolean;
        profileName: boolean;
        verifiedBadge: boolean;
        bio: boolean;
        heading: boolean;
      };
      // content:any;
      // actionItems?:ActionItemType;
      // socialLinks?:SocialLinkType;
      // design?:DesignType;
      // actions?:ActionType;
  };
