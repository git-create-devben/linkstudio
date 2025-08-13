import { ContentType, DesignType, ActionItemType } from "@/stores/useContentStore";
export interface SocialLink {
  id: string; name: string; userId: string; url: string;
}

export interface SocialPlatform {
  id: string;
  name: string;
  color: string;
  baseUrl: string;
  placeholder: string;
}



// Toggles can stay the same
export type TogglesType = {
  profileImage: boolean;
  profileName: boolean;
  verifiedBadge: boolean;
  bio: boolean;
  heading: boolean;
};

// The NEW, universal props interface for ALL templates
export type TemplateProps = {
  content: ContentType;
  design: DesignType;
  actions: ActionItemType[];
  toggles: TogglesType;
  socialLinks?: SocialLink[];
  socialPlatforms?: SocialPlatform[];
};


// Types for the Actions Panel
interface Action {
  id: string;
  type: 'link-button' | 'link-preview' | 'link-list';
  title: string;
  url: string;
  urls?: string[]; // For link-list type
  views: number;
  clicks: number;
  createdAt: Date;
  updatedAt?: Date;
}

interface ActionType {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  preview: React.ReactNode;
  allowMultipleUrls?: boolean;
}

export interface LinkListItemProps {
  link: { title: string; url: string; icon?: string };
  index: number;
  onUpdate: (index: number, updates: { title?: string; url?: string; icon?: string }) => void;
  onRemove: (index: number) => void;
}
type ActionsPanelView = 'main' | 'select-type' | 'add-url' | 'edit-action';

// Action management events
interface ActionEvent {
  type: 'add' | 'edit' | 'delete' | 'view' | 'click';
  actionId: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

