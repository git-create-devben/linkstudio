import {
  Menu,
  ThumbsUp,
  FileText,
  Palette,
  Settings,
} from 'lucide-react';
import { IconRobot } from '@tabler/icons-react';
import { SidebarItem } from './types';
import { EDITOR_PANELS } from '@/lib/constants';

export const sidebarItems: SidebarItem[] = [
  { id: EDITOR_PANELS.ACTIONS as keyof typeof EDITOR_PANELS, icon: Menu, label: 'Actions' },
  { id: EDITOR_PANELS.SOCIAL as keyof typeof EDITOR_PANELS, icon: ThumbsUp, label: 'Social Links' },
  { id: EDITOR_PANELS.CONTENT as keyof typeof EDITOR_PANELS, icon: FileText, label: 'Content' },
  { id: EDITOR_PANELS.DESIGN as keyof typeof EDITOR_PANELS, icon: Palette, label: 'Design' },
  { id: EDITOR_PANELS.AI as keyof typeof EDITOR_PANELS, icon: IconRobot, label: 'AI Suggestion' },
];